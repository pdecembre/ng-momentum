"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const strings_1 = require("../utils/strings");
const setup_1 = require("../utils/setup");
const constants_1 = require("../utils/constants");
/**
 * Creates a Value Object.
 * @param {Schema} options
 * @returns {Rule}
 */
function vo(options) {
    return (host, context) => {
        setup_1.setupOptions(host, options);
        const movePath = (options.flat) ?
            core_1.join(options.path, constants_1.constants.voFolder) :
            core_1.join(options.path, constants_1.constants.voFolder, strings_1.strings.dasherize(strings_1.strings.singularize(options.name)));
        // get template source
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            options.spec ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith(constants_1.constants.specFileExtension)),
            schematics_1.template(Object.assign({}, strings_1.strings, options)),
            schematics_1.move(movePath),
        ]);
        const rule = schematics_1.chain([
            schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Default)
        ]);
        return rule(host, context);
    };
}
exports.vo = vo;
//# sourceMappingURL=index.js.map