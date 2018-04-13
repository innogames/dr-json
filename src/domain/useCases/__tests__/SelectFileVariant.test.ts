import 'jest';
import {DataRepo} from '../../repositories/DataRepo';
import {EditorState} from '../../states/EditorState';
import {DataEntries} from '../../states/objects/editor/DataEntries';
import {DataEntry} from '../../states/objects/editor/DataEntry';
import {SchemaFile} from '../../states/objects/fileTree/SchemaFile';
import {SchemaFileVariant} from '../../states/objects/fileTree/SchemaFileVariant';
import {SelectFile} from '../SelectFile';
import {SelectFileVariant} from '../SelectFileVariant';

let useCase: SelectFileVariant;
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

    useCase = new SelectFileVariant(editorState, dataRepo);
});

describe('SelectFile', () => {
    it('selects file', () => {
        const variantId = 'varId';

        const file = new SchemaFile('My File', 'file.json', 'schema.json', 'data.json', [
            new SchemaFileVariant('A Variant', variantId, 'var.json'),
        ]);

        return useCase.execute(file, variantId)
            .then(() => {
                expect(editorState.currentFile!.filename).toBe('file.json');
                expect(editorState.currentFile!.variantId).toBe(variantId);
                expect(editorState.currentFile!.isLoading).toBe(false);
                expect(editorState.currentFile!.error).toBeNull();
                expect(editorState.currentFile!.entries.getById('one')!.data.key).toBe('value1');
                expect(editorState.currentFile!.entries.getById('two')!.data.key).toBe('value2');

                expect(dataRepo.load).toBeCalledWith('var.json');
            });
    });
});
