"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringUtil = require("@angular-devkit/core");
const pluralUtil = require("pluralize");
function classify(value) {
    return stringUtil.strings.classify(value);
}
function dasherize(value) {
    return stringUtil.strings.dasherize(value);
}
function camelize(value) {
    return stringUtil.strings.camelize(value);
}
function capitalize(value) {
    return stringUtil.strings.capitalize(value);
}
function decamelize(value) {
    return stringUtil.strings.decamelize(value);
}
function underscore(value) {
    return stringUtil.strings.underscore(value);
}
function pluralize(value) {
    return pluralUtil.plural(value);
}
function singularize(value) {
    return pluralUtil.singular(value);
}
exports.strings = {
    classify,
    dasherize,
    camelize,
    capitalize,
    decamelize,
    underscore,
    pluralize,
    singularize
};
//# sourceMappingURL=strings.js.map