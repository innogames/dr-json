import 'jest';
import 'reflect-metadata';
import {DataRepo} from '../../../repositories/DataRepo';
import {DataEntries} from '../../../states/objects/editor/DataEntries';
import {DataEntry} from '../../../states/objects/editor/DataEntry';
import {SchemaFile} from '../../../states/objects/fileTree/SchemaFile';
import {SchemaTree} from '../../../states/objects/fileTree/SchemaTree';
import {Project} from '../../../states/objects/Project';
import {ProjectConfig} from '../../../states/objects/ProjectConfig';
import {ProjectState} from '../../../states/ProjectState';
import {CreateVariant} from '../CreateVariant';
import {SelectFileVariant} from '../../fileTree/SelectFileVariant';

let useCase: CreateVariant;
let projectState: ProjectState;
let dataRepo: DataRepo;
let selectFileVariant: SelectFileVariant;

beforeEach(() => {
    projectState = new ProjectState();

    dataRepo = new (jest.fn<DataRepo>(() => ({
        load: jest.fn().mockImplementation(() => {
            return Promise.resolve(new DataEntries([
                new DataEntry('one', {key: 'value1'}),
            ]));
        }),
        save: jest.fn().mockImplementation(() => {
            return Promise.resolve();
        }),
    })));

    selectFileVariant = new (jest.fn<SelectFileVariant>(() => ({
        execute: jest.fn(),
    })));

    useCase = new CreateVariant(projectState, dataRepo, selectFileVariant);
});

describe('CreateVariant', () => {
    it('creates variant file', () => {
        const variantId = 'varId';

        const file = new SchemaFile('Stuff', 'stuff', 'stuff.schema.json', 'stuff.json', []);
        const tree = new SchemaTree([file]);

        projectState.setLoaded(new Project('/root/projectFile', new ProjectConfig({name: ''}), tree));

        return useCase.execute('stuff', variantId, false)
            .then(() => {
                expect(projectState.project.schemaTree.getFile('stuff')!.variants.length).toBe(1);

                expect(dataRepo.save).toBeCalledWith('/root/variantData/varId/stuff.json', []);

                expect(selectFileVariant.execute).toBeCalledWith('stuff', variantId);
            });
    });

    it('creates variant file and copies data', () => {
        const variantId = 'varId';

        const file = new SchemaFile('Stuff', 'stuff', 'stuff.schema.json', 'stuff.json', []);
        const tree = new SchemaTree([file]);

        projectState.setLoaded(new Project('/root/projectFile', new ProjectConfig({name: ''}), tree));

        return useCase.execute('stuff', variantId, true)
            .then(() => {
                expect(projectState.project.schemaTree.getFile('stuff')!.variants.length).toBe(1);

                expect(dataRepo.save).toBeCalledWith(
                    '/root/variantData/varId/stuff.json',
                    [new DataEntry('one', {key: 'value1'})],
                );

                expect(selectFileVariant.execute).toBeCalledWith('stuff', variantId);
            });
    });
});
