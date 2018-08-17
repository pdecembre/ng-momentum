"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const strings_1 = require("../utils/strings");
const setup_1 = require("../utils/setup");
const constants_1 = require("../utils/constants");
var MODEL_OPTION;
(function (MODEL_OPTION) {
    MODEL_OPTION["Blank"] = "blank";
    MODEL_OPTION["List"] = "list";
    MODEL_OPTION["Selected"] = "selected";
})(MODEL_OPTION = exports.MODEL_OPTION || (exports.MODEL_OPTION = {}));
exports.MODEL_OPTIONS = [MODEL_OPTION.Blank, MODEL_OPTION.List, MODEL_OPTION.Selected];
/**
 * Creates a Service.
 * @param {Schema} options
 * @returns {Rule}
 */
function model(options) {
    return (host, context) => {
        setup_1.setupOptions(host, options);
        // defaults
        options.vo = (options.vo) ? options.vo : options.name;
        options.voPath = (options.voPath) ? options.voPath : core_1.join(options.path, constants_1.constants.voFolder, strings_1.strings.dasherize(strings_1.strings.singularize(options.vo)));
        options.service = (options.service) ? options.service : options.name;
        options.servicePath = (options.servicePath) ? options.servicePath : core_1.join(options.path, constants_1.constants.servicesFolder, strings_1.strings.dasherize(strings_1.strings.pluralize(options.service)));
        options.template = (exports.MODEL_OPTIONS.indexOf(options.template) >= 0) ? options.template : MODEL_OPTION.Blank;
        // no vo or service necessary for blank model
        if (options.template === MODEL_OPTION.Blank) {
            options.skipService = true;
            options.skipVo = true;
        }
        // create vo options
        const voOptions = {
            project: options.project,
            path: options.path,
            name: options.vo,
            spec: options.spec,
            obj: options.obj
        };
        const serviceOptions = {
            project: options.project,
            path: options.path,
            name: options.service,
            skipVo: true,
            spec: options.spec
        };
        let movePath = (options.flat) ?
            core_1.join(options.path, constants_1.constants.modelsFolder) :
            core_1.join(options.path, constants_1.constants.modelsFolder, strings_1.strings.dasherize(options.name));
        if (options.template === MODEL_OPTION.List) {
            movePath = (options.flat) ?
                core_1.join(options.path, constants_1.constants.modelsFolder) :
                core_1.join(options.path, constants_1.constants.modelsFolder, strings_1.strings.dasherize(strings_1.strings.pluralize(options.name)));
        }
        else if (options.template === MODEL_OPTION.Selected) {
            movePath = (options.flat) ?
                core_1.join(options.path, constants_1.constants.modelsFolder) :
                core_1.join(options.path, constants_1.constants.modelsFolder, strings_1.strings.dasherize(strings_1.strings.singularize(options.name)));
        }
        // get template source
        const templateSource = schematics_1.apply(schematics_1.url('./files/' + options.template), [
            options.spec ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith(constants_1.constants.specFileExtension)),
            schematics_1.template(Object.assign({}, strings_1.strings, { 'if-flat': (s) => options.flat ? '' : s }, options)),
            schematics_1.move(movePath),
        ]);
        const rule = schematics_1.chain([
            options.skipVo ? schematics_1.noop() : schematics_1.schematic(constants_1.constants.voSchematic, voOptions),
            options.skipService ? schematics_1.noop() : schematics_1.schematic(constants_1.constants.serviceSchematic, serviceOptions),
            schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Default)
        ]);
        return rule(host, context);
    };
}
exports.model = model;
//# sourceMappingURL=index.js.map