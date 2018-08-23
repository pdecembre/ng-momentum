import {Tree} from '@angular-devkit/schematics';
import {SchematicTestRunner, UnitTestTree} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import {Schema as ApplicationOptions} from '@schematics/angular/application/schema';
import {Schema as WorkspaceOptions} from '@schematics/angular/workspace/schema';

// SchematicTestRunner needs an absolute path to the collection to test.
const collectionPath = path.join(__dirname, '../collection.json');

describe('model', () => {

    const schematicRunner = new SchematicTestRunner(
        '@schematics/angular',
        path.join(__dirname, '..', '..', 'node_modules', '@schematics', 'angular', 'collection.json')
    );

    const customRunner = new SchematicTestRunner(
        'momentum',
        path.join(__dirname, '..', 'collection.json')
    );

    const workspaceOptions: WorkspaceOptions = {
        name: 'workspace',
        newProjectRoot: 'projects',
        version: '6.0.0',
    };

    describe('with project', () => {

        const appOptions: ApplicationOptions = {
            name: 'bar',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: 'css',
            skipTests: false,
            skipPackageJson: false,
        };

        let appTree: UnitTestTree;
        beforeEach(() => {
            appTree = schematicRunner.runSchematic('workspace', workspaceOptions);
            appTree = schematicRunner.runSchematic('application', appOptions, appTree);
            appTree = customRunner.runSchematic('scaffold', {
                spec: true
            }, appTree);
        });

        it('requires required option', () => {
            // We test that
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('model', {}, appTree)).toThrow();
        });

        it('fails without app tree', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('model', {}, Tree.empty())).toThrow();
        });

        it('blank works', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('model', {
                name: 'test'
            }, appTree);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.spec.ts')).toBeGreaterThanOrEqual(0);
        });

        it('blank works without tests', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('model', {
                name: 'test',
                spec: false
            }, appTree);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.spec.ts')).toBe(-1);
        });

        it('list works', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('model', {
                name: 'test',
                template: 'list'
            }, appTree);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/models/tests/tests.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/models/tests/tests.model.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.spec.ts')).toBeGreaterThanOrEqual(0);
        });

        it('list works without tests', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('model', {
                name: 'test',
                template: 'list',
                spec: false
            }, appTree);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/models/tests/tests.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/models/tests/tests.model.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.spec.ts')).toBe(-1);
        });

        it('selected works', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('model', {
                name: 'test',
                template: 'selected'
            }, appTree);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.spec.ts')).toBeGreaterThanOrEqual(0);
        });

        it('selected works without tests', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('model', {
                name: 'test',
                template: 'selected',
                spec: false
            }, appTree);

            // Listing files
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/models/test/test.model.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/projects/bar/src/app/services/tests/tests.service.spec.ts')).toBe(-1);
        });

    });

    describe('without project', () => {

        const appOptions: ApplicationOptions = {
            name: 'bar',
            projectRoot: '',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            style: 'css',
            skipTests: false,
            skipPackageJson: false,
        };

        let appTree: UnitTestTree;
        beforeEach(() => {
            appTree = schematicRunner.runSchematic('workspace', workspaceOptions);
            appTree = schematicRunner.runSchematic('application', appOptions, appTree);
            appTree = customRunner.runSchematic('scaffold', {
                spec: true
            }, appTree);
        });

        it('requires required option', () => {
            // We test that
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('model', {}, appTree)).toThrow();
        });

        it('fails without app tree', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            expect(() => runner.runSchematic('model', {}, Tree.empty())).toThrow();
        });

        it('blank works', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('model', {
                name: 'test'
            }, appTree);

            // Listing files
            expect(tree.files.indexOf('/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/test/test.model.spec.ts')).toBeGreaterThanOrEqual(0);
        });

        it('blank works without tests', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('model', {
                name: 'test',
                spec: false
            }, appTree);

            // Listing files
            expect(tree.files.indexOf('/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/test/test.model.spec.ts')).toBe(-1);
        });

        it('list works', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('model', {
                name: 'test',
                template: 'list'
            }, appTree);

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/src/app/models/tests/tests.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/tests/tests.model.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.spec.ts')).toBeGreaterThanOrEqual(0);
        });

        it('list works without tests', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('model', {
                name: 'test',
                template: 'list',
                spec: false
            }, appTree);

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/src/app/models/tests/tests.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/tests/tests.model.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.spec.ts')).toBe(-1);
        });

        it('selected works', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('model', {
                name: 'test',
                template: 'selected'
            }, appTree);

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/test/test.model.spec.ts')).toBeGreaterThanOrEqual(0);

            expect(tree.files.indexOf('/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.spec.ts')).toBeGreaterThanOrEqual(0);
        });

        it('selected works without tests', () => {
            const runner = new SchematicTestRunner('momentum', collectionPath);
            const tree = runner.runSchematic('model', {
                name: 'test',
                template: 'selected',
                spec: false
            }, appTree);

            // Listing files
            expect(tree.files.indexOf('/src/app/vos/test/test.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/vos/test/test.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/src/app/models/test/test.model.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/models/test/test.model.spec.ts')).toBe(-1);

            expect(tree.files.indexOf('/src/app/services/tests/tests.service.ts')).toBeGreaterThanOrEqual(0);
            expect(tree.files.indexOf('/src/app/services/tests/tests.service.spec.ts')).toBe(-1);
        });

    });
});
