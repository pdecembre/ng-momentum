import {DirEntry, SchematicsException, Tree} from '@angular-devkit/schematics';
import {addDeclarationToModule, addExportToModule, addImportToModule} from '@schematics/angular/utility/ast-utils';
import {InsertChange} from '@schematics/angular/utility/change';
import {buildRelativePath} from '@schematics/angular/utility/find-module';
import {Schema as HasImportOptions} from './has-import-schema';
import {Schema as BaseOptions} from './schema';
import {strings} from './strings';
import * as ts from 'typescript';
import {normalize, Path, join} from "@angular-devkit/core";
import {constants} from "./constants";

export function addImportToFile(host: Tree, addContent: string, path: string): Tree {
    const buffer = host.read(path);
    if (buffer === null) {
        throw new SchematicsException(`Cound not read file: main.ts`);
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

export function addRouteToAppRoutingModule(host: Tree, options: HasImportOptions & BaseOptions): Tree {
    const path = strings.dasherize(options.name);
    const modulePath = options.module;
    const childrenPath = (options.flat) ?
        normalize('./' + constants.viewsFolder) :
        normalize('./' + constants.viewsFolder + '/' + strings.dasherize(options.name));
    const loadChildren = '../app/' + normalize(childrenPath
        + '/' + strings.dasherize(options.name)
        + '.module#'
        + strings.classify(options.name) + 'Module');
    // read target file
    const text = host.read(modulePath);
    if (text === null) {
        throw new SchematicsException(`File ${modulePath} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
    const recorder = host.beginUpdate(modulePath);
    const nodes = findNodes(source, ts.SyntaxKind.VariableStatement);
    // TODO add check if it already exists
    const contentToAdd = {path, loadChildren};
    nodes.forEach(node => {
        if (node.getText().indexOf('routes') > -1 && node.getChildCount() > 0) {
            const nodeList = findNodes(node, ts.SyntaxKind.VariableDeclaration);
            const openParenthsList = findNodes(nodeList[0], ts.SyntaxKind.OpenBraceToken);
            const start = openParenthsList[0].pos;
            const content = _buildIndent(4) + JSON.stringify(contentToAdd)
                .replace(/\"/g, "'")
                .replace(/\:/g, ": ")
                .replace(/\,/g, ", ") + ',';
            recorder.insertLeft(start, new Buffer(content))
        }
    });
    host.commitUpdate(recorder);
    return host;
}

export function addImportToNgModule(host: Tree, options: HasImportOptions & BaseOptions, classifiedName: string): Tree {
    if (options.skipImport || !options.module) {
        return host;
    }
    const modulePath = options.module;
    const text = host.read(modulePath);
    if (text === null) {
        throw new SchematicsException(`File ${modulePath} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

    const insertPath = `/${options.path}/`
        + (options.flat ? '' : strings.dasherize(options.name) + '/')
        + strings.dasherize(options.name)
        + '.module';
    const relativePath = buildRelativePath(modulePath, insertPath);
    const declarationChanges = addImportToModule(source,
        modulePath,
        classifiedName,
        relativePath);
    const declarationRecorder = host.beginUpdate(modulePath);
    for (const change of declarationChanges) {
        if (change instanceof InsertChange) {
            declarationRecorder.insertLeft(change.pos, change.toAdd);
        }
    }
    host.commitUpdate(declarationRecorder);

    if (options.export) {
        // Need to refresh the AST because we overwrote the file in the host.
        const text = host.read(modulePath);
        if (text === null) {
            throw new SchematicsException(`File ${modulePath} does not exist.`);
        }
        const sourceText = text.toString('utf-8');
        const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

        const exportRecorder = host.beginUpdate(modulePath);
        const exportChanges = addExportToModule(source, modulePath,
            strings.classify(`${options.name}Module`),
            relativePath);

        for (const change of exportChanges) {
            if (change instanceof InsertChange) {
                exportRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(exportRecorder);
    }
    return host;
}

export function addDeclarationToNgModule(host: Tree, options: HasImportOptions & BaseOptions, classifiedName: string): Tree {
    if (options.skipImport || !options.module) {
        return host;
    }
    const modulePath = options.module;
    const text = host.read(modulePath);
    if (text === null) {
        throw new SchematicsException(`File ${modulePath} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

    const insertPath = `/${options.path}/`
        + (options.flat ? '' : strings.dasherize(options.name) + '/')
        + strings.dasherize(options.name)
        + '.module';
    const relativePath = buildRelativePath(modulePath, insertPath);
    const declarationChanges = addDeclarationToModule(source,
        modulePath,
        classifiedName,
        relativePath);
    const declarationRecorder = host.beginUpdate(modulePath);
    for (const change of declarationChanges) {
        if (change instanceof InsertChange) {
            declarationRecorder.insertLeft(change.pos, change.toAdd);
        }
    }
    host.commitUpdate(declarationRecorder);

    if (options.export) {
        // Need to refresh the AST because we overwrote the file in the host.
        const text = host.read(modulePath);
        if (text === null) {
            throw new SchematicsException(`File ${modulePath} does not exist.`);
        }
        const sourceText = text.toString('utf-8');
        const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);

        const exportRecorder = host.beginUpdate(modulePath);
        const exportChanges = addExportToModule(source, modulePath,
            strings.classify(`${options.name}Module`),
            relativePath);

        for (const change of exportChanges) {
            if (change instanceof InsertChange) {
                exportRecorder.insertLeft(change.pos, change.toAdd);
            }
        }
        host.commitUpdate(exportRecorder);
    }
    return host;
}

export function findNodes(node: ts.Node, kind: ts.SyntaxKind, max = Infinity): ts.Node[] {
    if (!node || max == 0) {
        return [];
    }

    const arr: ts.Node[] = [];
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

export interface ModuleOptions {
    module?: string;
    name: string;
    flat?: boolean;
    path?: string;
    skipImport?: boolean;
}

/**
 * Find the module referred by a set of options passed to the schematics.
 */
export function findRoutingModuleFromOptions(host: Tree, options: ModuleOptions): Path | undefined {
    if (options.hasOwnProperty('skipImport') && options.skipImport) {
        return undefined;
    }

    if (!options.module) {
        const pathToCheck = (options.path || '')
            + (options.flat ? '' : '/' + strings.dasherize(options.name));

        return normalize(findRoutingModule(host, pathToCheck));
    } else {
        const modulePath = normalize(
            '/' + (options.path) + '/' + options.module);
        const moduleBaseName = normalize(modulePath).split('/').pop();

        if (host.exists(modulePath)) {
            return normalize(modulePath);
        } else if (host.exists(modulePath + '.ts')) {
            return normalize(modulePath + '.ts');
        } else if (host.exists(modulePath + '.module.ts')) {
            return normalize(modulePath + '.module.ts');
        } else if (host.exists(modulePath + '/' + moduleBaseName + '.module.ts')) {
            return normalize(modulePath + '/' + moduleBaseName + '.module.ts');
        } else {
            throw new Error('Specified module does not exist');
        }
    }
}

/**
 * Function to find the "closest" module to a generated file's path.
 */
export function findRoutingModule(host: Tree, generateDir: string): Path {
    let dir: DirEntry | null = host.getDir('/' + generateDir);

    const routingModuleRe = /\.routing\.module\.ts/;

    while (dir) {
        const matches = dir.subfiles.filter(p => routingModuleRe.test(p));

        if (matches.length == 1) {
            return join(dir.path, matches[0]);
        } else if (matches.length > 1) {
            throw new Error('More than one module matches. Use skip-import option to skip importing '
                + 'the component into the closest module.');
        }

        dir = dir.parent;
    }

    throw new Error('Could not find an NgModule. Use the skip-import '
        + 'option to skip importing in NgModule.');
}

function _buildIndent(count: number): string {
    return '\n' + new Array(count + 1).join(' ');
}