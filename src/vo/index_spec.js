"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const testing_1 = require("@angular-devkit/schematics/testing");
const path = require("path");
// SchematicTestRunner needs an absolute path to the collection to test.
const collectionPath = path.join(__dirname, '../collection.json');
describe('vo', () => {
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
            style: 'css',
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
            expect(() => runner.runSchematic('vo', {}, appTree)).toThrow();
        });
        it('fails without app tree', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('vo', {}, schematics_1.Tree.empty())).toThrow();
        });
        it('works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('vo', {
                name: 'test'
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
        });
        it('works with rename', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('vo', {
                name: 'tests'
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
        });
        it('works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('vo', {
                name: 'test',
                spec: false
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);
        });
        it('do not allow overwrite', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('vo', {
                name: 'test',
                obj: '{"id":"number"}',
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            // check for title
            expect(tree.readContent('/projects/bar/src/app/vos/test/test.ts').indexOf('title')).toBe(-1);
            expect(tree.readContent('/projects/bar/src/app/vos/test/test.spec.ts').indexOf('title')).toBe(-1);
            const tree2 = runner.runSchematic('vo', {
                name: 'test',
            }, tree);
            // Listing files
            expect(tree2.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree2.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            // check for title
            expect(tree2.readContent('/projects/bar/src/app/vos/test/test.ts').indexOf('title')).toBe(-1);
            expect(tree2.readContent('/projects/bar/src/app/vos/test/test.spec.ts').indexOf('title')).toBe(-1);
        });
        xit('does allow overwrite', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('vo', {
                name: 'test',
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            const tree2 = runner.runSchematic('vo', {
                name: 'test',
                obj: '{"id":"number"}',
            }, tree);
            // Listing files
            expect(tree2.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree2.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            // check for title
            expect(tree2.readContent('/projects/bar/src/app/vos/test.ts').indexOf('title')).toBe(-1);
        });
    });
    describe('without project', () => {
        const appOptions = {
            name: 'bar',
            projectRoot: '',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: 'css',
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
            expect(() => runner.runSchematic('vo', {}, appTree)).toThrow();
        });
        it('fails without app tree', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('vo', {}, schematics_1.Tree.empty())).toThrow();
        });
        it('works', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('vo', {
                name: 'test',
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
        });
        it('works without tests', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('vo', {
                name: 'test',
                spec: false
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);
        });
        it('do not allow overwrite', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('vo', {
                name: 'test',
                obj: '{"id":"number"}',
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            // check for title
            expect(tree.readContent('/src/app/vos/test/test.ts').indexOf('title')).toBe(-1);
            expect(tree.readContent('/src/app/vos/test/test.spec.ts').indexOf('title')).toBe(-1);
            const tree2 = runner.runSchematic('vo', {
                name: 'test',
            }, tree);
            // Listing files
            expect(tree2.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree2.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            // check for title
            expect(tree2.readContent('/src/app/vos/test/test.ts').indexOf('title')).toBe(-1);
            expect(tree2.readContent('/src/app/vos/test/test.spec.ts').indexOf('title')).toBe(-1);
        });
        xit('does allow overwrite', () => {
            const runner = new testing_1.SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('vo', {
                name: 'test',
            }, appTree);
            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            const tree2 = runner.runSchematic('vo', {
                name: 'test',
                obj: '{"id":"number"}',
            }, tree);
            // Listing files
            expect(tree2.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree2.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);
            // check for title
            expect(tree2.readContent('/src/app/vos/test/test.ts').indexOf('title')).toBe(-1);
        });
    });
});
//# sourceMappingURL=index_spec.js.map