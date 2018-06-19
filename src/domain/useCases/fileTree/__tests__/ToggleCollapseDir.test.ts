import 'jest';
import 'reflect-metadata';
import {SchemaDir} from '../../../states/objects/fileTree/SchemaDir';
import {SchemaFile} from '../../../states/objects/fileTree/SchemaFile';
import {SchemaTree} from '../../../states/objects/fileTree/SchemaTree';
import {Project} from '../../../states/objects/Project';
import {ProjectConfig} from '../../../states/objects/ProjectConfig';
import {ProjectState} from '../../../states/ProjectState';
import {ToggleCollapseDir} from '../ToggleCollapseDir';

let useCase: ToggleCollapseDir;
let projectState: ProjectState;

beforeEach(() => {
    projectState = new ProjectState();

    useCase = new ToggleCollapseDir(projectState);
});

beforeEach(() => {
    let dirA: SchemaDir = new SchemaDir('Open Folder', 'openFolder', [
        new SchemaFile('File A', 'fileA', 'fileA.schema.json', 'fileA.json', []),
    ]);
    let dirB: SchemaDir = new SchemaDir('Collapsed Folder', 'collapsedFolder', [
        new SchemaFile('File B', 'fileB', 'fileB.schema.json', 'fileB.json', []),
    ]);
    dirB.setCollapsed(true);

    const tree = new SchemaTree([dirA, dirB]);
    projectState.setLoaded(new Project('/root/projectFile', new ProjectConfig({name: ''}), tree));
});

describe('ToggleCollapseDir', () => {
    it('collapses dir', () => {
        return useCase.execute('openFolder')
            .then(() => {
                expect((projectState.project.schemaTree.children[0] as SchemaDir).collapsed).toBe(true);
                expect((projectState.project.schemaTree.children[1] as SchemaDir).collapsed).toBe(true);
            });
    });

    it('expands dir', () => {
        return useCase.execute('collapsedFolder')
            .then(() => {
                expect((projectState.project.schemaTree.children[0] as SchemaDir).collapsed).toBe(false);
                expect((projectState.project.schemaTree.children[1] as SchemaDir).collapsed).toBe(false);
            });
    });
});
