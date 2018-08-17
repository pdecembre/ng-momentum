"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const strings_1 = require("../utils/strings");
const setup_1 = require("../utils/setup");
const constants_1 = require("../utils/constants");
/**
 * Creates a Service.
 * @param {Schema} options
 * @returns {Rule}
 */
function service(options) {
    return (host, context) => {
        setup_1.setupOptions(host, options);
        // defaults
        options.operations = (options.operations) ? options.operations : 'clrud';
        options.endpoint = (options.endpoint) ? options.endpoint : strings_1.strings.dasherize(options.name);
        options.vo = (options.vo) ? options.vo : options.name;
        options.voPath = (options.voPath) ? options.voPath : core_1.join(options.path, constants_1.constants.voFolder, strings_1.strings.dasherize(strings_1.strings.singularize(options.vo)));
        // create vo options
        const voOptions = {
            project: options.project,
            path: options.path,
            name: options.vo,
            spec: options.spec,
            obj: options.obj
        };
        const movePath = (options.flat) ?
            core_1.join(options.path, constants_1.constants.servicesFolder) :
            core_1.join(options.path, constants_1.constants.servicesFolder, strings_1.strings.dasherize(strings_1.strings.pluralize(options.name)));
        // get template source
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            options.spec ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith(constants_1.constants.specFileExtension)),
            schematics_1.template(Object.assign({}, strings_1.strings, { 'if-flat': (s) => options.flat ? '' : s }, options)),
            schematics_1.move(movePath),
        ]);
        const rule = schematics_1.chain([
            options.skipVo ? schematics_1.noop() : schematics_1.schematic(constants_1.constants.voSchematic, voOptions),
            schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Default)
        ]);
        return rule(host, context);
    };
}
exports.service = service;
//# sourceMappingURL=index.js.map