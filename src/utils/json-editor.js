"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const json_utils_1 = require("./json-utils");
const pkgJsonPath = '/package.json';
const angularJsonPath = '/angular.json';
const configJsonPath = '/../../.rocket-rc.json';
function addScriptIntoPackageJson(host, script) {
    const packageJsonAst = _readJson(host, pkgJsonPath);
    const scriptsNode = json_utils_1.findPropertyInAstObject(packageJsonAst, 'scripts');
    const recorder = host.beginUpdate(pkgJsonPath);
    if (!scriptsNode) {
        // Haven't found the scripts key, add it to the root of the package.json.
        json_utils_1.appendPropertyInAstObject(recorder, packageJsonAst, 'scripts', {
            [script.key]: script.value,
        }, 2);
    }
    else if (scriptsNode.kind === 'object') {
        const scriptNode = json_utils_1.findPropertyInAstObject(scriptsNode, script.key);
        if (!scriptNode) {
            json_utils_1.insertPropertyInAstObjectInOrder(recorder, scriptsNode, script.key, JSON.stringify(script.value), 4);
        }
        else {
            // found, we need to overwrite
            const { end, start } = scriptNode;
            recorder.remove(start.offset, end.offset - start.offset);
            recorder.insertRight(start.offset, JSON.stringify(script.value));
        }
    }
    host.commitUpdate(recorder);
    return host;
}
exports.addScriptIntoPackageJson = addScriptIntoPackageJson;
function readValueFromAngularJsonBuildProjects(tree, key) {
    const angularJsonAst = _readJson(tree, angularJsonPath);
    const projectsNode = json_utils_1.findPropertyInAstObject(angularJsonAst, 'projects');
    if (!projectsNode || projectsNode.kind !== 'object') {
        return null; // stop, what the heck is up with this file?!
    }
    for (const projectNode of projectsNode.properties) {
        if (projectsNode.kind !== 'object') {
            continue; // stop, what the heck is up with this file?!
        }
        const architectNode = json_utils_1.findPropertyInAstObject(projectNode.value, 'architect');
        if (!architectNode || architectNode.kind !== 'object') {
            continue; // stop, what the heck is up with this file?!
        }
        const buildNode = json_utils_1.findPropertyInAstObject(architectNode, 'build');
        if (!buildNode || buildNode.kind !== 'object') {
            continue; // stop, what the heck is up with this file?!
        }
        const optionsNode = json_utils_1.findPropertyInAstObject(buildNode, 'options');
        if (!optionsNode || optionsNode.kind !== 'object') {
            continue; // stop, what the heck is up with this file?!
        }
        // NOW we can finally enter our scripts
        const valueNode = json_utils_1.findPropertyInAstObject(optionsNode, key);
        if (!valueNode) {
            return null;
        }
        else {
            return valueNode.value;
        }
    }
}
exports.readValueFromAngularJsonBuildProjects = readValueFromAngularJsonBuildProjects;
function readValueFromJsonFile(tree, path, key) {
    const jsonAst = _readJson(tree, path + configJsonPath);
    const node = json_utils_1.findPropertyInAstObject(jsonAst, key);
    if (!node) {
        return null;
    }
    else {
        return node.value.toString();
    }
}
exports.readValueFromJsonFile = readValueFromJsonFile;
function addValueIntoAngularJsonBuildProjects(host, keyValue) {
    const angularJsonAst = _readJson(host, angularJsonPath);
    const projectsNode = json_utils_1.findPropertyInAstObject(angularJsonAst, 'projects');
    if (!projectsNode || projectsNode.kind !== 'object') {
        return; // stop, what the heck is up with this file?!
    }
    const recorder = host.beginUpdate(angularJsonPath);
    for (const projectNode of projectsNode.properties) {
        if (projectsNode.kind !== 'object') {
            continue; // stop, what the heck is up with this file?!
        }
        const architectNode = json_utils_1.findPropertyInAstObject(projectNode.value, 'architect');
        if (!architectNode || architectNode.kind !== 'object') {
            continue; // stop, what the heck is up with this file?!
        }
        const buildNode = json_utils_1.findPropertyInAstObject(architectNode, 'build');
        if (!buildNode || buildNode.kind !== 'object') {
            continue; // stop, what the heck is up with this file?!
        }
        const optionsNode = json_utils_1.findPropertyInAstObject(buildNode, 'options');
        if (!optionsNode || optionsNode.kind !== 'object') {
            continue; // stop, what the heck is up with this file?!
        }
        // NOW we can finally enter our scripts
        const valueNode = json_utils_1.findPropertyInAstObject(optionsNode, keyValue.key);
        if (!valueNode) {
            json_utils_1.insertPropertyInAstObjectInOrder(recorder, optionsNode, keyValue.key, keyValue.value, 13);
        }
        else {
            // found, we need to overwrite
            const { end, start } = valueNode;
            recorder.remove(start.offset, end.offset - start.offset);
            recorder.insertRight(start.offset, JSON.stringify(keyValue.value));
        }
    }
    host.commitUpdate(recorder);
    return host;
}
exports.addValueIntoAngularJsonBuildProjects = addValueIntoAngularJsonBuildProjects;
function _readJson(tree, path) {
    const buffer = tree.read(path);
    if (buffer === null) {
        throw new schematics_1.SchematicsException(`Could not read ${path}.`);
    }
    const content = buffer.toString();
    const json = core_1.parseJsonAst(content, core_1.JsonParseMode.Strict);
    if (json.kind != 'object') {
        throw new schematics_1.SchematicsException(`Invalid ${path}. Was expecting an object`);
    }
    return json;
}
//# sourceMappingURL=json-editor.js.map