"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const change_1 = require("@schematics/angular/utility/change");
const find_module_1 = require("@schematics/angular/utility/find-module");
const strings_1 = require("./strings");
const ts = require("typescript");
const core_1 = require("@angular-devkit/core");
const constants_1 = require("./constants");
function addImportToFile(host, addContent, path) {
    const buffer = host.read(path);
    if (buffer === null) {
        throw new schematics_1.SchematicsException(`Cound not read file: main.ts`);
    }
    const content = buffer.toString();
    const lines = content.split('\n');
    const updatedIndex = [
        addContent,
        ...lines
    ].join('\n');
    host.overwrite(path, updatedIndex);
    return host;
}
exports.addImportToFile = addImportToFile;
function addRouteToAppRoutingModule(host, options) {
    const path = strings_1.strings.dasherize(options.name);
    const modulePath = options.module;
    const childrenPath = (options.flat) ?
        core_1.normalize('./' + constants_1.constants.viewsFolder) :
        core_1.normalize('./' + constants_1.constants.viewsFolder + '/' + strings_1.strings.dasherize(options.name));
    const loadChildren = '../app/' + core_1.normalize(childrenPath
        + '/' + strings_1.strings.dasherize(options.name)
        + '.module#'
        + strings_1.strings.classify(options.name) + 'Module');
    // read target file
    const text = host.read(modulePath);
    if (text === null) {
        throw new schematics_1.SchematicsException(`File ${modulePath} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
    const recorder = host.beginUpdate(modulePath);
    const nodes = findNodes(source, ts.SyntaxKind.VariableStatement);
    // TODO add check if it already exists
    const contentToAdd = { path, loadChildren };
    nodes.forEach(node => {
        if (node.getText().indexOf('routes') > -1 && node.getChildCount() > 0) {
            const nodeList = findNodes(node, ts.SyntaxKind.VariableDeclaration);
            const openParenthsList = findNodes(nodeList[0], ts.SyntaxKind.OpenBraceToken);
            const start = openParenthsList[0].pos;
            const content = _buildIndent(4) + JSON.stringify(contentToAdd)
                .replace(/\"/g, "'")
                .replace(/\:/g, ": ")
                .replace(/\,/g, ", ") + ',';
            recorder.insertLeft(start, new Buffer(content));
        }
    });
    host.commitUpdate(recorder);
    return host;
}
exports.addRouteToAppRoutingModule = addRouteToAppRoutingModule;
function addImportToNgModule(host, options, classifiedName) {
    if (options.skipImport || !options.module) {
        return host;
    }
    const modulePath = options.module;
    const text = host.read(modulePath);
    if (text === null) {
        throw new schematics_1.SchematicsException(`File ${modulePath} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
    const insertPath = `/${options.path}/`
        + (options.flat ? '' : strings_1.strings.dasherize(options.name) + '/')
        + strings_1.strings.dasherize(options.name)
        + '.module';
    const relativePath = find_module_1.buildRelativePath(modulePath, insertPath);
    const declarationChanges = ast_utils_1.addImportToModule(source, modulePath, classifiedName, relativePath);
    const declarationRecorder = host.beginUpdate(modulePath);
    for (const change of declarationChanges) {
        if (change instanceof change_1.InsertChange) {
            declarationRecorder.insertLeft(change.pos, change.toAdd);
        }
    }
    host.commitUpdate(declarationRecorder);
    if (options.export) {
        // Need to refresh the AST because we overwrote the file in the host.
        const text = host.read(modulePath);
        if (text === null) {
            throw new schematics_1.SchematicsException(`File ${modulePath} does not exist.`);
        }
        const sourceText = text.toString('utf-8');
        const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        const exportRecorder = host.beginUpdate(modulePath);
        const exportChanges = ast_utils_1.addExportToModule(source, modulePath, strings_1.strings.classify(`${options.name}Module`), relativePath);
        for (const change of exportChanges) {
            if (change instanceof change_1.InsertChange) {
                exportRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(exportRecorder);
    }
    return host;
}
exports.addImportToNgModule = addImportToNgModule;
function addDeclarationToNgModule(host, options, classifiedName) {
    if (options.skipImport || !options.module) {
        return host;
    }
    const modulePath = options.module;
    const text = host.read(modulePath);
    if (text === null) {
        throw new schematics_1.SchematicsException(`File ${modulePath} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
    const insertPath = `/${options.path}/`
        + (options.flat ? '' : strings_1.strings.dasherize(options.name) + '/')
        + strings_1.strings.dasherize(options.name)
        + '.module';
    const relativePath = find_module_1.buildRelativePath(modulePath, insertPath);
    const declarationChanges = ast_utils_1.addDeclarationToModule(source, modulePath, classifiedName, relativePath);
    const declarationRecorder = host.beginUpdate(modulePath);
    for (const change of declarationChanges) {
        if (change instanceof change_1.InsertChange) {
            declarationRecorder.insertLeft(change.pos, change.toAdd);
        }
    }
    host.commitUpdate(declarationRecorder);
    if (options.export) {
        // Need to refresh the AST because we overwrote the file in the host.
        const text = host.read(modulePath);
        if (text === null) {
            throw new schematics_1.SchematicsException(`File ${modulePath} does not exist.`);
        }
        const sourceText = text.toString('utf-8');
        const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        const exportRecorder = host.beginUpdate(modulePath);
        const exportChanges = ast_utils_1.addExportToModule(source, modulePath, strings_1.strings.classify(`${options.name}Module`), relativePath);
        for (const change of exportChanges) {
            if (change instanceof change_1.InsertChange) {
                exportRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(exportRecorder);
    }
    return host;
}
exports.addDeclarationToNgModule = addDeclarationToNgModule;
function findNodes(node, kind, max = Infinity) {
    if (!node || max == 0) {
        return [];
    }
    const arr = [];
    if (node.kind === kind) {
        arr.push(node);
        max--;
    }
    if (max > 0) {
        for (const child of node.getChildren()) {
            findNodes(child, kind, max).forEach(node => {
                if (max > 0) {
                    arr.push(node);
                }
                max--;
            });
            if (max <= 0) {
                break;
            }
        }
    }
    return arr;
}
exports.findNodes = findNodes;
/**
 * Find the module referred by a set of options passed to the schematics.
 */
function findRoutingModuleFromOptions(host, options) {
    if (options.hasOwnProperty('skipImport') && options.skipImport) {
        return undefined;
    }
    if (!options.module) {
        const pathToCheck = (options.path || '')
            + (options.flat ? '' : '/' + strings_1.strings.dasherize(options.name));
        return core_1.normalize(findRoutingModule(host, pathToCheck));
    }
    else {
        const modulePath = core_1.normalize('/' + (options.path) + '/' + options.module);
        const moduleBaseName = core_1.normalize(modulePath).split('/').pop();
        if (host.exists(modulePath)) {
            return core_1.normalize(modulePath);
        }
        else if (host.exists(modulePath + '.ts')) {
            return core_1.normalize(modulePath + '.ts');
        }
        else if (host.exists(modulePath + '.module.ts')) {
            return core_1.normalize(modulePath + '.module.ts');
        }
        else if (host.exists(modulePath + '/' + moduleBaseName + '.module.ts')) {
            return core_1.normalize(modulePath + '/' + moduleBaseName + '.module.ts');
        }
        else {
            throw new Error('Specified module does not exist');
        }
    }
}
exports.findRoutingModuleFromOptions = findRoutingModuleFromOptions;
/**
 * Function to find the "closest" module to a generated file's path.
 */
function findRoutingModule(host, generateDir) {
    let dir = host.getDir('/' + generateDir);
    const routingModuleRe = /\.routing\.module\.ts/;
    while (dir) {
        const matches = dir.subfiles.filter(p => routingModuleRe.test(p));
        if (matches.length == 1) {
            return core_1.join(dir.path, matches[0]);
        }
        else if (matches.length > 1) {
            throw new Error('More than one module matches. Use skip-import option to skip importing '
                + 'the component into the closest module.');
        }
        dir = dir.parent;
    }
    throw new Error('Could not find an NgModule. Use the skip-import '
        + 'option to skip importing in NgModule.');
}
exports.findRoutingModule = findRoutingModule;
function _buildIndent(count) {
    return '\n' + new Array(count + 1).join(' ');
}
//# sourceMappingURL=module-utils.js.map