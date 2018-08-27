import {JsonArray, JsonAstObject, JsonObject, JsonParseMode, parseJsonAst} from '@angular-devkit/core';
import {SchematicsException, Tree} from '@angular-devkit/schematics';
import {
    appendPropertyInAstObject,
    findPropertyInAstObject,
    insertPropertyInAstObjectInOrder,
} from './json-utils';

const pkgJsonPath = '/package.json';
const angularJsonPath = '/angular.json';
const configJsonPath = '/../../.rocket-rc.json';

export interface NodeKeyValue {
    key: string;
    value: string | boolean | number;
}

export function addScriptIntoPackageJson(host: Tree, script: NodeKeyValue): Tree {
    const packageJsonAst = _readJson(host, pkgJsonPath);
    const scriptsNode = findPropertyInAstObject(packageJsonAst, 'scripts');
    const recorder = host.beginUpdate(pkgJsonPath);
    if (!scriptsNode) {
        // Haven't found the scripts key, add it to the root of the package.json.
        appendPropertyInAstObject(recorder, packageJsonAst, 'scripts', {
            [script.key]: script.value,
        }, 2);
    } else if (scriptsNode.kind === 'object') {
        const scriptNode = findPropertyInAstObject(scriptsNode, script.key);
        if (!scriptNode) {
            insertPropertyInAstObjectInOrder(recorder, scriptsNode, script.key, JSON.stringify(script.value), 4);
        } else {
            // found, we need to overwrite
            const {end, start} = scriptNode;
            recorder.remove(start.offset, end.offset - start.offset);
            recorder.insertRight(start.offset, JSON.stringify(script.value));
        }
    }
    host.commitUpdate(recorder);
    return host;
}

export function readValueFromAngularJsonBuildProjects(tree: Tree, key: string): string | number | boolean | JsonObject | JsonArray {
    const angularJsonAst = _readJson(tree, angularJsonPath);
    const projectsNode = findPropertyInAstObject(angularJsonAst, 'projects');
    if (!projectsNode || projectsNode.kind !== 'object') {
        return null; // stop, what the heck is up with this file?!
    }
    for (const projectNode of (projectsNode as JsonAstObject).properties) {
        if (projectsNode.kind !== 'object') {
            continue; // stop, what the heck is up with this file?!
        }
        const architectNode = findPropertyInAstObject((projectNode.value as JsonAstObject), 'architect');
        if (!architectNode || architectNode.kind !== 'object') {
            continue; // stop, what the heck is up with this file?!
        }
        const buildNode = findPropertyInAstObject(architectNode as JsonAstObject, 'build');
        if (!buildNode || buildNode.kind !== 'object') {
            continue; // stop, what the heck is up with this file?!
        }
        const optionsNode = findPropertyInAstObject(buildNode as JsonAstObject, 'options');
        if (!optionsNode || optionsNode.kind !== 'object') {
            continue; // stop, what the heck is up with this file?!
        }
        // NOW we can finally enter our scripts
        const valueNode = findPropertyInAstObject(optionsNode, key);
        if (!valueNode) {
            return null;
        } else {
            return valueNode.value;
        }
    }
}

export function readValueFromJsonFile(tree: Tree, path: string, key: string): string {
    const jsonAst = _readJson(tree, path + configJsonPath);
    const node = findPropertyInAstObject(jsonAst, key);
    if (!node) {
        return null;
    } else {
        return node.value.toString();
    }
}

export function addValueIntoAngularJsonBuildProjects(host: Tree, keyValue: NodeKeyValue): Tree {
    const angularJsonAst = _readJson(host, angularJsonPath);
    const projectsNode = findPropertyInAstObject(angularJsonAst, 'projects');
    if (!projectsNode || projectsNode.kind !== 'object') {
        return; // stop, what the heck is up with this file?!
    }
    const recorder = host.beginUpdate(angularJsonPath);
    for (const projectNode of (projectsNode as JsonAstObject).properties) {
        if (projectsNode.kind !== 'object') {
            continue; // stop, what the heck is up with this file?!
        }
        const architectNode = findPropertyInAstObject((projectNode.value as JsonAstObject), 'architect');
        if (!architectNode || architectNode.kind !== 'object') {
            continue; // stop, what the heck is up with this file?!
        }
        const buildNode = findPropertyInAstObject(architectNode as JsonAstObject, 'build');
        if (!buildNode || buildNode.kind !== 'object') {
            continue; // stop, what the heck is up with this file?!
        }
        const optionsNode = findPropertyInAstObject(buildNode as JsonAstObject, 'options');
        if (!optionsNode || optionsNode.kind !== 'object') {
            continue; // stop, what the heck is up with this file?!
        }
        // NOW we can finally enter our scripts
        const valueNode = findPropertyInAstObject(optionsNode, keyValue.key);
        if (!valueNode) {
            insertPropertyInAstObjectInOrder(recorder, optionsNode, keyValue.key, keyValue.value, 13);
        } else {
            // found, we need to overwrite
            const {end, start} = valueNode;
            recorder.remove(start.offset, end.offset - start.offset);
            recorder.insertRight(start.offset, JSON.stringify(keyValue.value));
        }
    }
    host.commitUpdate(recorder);
    return host;
}

function _readJson(tree: Tree, path: string): JsonAstObject {
    const buffer = tree.read(path);
    if (buffer === null) {
        throw new SchematicsException(`Could not read ${path}.`);
    }
    const content = buffer.toString();

    const json = parseJsonAst(content, JsonParseMode.Strict);
    if (json.kind != 'object') {
        throw new SchematicsException(`Invalid ${path}. Was expecting an object`);
    }

    return json;
}