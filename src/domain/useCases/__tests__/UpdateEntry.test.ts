import 'jest';
import 'reflect-metadata';
import {DataRepo} from '../../repositories/DataRepo';
import {EditorState} from '../../states/EditorState';
import {ActiveFile} from '../../states/objects/editor/ActiveFile';
import {DataEntries} from '../../states/objects/editor/DataEntries';
import {DataEntry} from '../../states/objects/editor/DataEntry';
import {UpdateEntry} from '../UpdateEntry';

let useCase: UpdateEntry;
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
        save: jest.fn().mockImplementation((_file: string, entries: DataEntry[]) => {
            return new DataEntries(entries);
        }),
    })));

    useCase = new UpdateEntry(editorState, dataRepo);
});

describe('UpdateEntry', () => {
    it('updates entry', () => {
        editorState.open(new ActiveFile('myFile', '/temp/myFile.json'));

        const newEntry: DataEntry = new DataEntry('three', {key: 'value3'});

        return useCase.execute('/temp/myFile.json', 'one', newEntry)
            .then(() => {
                expect(editorState.currentFile!.entries.all.length).toBe(2);
                expect(editorState.currentFile!.entries.getById('two')!.data.key).toBe('value2');
                expect(editorState.currentFile!.entries.getById('three')!.data.key).toBe('value3');

                expect(dataRepo.save).toBeCalledWith('/temp/myFile.json', [
                    new DataEntry('three', {key: 'value3'}),
                    new DataEntry('two', {key: 'value2'}),
                ]);
            });
    });
});
