import {JsonArray, JsonObject, normalize, strings} from '@angular-devkit/core';
import {
    Rule,
    Tree,
    apply,
    chain,
    mergeWith,
    template,
    filter,
    url,
    SchematicsException,
    noop, move, SchematicContext,
    externalSchematic, MergeStrategy
} from '@angular-devkit/schematics';
import {getWorkspace} from '@schematics/angular/utility/config';
import {Schema as ScaffoldOptions} from './schema';
import {setupOptions} from '../utils/setup';
import {constants} from '../utils/constants';
import {
    addScriptIntoPackageJson,
    addValueIntoAngularJsonBuildProjects,
    readValueFromAngularJsonBuildProjects
} from '../utils/json-editor';
import {NodeDependencyType, addPackageJsonDependency} from '../utils/dependencies';
import {addImportToFile} from "../utils/module-utils";

export enum UI_FRAMEWORK_OPTION {
    BASIC = 'basic',
    MATERIAL = 'material',
    BOOTSTRAP = 'bootstrap'
}

export const UI_FRAMEWORK_OPTIONS = [UI_FRAMEWORK_OPTION.BASIC, UI_FRAMEWORK_OPTION.MATERIAL, UI_FRAMEWORK_OPTION.BOOTSTRAP];

function addScriptsToPackageJson() {
    return (host: Tree) => {
        [{
            key: 'start',
            value: 'ng serve'
        }, {
            key: 'coverage',
            value: 'ng test --watch=false --code-coverage'
        }, {
            key: 'i18n',
            value: 'ng xi18n'
        }, {
            key: 'compile',
            value: 'for lang in en; do ng build --output-path=dist/$lang --prod --base-href=/$lang/ --i18n-file=src/locale/messages.$lang.xlf --i18n-format=xlf --i18n-locale=$lang; done'
        }, {
            key: 'docs',
            value: 'compodoc -p tsconfig.json'
        }, {
            key: 'serve-docs',
            value: 'compodoc -s -r 4300'
        }].forEach(script => addScriptIntoPackageJson(host, script));
        return host;
    }
}

function addDependenciesToPackageJson(options: ScaffoldOptions) {
    return (host: Tree) => {
        if (options.uiFramework === UI_FRAMEWORK_OPTION.MATERIAL) {
            [{
                type: NodeDependencyType.Default,
                name: 'hammerjs',
                version: '^2.0.8'
            }].forEach(dependency => addPackageJsonDependency(host, dependency));
        } else if (options.uiFramework === UI_FRAMEWORK_OPTION.BOOTSTRAP) {
            [{
                type: NodeDependencyType.Default,
                name: '@ng-bootstrap/ng-bootstrap',
                version: '^2.2.0'
            }].forEach(dependency => addPackageJsonDependency(host, dependency));
        } else {
            return host;
        }
        return host;
    };
}

function addPWAScriptsToPackageJson() {
    return (host: Tree) => {
        [{
            key: 'ngsw-config',
            value: 'ngsw-config dist ngsw-config.json'
        }, {
            key: 'ngsw-copy',
            value: 'cp ./node_modules/@angular/service-worker/ngsw-worker.js dist/'
        }, {
            key: 'build-prod-ngsw',
            value: 'ng build --prod && npm run ngsw-config && npm run ngsw-copy'
        }, {
            key: 'serve-prod-ngsw',
            value: 'npm run build-prod-ngsw && http-server dist -p 8000'
        }].forEach(script => addScriptIntoPackageJson(host, script));
        return host;
    }
}

function updateMainFile(options: ScaffoldOptions) {
    return (host: Tree) => {
        const workspace = getWorkspace(host);
        const project = workspace.projects[options.project as string];
        let path: string;
        if (project && project.architect && project.architect.build &&
            project.architect.build.options.index) {
            path = project.architect.build.options.main;
        } else {
            throw new SchematicsException('Could not find main.ts file for the project');
        }
        addImportToFile(host, "import 'hammerjs';", path);
        return host;
    };
}

function addOptionsToAngularJson() {
    return (host: Tree) => {
        [{
            key: 'baseHref',
            value: '/en/'
        }, {
            key: 'i18nFile',
            value: 'src/locale/messages.en.xlf'
        }, {
            key: 'i18nLocale',
            value: 'en'
        }, {
            key: 'i18nFormat',
            value: 'xlf'
        }, {
            key: 'aot',
            value: true
        }].forEach(keyValue => addValueIntoAngularJsonBuildProjects(host, keyValue));
        return host;
    }
}

function getProjectSelectedStyleExt(host: Tree, path:string):string {
    const value = readValueFromAngularJsonBuildProjects(host, 'styles');
    const srcPath = normalize(path + constants.previousFolder).replace('/', '');
    if (!value || !(Array.isArray(value))) {
        return 'css';
    }
    const list: JsonArray = value;
    const findPath = srcPath + '/styles.';
    let foundStyleExt = 'css';
    list.forEach((obj: JsonObject) => {
        const val = JSON.stringify(obj);
        const index = val.indexOf(findPath);
        if (index === 1) {
            foundStyleExt = val.replace(findPath, '').replace(/\"/g, '');
        }
    });
    return foundStyleExt;
}

export function scaffold(options: ScaffoldOptions): Rule {
    return (host: Tree, context: SchematicContext) => {
        setupOptions(host, options);

        const defaultOptions = {
            styleext: getProjectSelectedStyleExt(host, options.path),
            ui: UI_FRAMEWORK_OPTION.MATERIAL.valueOf()
        };
        if (options.style && options.style !== defaultOptions.styleext) {
            defaultOptions.styleext = options.style;
        }
        if (options.uiFramework && options.uiFramework !== UI_FRAMEWORK_OPTION.MATERIAL) {
            defaultOptions.ui = options.uiFramework;
        }

        const templateOptions = {
            ...strings,
            ...defaultOptions,
            ...options,
        };

        const rule = chain([
            options.skipScripts ? noop() : addScriptsToPackageJson(),
            addOptionsToAngularJson(),
            addDependenciesToPackageJson(options),
            options.includePwa ? addPWAScriptsToPackageJson() : noop(),
            mergeWith(apply(url('./files'), [
                options.spec ? noop() : filter(path => !path.endsWith(constants.specFileExtension)),
                options.style ? noop() : filter(path => !path.endsWith(constants.styleTemplateFileExtension)),
                template(templateOptions),
                move(options.path),
            ]), MergeStrategy.Overwrite),
            mergeWith(apply(url('./otherfiles'), [
                options.spec ? noop() : filter(path => !path.endsWith(constants.specFileExtension)),
                options.style ? noop() : filter(path => !path.endsWith(constants.styleTemplateFileExtension)),
                template(templateOptions),
                move(normalize(options.path + constants.previousFolder)),
            ])),
            mergeWith(apply(url('./project-files'), [
                options.spec ? noop() : filter(path => !path.endsWith(constants.specFileExtension)),
                options.style ? noop() : filter(path => !path.endsWith(constants.styleTemplateFileExtension)),
                template(templateOptions),
                move(normalize(options.path + constants.previousFolder + constants.previousFolder)),
            ])),
            options.uiFramework === UI_FRAMEWORK_OPTION.MATERIAL ? externalSchematic('@angular/material', 'material-shell', {
                project: options.project
            }) : noop(),
            options.uiFramework === UI_FRAMEWORK_OPTION.MATERIAL ? updateMainFile(options) : noop(),
        ]);
        return rule(host, context);
    };
}