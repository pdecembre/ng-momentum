import {Path, normalize} from "@angular-devkit/core";

export const constants = {
    voSchematic: 'vo',
    serviceSchematic: 'service',
    viewSchematic: 'view',
    previousFolder: '..',
    styleTemplateFileExtension: '.__styleext__',
    specFileExtension: '.spec.ts',
    tsFileExtension: '.ts',
    coreModule: '/core/core.module.ts',
    routesModule: '/app.routing.module.ts',

    get voFolder(): Path {
        return normalize('/vos')
    },

    get servicesFolder(): Path {
        return normalize('/services')
    },

    get modelsFolder(): Path {
        return normalize('/models')
    },

    get viewsFolder(): Path {
        return normalize('/views')
    }
};