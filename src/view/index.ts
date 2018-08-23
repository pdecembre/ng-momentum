import {
    Rule,
    SchematicContext,
    Tree,
    apply,
    chain,
    mergeWith,
    template,
    url,
    move,
    filter,
    noop,
    schematic,
    MergeStrategy,
} from '@angular-devkit/schematics';
import {normalize, join} from '@angular-devkit/core';
import {strings} from '../utils/strings';
import {Schema as ViewOptions} from './schema';
import {setupOptions} from '../utils/setup';
import {constants} from '../utils/constants';
import {getVoProperties} from "../utils/vo-utils";
import {UI_FRAMEWORK_OPTION} from "../scaffold";
import {readValueFromJsonFile} from "../utils/json-editor";
import {addImportToNgModule, addRouteToAppRoutingModule, findRoutingModuleFromOptions} from "../utils/module-utils";

export enum VIEW_OPTION {
    Blank = 'blank',
    List = 'list',
    DETAILS = 'details',
    FORM = 'form',
    TABLE = 'table',
}

export const VIEW_OPTIONS = [VIEW_OPTION.Blank, VIEW_OPTION.List,
    VIEW_OPTION.DETAILS, VIEW_OPTION.FORM, VIEW_OPTION.TABLE];

/**
 * Reads the VO object to get the parameters to use for the schematic.
 * @param {Schema} options
 * @returns {Rule}
 */
function readVoObjectAndGetParameters(options: ViewOptions, templateOptions): Rule {
    return (host: Tree) => {
        if (options.template === VIEW_OPTION.Blank) {
            options.parameters = [];
            return host;
        }
        options.parameters = getVoProperties(host, options.voPath, strings.dasherize(strings.singularize(options.vo)));
        templateOptions.parameters = options.parameters;

        return host;
    }
}

/**
 * Adds the import into the core module for eager loading.
 * @param {Schema} options
 * @returns {Rule}
 */
function importIntoCoreModule(options: ViewOptions): Rule {
    return (host: Tree) => {
        options.module = `${options.path}${constants.coreModule}`;
        const classifiedName = `${strings.classify(options.name)}Module`;
        addImportToNgModule(host, options, classifiedName);
        return host;
    }
}

/**
 * Adds the route into the app.routing.ts file for lazy loading.
 * @param options
 * @returns {Rule}
 */
function addToAppRouting(options: ViewOptions): Rule {
    return (host: Tree) => {
        options.module = findRoutingModuleFromOptions(host, options);
        addRouteToAppRoutingModule(host, options);
        return host;
    }
}

/**
 * Creates a Service.
 * @param {Schema} options
 * @returns {Rule}
 */
export function view(options: ViewOptions): Rule {
    return (host: Tree, context: SchematicContext) => {
        setupOptions(host, options);
        // defaults
        const defaultOptions = {
            styleext: readValueFromJsonFile(host, options.path, 'style'),
            ui: UI_FRAMEWORK_OPTION.MATERIAL.valueOf()
        };
        const projectUiFramework = readValueFromJsonFile(host, options.path, 'uiFramework');
        if (options.uiFramework && options.uiFramework !== UI_FRAMEWORK_OPTION.MATERIAL) {
            defaultOptions.ui = options.uiFramework;
        } else if (!options.uiFramework && projectUiFramework) {
            defaultOptions.ui = projectUiFramework;
        }

        options.vo = (options.vo) ? options.vo : options.name;
        options.voPath = (options.voPath) ? options.voPath : join(options.path, constants.voFolder, strings.dasherize(strings.singularize(options.vo)));
        options.service = (options.service) ? options.service : options.name;
        options.servicePath = (options.servicePath) ? options.servicePath : join(options.path, constants.servicesFolder, strings.dasherize(strings.pluralize(options.service)));
        options.template = (VIEW_OPTIONS.indexOf(options.template) >= 0) ? options.template : VIEW_OPTION.Blank;
        options.basePath = (options.eager) ? normalize(strings.dasherize(options.name)) : normalize('');
        // no vo or service necessary for blank model
        if (options.template === VIEW_OPTION.Blank) {
            options.skipService = true;
            options.skipVo = true;
        }
        const movePath = (options.flat) ?
            join(options.path, constants.viewsFolder) :
            join(options.path, constants.viewsFolder, strings.dasherize(options.name));

        const templateOptions = {
            ...strings,
            ...defaultOptions,
            'if-flat': (s: string) => options.flat ? '' : s,
            ...options,
        };

        const rule = chain([
            options.skipVo ? noop() : schematic(constants.voSchematic, {
                name: options.vo,
                spec: options.spec,
                obj: options.obj
            }),
            readVoObjectAndGetParameters(options, templateOptions),
            options.skipService ? noop() : schematic(constants.serviceSchematic, {
                name: options.service,
                spec: options.spec,
                skipVo: true
            }),
            mergeWith(apply(url('./files/' + options.template), [
                options.spec ? noop() : filter(path => !path.endsWith(constants.specFileExtension)),
                template(templateOptions),
                move(movePath),
            ]), MergeStrategy.Default),
            options.eager ? importIntoCoreModule(options) : addToAppRouting(options)
        ]);
        return rule(host, context);
    };
}