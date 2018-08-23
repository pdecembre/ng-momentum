"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const strings_1 = require("../utils/strings");
const setup_1 = require("../utils/setup");
const constants_1 = require("../utils/constants");
const vo_utils_1 = require("../utils/vo-utils");
const scaffold_1 = require("../scaffold");
const json_editor_1 = require("../utils/json-editor");
const module_utils_1 = require("../utils/module-utils");
var VIEW_OPTION;
(function (VIEW_OPTION) {
    VIEW_OPTION["Blank"] = "blank";
    VIEW_OPTION["List"] = "list";
    VIEW_OPTION["DETAILS"] = "details";
    VIEW_OPTION["FORM"] = "form";
    VIEW_OPTION["TABLE"] = "table";
})(VIEW_OPTION = exports.VIEW_OPTION || (exports.VIEW_OPTION = {}));
exports.VIEW_OPTIONS = [VIEW_OPTION.Blank, VIEW_OPTION.List,
    VIEW_OPTION.DETAILS, VIEW_OPTION.FORM, VIEW_OPTION.TABLE];
/**
 * Reads the VO object to get the parameters to use for the schematic.
 * @param {Schema} options
 * @returns {Rule}
 */
function readVoObjectAndGetParameters(options, templateOptions) {
    return (host) => {
        if (options.template === VIEW_OPTION.Blank) {
            options.parameters = [];
            return host;
        }
        options.parameters = vo_utils_1.getVoProperties(host, options.voPath, strings_1.strings.dasherize(strings_1.strings.singularize(options.vo)));
        templateOptions.parameters = options.parameters;
        return host;
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
function view(options) {
    return (host, context) => {
        setup_1.setupOptions(host, options);
        // defaults
        const defaultOptions = {
            styleext: json_editor_1.readValueFromJsonFile(host, options.path, 'style'),
            ui: scaffold_1.UI_FRAMEWORK_OPTION.MATERIAL.valueOf()
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
        options.template = (exports.VIEW_OPTIONS.indexOf(options.template) >= 0) ? options.template : VIEW_OPTION.Blank;
        options.basePath = (options.eager) ? core_1.normalize(strings_1.strings.dasherize(options.name)) : core_1.normalize('');
        // no vo or service necessary for blank model
        if (options.template === VIEW_OPTION.Blank) {
            options.skipService = true;
            options.skipVo = true;
        }
        const movePath = (options.flat) ?
            core_1.join(options.path, constants_1.constants.viewsFolder) :
            core_1.join(options.path, constants_1.constants.viewsFolder, strings_1.strings.dasherize(options.name));
        const templateOptions = Object.assign({}, strings_1.strings, defaultOptions, { 'if-flat': (s) => options.flat ? '' : s }, options);
        const rule = schematics_1.chain([
            options.skipVo ? schematics_1.noop() : schematics_1.schematic(constants_1.constants.voSchematic, {
                name: options.vo,
                spec: options.spec,
                obj: options.obj
            }),
            readVoObjectAndGetParameters(options, templateOptions),
            options.skipService ? schematics_1.noop() : schematics_1.schematic(constants_1.constants.serviceSchematic, {
                name: options.service,
                spec: options.spec,
                skipVo: true
            }),
            schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files/' + options.template), [
                options.spec ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith(constants_1.constants.specFileExtension)),
                schematics_1.template(templateOptions),
                schematics_1.move(movePath),
            ]), schematics_1.MergeStrategy.Default),
            options.eager ? importIntoCoreModule(options) : addToAppRouting(options)
        ]);
        return rule(host, context);
    };
}
exports.view = view;
//# sourceMappingURL=index.js.map