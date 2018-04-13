import 'jest';
import {DataRepo} from '../../repositories/DataRepo';
import {EditorState} from '../../states/EditorState';
import {DataEntries} from '../../states/objects/editor/DataEntries';
import {DataEntry} from '../../states/objects/editor/DataEntry';
import {SchemaFile} from '../../states/objects/fileTree/SchemaFile';
import {SelectFile} from '../SelectFile';

let useCase: SelectFile;
let editorState: EditorState;
let dataRepo: DataRepo;

beforeEach(() => {
    editorState = new EditorState();
    dataRepo    = new (jest.fn<DataRepo>(() => ({
        load: jest.fn().mockImplementation(() => {
            return Promise.resolve(new DataEntries([
                new DataEntry('one', {key: 'value1'}),
                new DataEntry('two', {key: 'value2'}),
            ]));
        }),
    })));

    useCase = new SelectFile(editorState, dataRepo);
});

describe('SelectFile', () => {
    it('selects file', () => {
        const file = new SchemaFile('My File', 'file.json', 'schema.json', 'data.json', []);

        return useCase.execute(file)
            .then(() => {
                expect(editorState.currentFile.file).toBe(file);
                expect(editorState.currentFile.isLoading).toBe(false);
                expect(editorState.currentFile.error).toBeNull();
                expect(editorState.currentFile.entries.getById('one').data.key).toBe('value1');
                expect(editorState.currentFile.entries.getById('two').data.key).toBe('value2');
            });
    });
});
