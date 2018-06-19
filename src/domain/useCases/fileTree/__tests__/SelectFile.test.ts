import 'jest';
import 'reflect-metadata';
import {EntryValidator} from '../../../context/data/EntryValidator';
import {DataRepo} from '../../../repositories/DataRepo';
import {SchemaRepo} from '../../../repositories/SchemaRepo';
import {EditorState} from '../../../states/EditorState';
import {DataEntries} from '../../../states/objects/editor/DataEntries';
import {DataEntry} from '../../../states/objects/editor/DataEntry';
import {SchemaFile} from '../../../states/objects/fileTree/SchemaFile';
import {SchemaTree} from '../../../states/objects/fileTree/SchemaTree';
import {Project} from '../../../states/objects/Project';
import {ProjectConfig} from '../../../states/objects/ProjectConfig';
import {ProjectState} from '../../../states/ProjectState';
import {SelectFile} from '../SelectFile';

let useCase: SelectFile;
let editorState: EditorState;
let projectState: ProjectState;
let dataRepo: DataRepo;
let schemaRepo: SchemaRepo;
let entryValidator: EntryValidator;

beforeEach(() => {
    editorState  = new EditorState();
    projectState = new ProjectState();

    dataRepo = new (jest.fn<DataRepo>(() => ({
        load: jest.fn().mockImplementation(() => {
            return Promise.resolve(new DataEntries([
                new DataEntry('one', {key: 'value1'}),
                new DataEntry('two', {key: 'value2'}),
            ]));
        }),
    })));

    schemaRepo = new (jest.fn<SchemaRepo>(() => ({
        load: jest.fn().mockImplementation(() => {
            return Promise.resolve({
                schema: {},
            });
        }),
    })));

    entryValidator = new (jest.fn<EntryValidator>(() => ({
        validate: jest.fn().mockImplementation((entries: DataEntry[]) => {
            return Promise.resolve(entries);
        }),
    })));

    useCase = new SelectFile(editorState, projectState, dataRepo, schemaRepo, entryValidator);
});

describe('SelectFile', () => {
    it('selects file', () => {
        const file = new SchemaFile('My File', 'myFile', 'schema.json', 'data.json', []);
        const tree = new SchemaTree([file]);
        projectState.setLoaded(new Project('/root/projectFile', new ProjectConfig({name: ''}), tree));

        return useCase.execute('myFile')
            .then(() => {
                expect(editorState.currentFile!.basename).toBe('myFile');
                expect(editorState.currentFile!.variantId).toBeNull();
                expect(editorState.currentFile!.isLoading).toBe(false);
                expect(editorState.currentFile!.error).toBeNull();
                expect(editorState.currentFile!.entries.getById('one')!.data.key).toBe('value1');
                expect(editorState.currentFile!.entries.getById('two')!.data.key).toBe('value2');

                expect(dataRepo.load).toBeCalledWith('data.json');
            });
    });
});
