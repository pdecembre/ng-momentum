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
import {join} from '@angular-devkit/core';
import {strings} from '../utils/strings';
import {Schema as ModelOptions} from './schema';
import {Schema as VoOptions} from '../vo/schema';
import {Schema as ServiceOptions} from '../service/schema';
import {setupOptions} from '../utils/setup';
import {constants} from '../utils/constants';

export enum MODEL_OPTION {
    Blank = 'blank',
    List = 'list',
    Selected = 'selected'
}

export const MODEL_OPTIONS = [MODEL_OPTION.Blank, MODEL_OPTION.List, MODEL_OPTION.Selected];

/**
 * Creates a Service.
 * @param {Schema} options
 * @returns {Rule}
 */
export function model(options: ModelOptions): Rule {
    return (host: Tree, context: SchematicContext) => {
        setupOptions(host, options);
        // defaults
        options.vo = (options.vo) ? options.vo : options.name;
        options.voPath = (options.voPath) ? options.voPath : join(options.path, constants.voFolder, strings.dasherize(strings.singularize(options.vo)));
        options.service = (options.service) ? options.service : options.name;
        options.servicePath = (options.servicePath) ? options.servicePath : join(options.path, constants.servicesFolder, strings.dasherize(strings.pluralize(options.service)));
        options.template = (MODEL_OPTIONS.indexOf(options.template) >= 0) ? options.template : MODEL_OPTION.Blank;
        // no vo or service necessary for blank model
        if (options.template === MODEL_OPTION.Blank) {
            options.skipService = true;
            options.skipVo = true;
        }
        // create vo options
        const voOptions: VoOptions = {
            project: options.project,
            path: options.path,
            name: options.vo,
            spec: options.spec,
            obj: options.obj
        };

        const serviceOptions: ServiceOptions = {
            project: options.project,
            path: options.path,
            name: options.service,
            skipVo: true,
            spec: options.spec
        };

        let movePath = (options.flat) ?
            join(options.path, constants.modelsFolder) :
            join(options.path, constants.modelsFolder, strings.dasherize(options.name));
        if (options.template === MODEL_OPTION.List) {
            movePath = (options.flat) ?
                join(options.path, constants.modelsFolder) :
                join(options.path, constants.modelsFolder,strings.dasherize(strings.pluralize(options.name))
                );
        } else if (options.template === MODEL_OPTION.Selected) {
            movePath = (options.flat) ?
                join(options.path, constants.modelsFolder) :
                join(options.path, constants.modelsFolder, strings.dasherize(strings.singularize(options.name))
                );
        }

        // get template source
        const templateSource = apply(url('./files/' + options.template), [
            options.spec ? noop() : filter(path => !path.endsWith(constants.specFileExtension)),
            template({
                ...strings,
                'if-flat': (s: string) => options.flat ? '' : s,
                ...options,
            }),
            move(movePath),
        ]);

        const rule = chain([
            options.skipVo ? noop() : schematic(constants.voSchematic, voOptions),
            options.skipService ? noop() : schematic(constants.serviceSchematic, serviceOptions),
            mergeWith(templateSource, MergeStrategy.Default)
        ]);
        return rule(host, context);
    };
}