"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const config_1 = require("@schematics/angular/utility/config");
const setup_1 = require("../utils/setup");
const constants_1 = require("../utils/constants");
const json_editor_1 = require("../utils/json-editor");
const dependencies_1 = require("../utils/dependencies");
const module_utils_1 = require("../utils/module-utils");
const overwrite_filter_1 = require("../utils/overwrite-filter");
var UI_FRAMEWORK_OPTION;
(function (UI_FRAMEWORK_OPTION) {
    UI_FRAMEWORK_OPTION["BASIC"] = "basic";
    UI_FRAMEWORK_OPTION["MATERIAL"] = "material";
    UI_FRAMEWORK_OPTION["BOOTSTRAP"] = "bootstrap";
})(UI_FRAMEWORK_OPTION = exports.UI_FRAMEWORK_OPTION || (exports.UI_FRAMEWORK_OPTION = {}));
exports.UI_FRAMEWORK_OPTIONS = [UI_FRAMEWORK_OPTION.BASIC, UI_FRAMEWORK_OPTION.MATERIAL, UI_FRAMEWORK_OPTION.BOOTSTRAP];
function addScriptsToPackageJson() {
    return (host) => {
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
            }].forEach(script => json_editor_1.addScriptIntoPackageJson(host, script));
        return host;
    };
}
function addDependenciesToPackageJson(options) {
    return (host) => {
        if (options.uiFramework === UI_FRAMEWORK_OPTION.MATERIAL) {
            [{
                    type: dependencies_1.NodeDependencyType.Default,
                    name: 'hammerjs',
                    version: '^2.0.8'
                }].forEach(dependency => dependencies_1.addPackageJsonDependency(host, dependency));
        }
        else if (options.uiFramework === UI_FRAMEWORK_OPTION.BOOTSTRAP) {
            [{
                    type: dependencies_1.NodeDependencyType.Default,
                    name: '@ng-bootstrap/ng-bootstrap',
                    version: '^2.2.0'
                }].forEach(dependency => dependencies_1.addPackageJsonDependency(host, dependency));
        }
        else {
            return host;
        }
        return host;
    };
}
function addPWAScriptsToPackageJson() {
    return (host) => {
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
            }].forEach(script => json_editor_1.addScriptIntoPackageJson(host, script));
        return host;
    };
}
function updateMainFile(options) {
    return (host) => {
        const workspace = config_1.getWorkspace(host);
        const project = workspace.projects[options.project];
        let path;
        if (project && project.architect && project.architect.build &&
            project.architect.build.options.index) {
            path = project.architect.build.options.main;
        }
        else {
            throw new schematics_1.SchematicsException('Could not find main.ts file for the project');
        }
        module_utils_1.addImportToFile(host, "import 'hammerjs';", path);
        return host;
    };
}
function addOptionsToAngularJson() {
    return (host) => {
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
            }].forEach(keyValue => json_editor_1.addValueIntoAngularJsonBuildProjects(host, keyValue));
        return host;
    };
}
function overwriteFiles(path) {
    return (host) => {
        [
            "app.component.html",
            "app.component.spec.ts",
            "app.component.ts",
            "app.module.ts"
        ].forEach(filename => {
            overwrite_filter_1.deleteFile(host, core_1.join(path, filename));
        });
        return host;
    };
}
function getProjectSelectedStyleExt(host, path) {
    const value = json_editor_1.readValueFromAngularJsonBuildProjects(host, 'styles');
    if (!value || !(Array.isArray(value))) {
        return 'css';
    }
    const list = value;
    const findPath = core_1.join(path, 'styles.');
    let foundStyleExt = 'css';
    list.forEach((obj) => {
        const val = core_1.join(core_1.normalize(obj.toString()));
        const index = val.indexOf(findPath);
        if (index >= 0) {
            foundStyleExt = val.replace(findPath, '');
        }
    });
    return foundStyleExt;
}
function scaffold(options) {
    return (host, context) => {
        setup_1.setupOptions(host, options);
        const workspace = config_1.getWorkspace(host);
        const project = workspace.projects[options.project];
        const rootPath = project.root;
        const sourcePath = core_1.join(project.root, 'src');
        const appPath = core_1.join(sourcePath, 'app');
        const defaultOptions = {
            styleext: getProjectSelectedStyleExt(host, sourcePath),
            ui: UI_FRAMEWORK_OPTION.MATERIAL.valueOf()
        };
        if (options.uiFramework && options.uiFramework !== UI_FRAMEWORK_OPTION.MATERIAL) {
            defaultOptions.ui = options.uiFramework;
        }
        const templateOptions = Object.assign({}, core_1.strings, defaultOptions, options);
        const rule = schematics_1.chain([
            options.skipScripts ? schematics_1.noop() : addScriptsToPackageJson(),
            addOptionsToAngularJson(),
            addDependenciesToPackageJson(options),
            options.includePwa ? addPWAScriptsToPackageJson() : schematics_1.noop(),
            overwriteFiles(appPath),
            schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files'), [
                options.spec ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith(constants_1.constants.specFileExtension)),
                defaultOptions.styleext ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith(constants_1.constants.styleTemplateFileExtension)),
                schematics_1.template(templateOptions),
                schematics_1.move(appPath),
            ]), schematics_1.MergeStrategy.Overwrite),
            schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./src-files'), [
                options.spec ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith(constants_1.constants.specFileExtension)),
                defaultOptions.styleext ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith(constants_1.constants.styleTemplateFileExtension)),
                schematics_1.template(templateOptions),
                schematics_1.move(sourcePath),
            ]), schematics_1.MergeStrategy.Default),
            schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./project-files'), [
                options.spec ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith(constants_1.constants.specFileExtension)),
                defaultOptions.styleext ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith(constants_1.constants.styleTemplateFileExtension)),
                schematics_1.template(templateOptions),
                schematics_1.move(rootPath),
            ]), schematics_1.MergeStrategy.Default),
            options.uiFramework === UI_FRAMEWORK_OPTION.MATERIAL ? schematics_1.externalSchematic('@angular/material', 'material-shell', {
                project: options.project
            }) : schematics_1.noop(),
            options.uiFramework === UI_FRAMEWORK_OPTION.MATERIAL ? updateMainFile(options) : schematics_1.noop(),
        ]);
        return rule(host, context);
    };
}
exports.scaffold = scaffold;
//# sourceMappingURL=index.js.map