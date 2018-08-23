"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const strings_1 = require("../utils/strings");
const setup_1 = require("../utils/setup");
const constants_1 = require("../utils/constants");
const scaffold_1 = require("../scaffold");
const json_editor_1 = require("../utils/json-editor");
const Observable_1 = require("rxjs/internal/Observable");
const fetch = require("node-fetch");
const module_utils_1 = require("../utils/module-utils");
/**
 * Requests the build properties from the endpoint or pulls from provided object.
 * @param {CrudOptions} options
 * @param {VoOptions} voOptions
 * @param {Object} templateOptions
 * @returns {Rule}
 */
function buildProperties(options, voOptions, templateOptions) {
    return (host) => {
        return new Observable_1.Observable((observer) => {
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
                .catch(function (err) {
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
function importIntoCoreModule(options) {
    return (host) => {
        options.module = `${options.path}${constants_1.constants.coreModule}`;
        const classifiedName = `${strings_1.strings.classify(options.name)}Module`;
        module_utils_1.addImportToNgModule(host, options, classifiedName);
        return host;
    };
}
/**
 * Adds the route into the app.routing.ts file for lazy loading.
 * @param options
 * @returns {Rule}
 */
function addToAppRouting(options) {
    return (host) => {
        options.module = module_utils_1.findRoutingModuleFromOptions(host, options);
        module_utils_1.addRouteToAppRoutingModule(host, options);
        return host;
    };
}
/**
 * Creates a Service.
 * @param {Schema} options
 * @returns {Rule}
 */
function crud(options) {
    return (host, context) => {
        setup_1.setupOptions(host, options);
        // defaults
        const defaultOptions = {
            styleext: json_editor_1.readValueFromJsonFile(host, options.path, 'style'),
            ui: scaffold_1.UI_FRAMEWORK_OPTION.MATERIAL.toString()
        };
        const projectUiFramework = json_editor_1.readValueFromJsonFile(host, options.path, 'uiFramework');
        if (options.uiFramework && options.uiFramework !== scaffold_1.UI_FRAMEWORK_OPTION.MATERIAL) {
            defaultOptions.ui = options.uiFramework;
        }
        else if (!options.uiFramework && projectUiFramework) {
            defaultOptions.ui = projectUiFramework;
        }
        options.vo = (options.vo) ? options.vo : options.name;
        options.voPath = (options.voPath) ? options.voPath : core_1.join(options.path, constants_1.constants.voFolder, strings_1.strings.dasherize(strings_1.strings.singularize(options.vo)));
        options.service = (options.service) ? options.service : options.name;
        options.servicePath = (options.servicePath) ? options.servicePath : core_1.join(options.path, constants_1.constants.servicesFolder, strings_1.strings.dasherize(strings_1.strings.pluralize(options.service)));
        options.view = (options.view) ? options.view : options.name;
        options.viewPath = (options.viewPath) ? options.viewPath : core_1.join(options.path, constants_1.constants.viewsFolder, strings_1.strings.dasherize(options.view));
        options.basePath = (options.eager) ? core_1.normalize(strings_1.strings.dasherize(strings_1.strings.pluralize(options.name))) : core_1.normalize('');
        const movePath = (options.flat) ?
            core_1.join(options.path, constants_1.constants.viewsFolder) :
            core_1.join(options.path, constants_1.constants.viewsFolder, strings_1.strings.dasherize(options.name));
        const voOptions = {
            project: options.project,
            path: options.path,
            name: options.vo,
            spec: options.spec,
            obj: options.obj
        };
        const templateOptions = Object.assign({}, strings_1.strings, defaultOptions, { 'if-flat': (s) => options.flat ? '' : s }, options);
        const serviceOptions = {
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
        serviceOptions.endpoint = (serviceOptions.endpoint) ? serviceOptions.endpoint : strings_1.strings.dasherize(options.service);
        const rule = schematics_1.chain([
            options.url ? buildProperties(options, voOptions, templateOptions) : schematics_1.noop(),
            options.skipVo ? schematics_1.noop() : schematics_1.schematic(constants_1.constants.voSchematic, voOptions),
            options.skipService ? schematics_1.noop() : schematics_1.schematic(constants_1.constants.serviceSchematic, serviceOptions),
            schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files'), [
                options.spec ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith(constants_1.constants.specFileExtension)),
                schematics_1.template(templateOptions),
                schematics_1.move(movePath),
            ]), schematics_1.MergeStrategy.Default),
            options.eager ? importIntoCoreModule(options) : addToAppRouting(options)
        ]);
        return rule(host, context);
    };
}
exports.crud = crud;
//# sourceMappingURL=index.js.map