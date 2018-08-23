"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
exports.constants = {
    voSchematic: 'vo',
    serviceSchematic: 'service',
    viewSchematic: 'view',
    previousFolder: '..',
    styleTemplateFileExtension: '.__styleext__',
    specFileExtension: '.spec.ts',
    tsFileExtension: '.ts',
    coreModule: '/core/core.module.ts',
    routesModule: '/app.routing.module.ts',
    get voFolder() {
        return core_1.normalize('/vos');
    },
    get servicesFolder() {
        return core_1.normalize('/services');
    },
    get modelsFolder() {
        return core_1.normalize('/models');
    },
    get viewsFolder() {
        return core_1.normalize('/views');
    }
};
//# sourceMappingURL=constants.js.map