"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const testing_1 = require("@angular-devkit/schematics/testing");
const path = require("path");
// SchematicTestRunner needs an absolute path to the collection to test.
const collectionPath = path.join(__dirname, '../collection.json');
describe('view', () => {
    const schematicRunner = new testing_1.SchematicTestRunner('@schematics/angular', path.join(__dirname, '..', '..', 'node_modules', '@schematics', 'angular', 'collection.json'));
    const customRunner = new testing_1.SchematicTestRunner('momentum', path.join(__dirname, '..', 'collection.json'));
    const workspaceOptions = {
        name: 'workspace',
        newProjectRoot: 'projects',
        version: '6.0.0',
    };
    describe('with project', () => {
        const appOptions = {
            name: 'bar',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: 'scss',
            skipTests: false,
            skipPackageJson: false,
        };
        let appTree;
        beforeEach(() => {
            appTree = schematicRunner.runSchematic('workspace', workspaceOptions);
            appTree = schematicRunner.runSchematic('application', appOptions, appTree);
            appTree = customRunner.runSchematic('scaffold', {
                spec: true
            }, appTree);
        });
        it('requires required option', () => {
            // We test that
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('view', {}, appTree)).toThrow();
        });
        it('fails without app tree', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('view', {}, schematics_1.Tree.empty())).toThrow();
        });
        it('blank works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test'
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('blank works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                spec: false
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('details works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'details'
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('details works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'details',
                spec: false
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('form works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'form'
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('form works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'form',
                spec: false
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('list works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'list'
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('list works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'list',
                spec: false
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('table works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'table'
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('table works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'table',
                spec: false
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
    });
    describe('with eager loading', () => {
        const appOptions = {
            name: 'bar',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: 'scss',
            skipTests: false,
            skipPackageJson: false,
        };
        let appTree;
        beforeEach(() => {
            appTree = schematicRunner.runSchematic('workspace', workspaceOptions);
            appTree = schematicRunner.runSchematic('application', appOptions, appTree);
            appTree = customRunner.runSchematic('scaffold', {
                spec: true
            }, appTree);
        });
        it('requires required option', () => {
            // We test that
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('view', {}, appTree)).toThrow();
        });
        it('fails without app tree', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('view', {}, schematics_1.Tree.empty())).toThrow();
        });
        it('blank works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                eager: true
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBe(-1);
            //console.debug(tree.readContent('/projects/bar/src/app/core/core.module.ts'));
            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf("import { TestModule } from '../test/test.module';")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('blank works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                spec: false,
                eager: true
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBe(-1);
            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf("import { TestModule } from '../test/test.module';")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('details works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'details',
                eager: true
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBe(-1);
            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf("import { TestModule } from '../test/test.module';")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('details works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'details',
                spec: false,
                eager: true
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBe(-1);
            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf("import { TestModule } from '../test/test.module';")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('form works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'form',
                eager: true
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBe(-1);
            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf("import { TestModule } from '../test/test.module';")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('form works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'form',
                spec: false,
                eager: true
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBe(-1);
            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf("import { TestModule } from '../test/test.module';")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('list works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'list',
                eager: true
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBe(-1);
            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf("import { TestModule } from '../test/test.module';")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('list works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'list',
                spec: false,
                eager: true
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBe(-1);
            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf("import { TestModule } from '../test/test.module';")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('table works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'table',
                eager: true
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBe(-1);
            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf("import { TestModule } from '../test/test.module';")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('table works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'table',
                spec: false,
                eager: true
            }, appTree);
            // has lazy loaded content
            expect(tree.readContent('/projects/bar/src/app/app.routing.module.ts').indexOf("{'path': 'test', 'loadChildren': '../app/views/test/test.module#TestModule'},")).toBe(-1);
            expect(tree.readContent('/projects/bar/src/app/core/core.module.ts').indexOf("import { TestModule } from '../test/test.module';")).toBeGreaterThanOrEqual(0);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
    });
    describe('with existing vo', () => {
        const appOptions = {
            name: 'bar',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: 'scss',
            skipTests: false,
            skipPackageJson: false,
        };
        let appTree;
        beforeEach(() => {
            appTree = schematicRunner.runSchematic('workspace', workspaceOptions);
            appTree = schematicRunner.runSchematic('application', appOptions, appTree);
            appTree = customRunner.runSchematic('scaffold', {
                spec: true
            }, appTree);
            appTree = customRunner.runSchematic('vo', {
                name: 'custom vo',
                obj: '{"id":"number", "customName": "string"}',
            }, appTree);
        });
        it('requires required option', () => {
            // We test that
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('view', {}, appTree)).toThrow();
        });
        it('fails without app tree', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('view', {}, schematics_1.Tree.empty())).toThrow();
        });
        it('blank works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                vo: 'custom vo'
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('blank works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                spec: false,
                vo: 'custom vo'
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('details works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'details',
                vo: 'custom vo'
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('details works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'details',
                spec: false,
                vo: 'custom vo'
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('form works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'form',
                vo: 'custom vo'
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('form works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'form',
                spec: false,
                vo: 'custom vo'
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('list works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'list',
                vo: 'custom vo'
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('list works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'list',
                spec: false,
                vo: 'custom vo'
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('table works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'table',
                vo: 'custom vo'
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('table works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'table',
                spec: false,
                vo: 'custom vo'
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/custom-vo/custom-vo.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
    });
    describe('without project', () => {
        const appOptions = {
            name: 'bar',
            projectRoot: '',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: 'scss',
            skipTests: false,
            skipPackageJson: false,
        };
        let appTree;
        beforeEach(() => {
            appTree = schematicRunner.runSchematic('workspace', workspaceOptions);
            appTree = schematicRunner.runSchematic('application', appOptions, appTree);
            appTree = customRunner.runSchematic('scaffold', {
                spec: true
            }, appTree);
        });
        it('requires required option', () => {
            // We test that
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('view', {}, appTree)).toThrow();
        });
        it('fails without app tree', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('view', {}, schematics_1.Tree.empty())).toThrow();
        });
        it('blank works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test'
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('blank works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                spec: false
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('details works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'details'
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('details works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'details',
                spec: false
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('form works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'form'
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('form works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'form',
                spec: false
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('list works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'list'
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('list works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'list',
                spec: false
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('table works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'table'
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
        it('table works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('view', {
                name: 'test',
                template: 'table',
                spec: false
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.component.scss')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.html')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.component.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.guard.spec.ts')).toBe(-1);
            expect(tree.files.indexOf('/src/app/views/test/test.module.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/views/test/test.routing.module.ts')).toBeGreaterThanOrEqual(0);
        });
    });
});
//# sourceMappingURL=index_spec.js.map