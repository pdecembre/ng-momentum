import * as stringUtil from '@angular-devkit/core';
import * as pluralUtil from 'pluralize';

function classify(value): string {
    return stringUtil.strings.classify(value);
}

function dasherize(value): string {
    return stringUtil.strings.dasherize(value);
}

function camelize(value): string {
    return stringUtil.strings.camelize(value);
}

function capitalize(value): string {
    return stringUtil.strings.capitalize(value);
}

function decamelize(value): string {
    return stringUtil.strings.decamelize(value);
}

function underscore(value): string {
    return stringUtil.strings.underscore(value);
}

function pluralize(value): string {
    return pluralUtil.plural(value);
}

function singularize(value): string {
    return pluralUtil.singular(value);
}

function absolutePath(value):string {
    const index = /[a-z]/i.exec(value).index;
    if(index >= 1){
        return value.substr(index);
    }
    return value
}

function absoluteSrcPath(value):string {
    const index = value.indexOf('src');
    if(index >= 1){
        return value.substr(index);
    }
    return value
}

export const strings = {
    classify,
    dasherize,
    camelize,
    capitalize,
    decamelize,
    underscore,
    pluralize,
    singularize,
    absolutePath,
    absoluteSrcPath
};