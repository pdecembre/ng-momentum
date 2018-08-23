import {
    Rule,
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
    MergeStrategy, SchematicContext
} from '@angular-devkit/schematics';
import {join, normalize} from '@angular-devkit/core';
import {strings} from '../utils/strings';
import {Schema as CrudOptions} from './schema';
import {Schema as VoOptions} from '../vo/schema';
import {Schema as ServiceOptions} from '../service/schema';
import {setupOptions} from '../utils/setup';
import {constants} from '../utils/constants';
import {UI_FRAMEWORK_OPTION} from "../scaffold";
import {readValueFromJsonFile} from "../utils/json-editor";
import {Observable} from 'rxjs/internal/Observable';
import * as fetch from 'node-fetch';
import {addImportToNgModule, addRouteToAppRoutingModule, findRoutingModuleFromOptions} from "../utils/module-utils";

/**
 * Requests the build properties from the endpoint or pulls from provided object.
 * @param {CrudOptions} options
 * @param {VoOptions} voOptions
 * @param {Object} templateOptions
 * @returns {Rule}
 */
function buildProperties(options: CrudOptions, voOptions: VoOptions, templateOptions): Rule {
    return (host: Tree) => {
        return new Observable<Tree>((observer) => {
            fetch(options.url)
                .then(res => res.json())
                .then(data => {
                    //console.debug(JSON.stringify(data));
                    let value = data;
                    if (Array.isArray(data) && data.length > 0) {
                        value = data[0];
                    }
                    const finalObj = {};
                    Object.keys(value).forEach(key => {
                        finalObj[key] = typeof value[key];
                        if (finalObj[key] !== 'string' && finalObj[key] !== 'boolean' && finalObj[key] !== 'number') {
                            finalObj[key] = 'string';
                        }
                    });
                    options.obj = JSON.stringify(finalObj);
                    options.parameters = Object.keys(value);
                    templateOptions.parameters = Object.keys(value);
                    voOptions.obj = JSON.stringify(finalObj);
                    templateOptions.obj = JSON.stringify(finalObj);
                    observer.next(host);
                    observer.complete();
                })
                .catch(function (err: any) {
                    console.error(`JSON parse error ${err}`);
                    observer.error(err);
                });
        });
    };
}

/**
 * Adds the import into the core module for eager loading.
 * @param {Schema} options
 * @returns {Rule}
 */
function importIntoCoreModule(options: CrudOptions): Rule {
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
function addToAppRouting(options: CrudOptions): Rule {
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
export function crud(options: CrudOptions): Rule {
    return (host: Tree, context: SchematicContext) => {
        setupOptions(host, options);
        // defaults
        const defaultOptions = {
            styleext: readValueFromJsonFile(host, options.path, 'style'),
            ui: UI_FRAMEWORK_OPTION.MATERIAL.toString()
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
        options.view = (options.view) ? options.view : options.name;
        options.viewPath = (options.viewPath) ? options.viewPath : join(options.path, constants.viewsFolder, strings.dasherize(options.view));
        options.basePath = (options.eager) ? normalize(strings.dasherize(strings.pluralize(options.name))) : normalize('');
        const movePath = (options.flat) ?
            join(options.path, constants.viewsFolder) :
            join(options.path, constants.viewsFolder, strings.dasherize(options.name));

        const voOptions: VoOptions = {
            project: options.project,
            path: options.path,
            name: options.vo,
            spec: options.spec,
            obj: options.obj
        };

        const templateOptions = {
            ...strings,
            ...defaultOptions,
            'if-flat': (s: string) => options.flat ? '' : s,
            ...options
        };

        const serviceOptions: ServiceOptions = {
            project: options.project,
            path: options.path,
            name: options.service,
            spec: options.spec,
            skipVo: true
        };

        // determine service endpoint
        if (options.url) {
            const lastSlash = options.url.charAt(options.url.length - 1) !== '/' ? options.url.lastIndexOf('/') : options.url.lastIndexOf('/', options.url.lastIndexOf('/') - 1);
            serviceOptions.endpoint = options.url.slice(lastSlash);
            serviceOptions.uri = options.url.slice(0, lastSlash);
            serviceOptions.suffix = '';
            const lastDot = serviceOptions.endpoint.indexOf('.');
            if (lastDot > -1) {
                serviceOptions.suffix = serviceOptions.endpoint.slice(lastDot);
                serviceOptions.endpoint = serviceOptions.endpoint.slice(0, lastDot);
            }
        }
        serviceOptions.endpoint = (serviceOptions.endpoint) ? serviceOptions.endpoint : strings.dasherize(options.service);

        const rule = chain([
            options.url ? buildProperties(options, voOptions, templateOptions) : noop(),
            options.skipVo ? noop() : schematic(constants.voSchematic, voOptions),
            options.skipService ? noop() : schematic(constants.serviceSchematic, serviceOptions),
            mergeWith(apply(url('./files'), [
                options.spec ? noop() : filter(path => !path.endsWith(constants.specFileExtension)),
                template(templateOptions),
                move(movePath),
            ]), MergeStrategy.Default),
            options.eager ? importIntoCoreModule(options) : addToAppRouting(options)
        ]);
        return rule(host, context);
    };
}