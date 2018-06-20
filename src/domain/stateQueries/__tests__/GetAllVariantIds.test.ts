import 'jest';
import 'reflect-metadata';
import {SchemaDir} from '../../states/objects/fileTree/SchemaDir';
import {SchemaFile} from '../../states/objects/fileTree/SchemaFile';
import {SchemaFileVariant} from '../../states/objects/fileTree/SchemaFileVariant';
import {SchemaTree} from '../../states/objects/fileTree/SchemaTree';
import {Project} from '../../states/objects/Project';
import {ProjectConfig} from '../../states/objects/ProjectConfig';
import {ProjectState} from '../../states/ProjectState';
import {GetAllVariantIds} from '../GetAllVariantIds';

let query: GetAllVariantIds;
let projectState: ProjectState;

beforeEach(() => {
    projectState = new ProjectState();

    query = new GetAllVariantIds(projectState);
});

describe('GetAllVariantIds', () => {
    it('returns all variantIds', () => {
        const tree = new SchemaTree([
            new SchemaDir('Folder 1', 'folder1', [
                new SchemaFile('File A', 'fileA', 'fileA.schema.json', 'fileA.json', [
                    new SchemaFileVariant('Variant A', 'variantOne', 'var1.json'),
                ]),
            ]),
            new SchemaDir('Folder 2', 'folder2', [
                new SchemaFile('File B', 'fileB', 'fileB.schema.json', 'fileB.json', [
                    new SchemaFileVariant('Variant A', 'variantOne', 'var1.json'),
                    new SchemaFileVariant('Variant B', 'variantTwo', 'var2.json'),
                ]),
            ]),
        ]);
        projectState.setLoaded(new Project('/root/projectFile', new ProjectConfig({name: ''}), tree));

        const variantIds = query.fetch();

        expect(variantIds).toEqual(['variantOne', 'variantTwo']);
    });
});
