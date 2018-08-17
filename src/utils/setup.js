"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@schematics/angular/utility/config");
const project_1 = require("@schematics/angular/utility/project");
const parse_name_1 = require("@schematics/angular/utility/parse-name");
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
function setupOptions(host, options) {
    const workspace = config_1.getWorkspace(host);
    if (!options.project) {
        options.project = Object.keys(workspace.projects)[0];
    }
    if (!options.project) {
        throw new schematics_1.SchematicsException('Option "project" is required.');
    }
    const project = workspace.projects[options.project];
    if (project.projectType !== 'application') {
        throw new schematics_1.SchematicsException(`momentum requires a project type of "application".`);
    }
    if (options.path === undefined) {
        options.path = core_1.normalize(project_1.buildDefaultPath(project));
    }
    const parsedPath = parse_name_1.parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
    return host;
}
exports.setupOptions = setupOptions;
//# sourceMappingURL=setup.js.map