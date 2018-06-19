import 'jest';
import 'reflect-metadata';
import {SchemaDir} from '../../../states/objects/fileTree/SchemaDir';
import {SchemaFile} from '../../../states/objects/fileTree/SchemaFile';
import {SchemaTree} from '../../../states/objects/fileTree/SchemaTree';
import {Project} from '../../../states/objects/Project';
import {ProjectConfig} from '../../../states/objects/ProjectConfig';
import {ProjectState} from '../../../states/ProjectState';
import {ExpandAllDirs} from '../ExpandAllDirs';

let useCase: ExpandAllDirs;
let projectState: ProjectState;

beforeEach(() => {
    projectState = new ProjectState();

    useCase = new ExpandAllDirs(projectState);
});

describe('ExpandAllDirs', () => {
    it('expands all directories', () => {
        let dirA: SchemaDir = new SchemaDir('Folder 1', 'folder1', [
            new SchemaFile('File A', 'fileA', 'fileA.schema.json', 'fileA.json', []),
        ]);
        let dirB: SchemaDir = new SchemaDir('Folder 2', 'folder2', [
            new SchemaFile('File B', 'fileB', 'fileB.schema.json', 'fileB.json', []),
        ]);
        let dirC: SchemaDir = new SchemaDir('Folder 3', 'folder3', [
            new SchemaFile('File C', 'fileC', 'fileC.schema.json', 'fileC.json', []),
        ]);

        dirA.setCollapsed(true);
        dirC.setCollapsed(true);

        const tree = new SchemaTree([dirA, dirB, dirC]);
        projectState.setLoaded(new Project('/root/projectFile', new ProjectConfig({name: ''}), tree));

        return useCase.execute()
            .then(() => {
                expect((projectState.project.schemaTree.children[0] as SchemaDir).collapsed).toBe(false);
                expect((projectState.project.schemaTree.children[1] as SchemaDir).collapsed).toBe(false);
                expect((projectState.project.schemaTree.children[2] as SchemaDir).collapsed).toBe(false);
            });
    });
});
