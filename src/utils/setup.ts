import {getWorkspace} from '@schematics/angular/utility/config';
import {buildDefaultPath} from '@schematics/angular/utility/project';
import {parseName} from '@schematics/angular/utility/parse-name';
import {SchematicsException, Tree} from '@angular-devkit/schematics';
import {Schema} from './schema';
import {normalize} from "@angular-devkit/core";

export function setupOptions(host: Tree, options: Schema): Tree {
    const workspace = getWorkspace(host);
    if (!options.project) {
        options.project = Object.keys(workspace.projects)[0];
    }
    if (!options.project) {
        throw new SchematicsException('Option "project" is required.');
    }
    const project = workspace.projects[options.project];
    if (project.projectType !== 'application') {
        throw new SchematicsException(`momentum requires a project type of "application".`);
    }
    if (options.path === undefined) {
        options.path = normalize(buildDefaultPath(project));
    }

    const parsedPath = parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
    return host;
}