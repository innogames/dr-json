import 'jest';
import 'reflect-metadata';
import {DataRepo} from "../../../repositories/DataRepo";
import {EditorState} from '../../../states/EditorState';
import {ActiveFile} from '../../../states/objects/editor/ActiveFile';
import {DataEntries} from '../../../states/objects/editor/DataEntries';
import {DataEntry} from '../../../states/objects/editor/DataEntry';
import {CreateEntry} from '../CreateEntry';

jest.mock('../../../repositories/DataRepo', () => {
    return {
        DataRepo: jest.fn().mockImplementation(() => {
            return {
                load: jest.fn(() => {
                    return Promise.resolve(new DataEntries([
                        new DataEntry('one', {key: 'value1'}),
                        new DataEntry('two', {key: 'value2'}),
                    ]));
                }),
                save: jest.fn((_file: string, entries: DataEntry[]) => {
                    return new DataEntries(entries);
                }),
            }
        })
    }
});

let useCase: CreateEntry;
let editorState: EditorState;
let dataRepo: DataRepo;

beforeEach(() => {
    // @ts-ignore
    dataRepo = new DataRepo();
    editorState = new EditorState();
    useCase = new CreateEntry(editorState, dataRepo);
});

describe('CreateEntry', () => {
    it('creates entry', () => {
        editorState.open(new ActiveFile('myFile', '/temp/myFile.json'));
        const newEntry: DataEntry = new DataEntry('three', {key: 'value3'});

        return useCase.execute('/temp/myFile.json', newEntry)
            .then(() => {
                expect(editorState.currentFile!.entries.all.length).toBe(3);
                expect(editorState.currentFile!.entries.getById('three')!.data.key).toBe('value3');
                expect(dataRepo.save).toBeCalledWith('/temp/myFile.json', [
                    new DataEntry('one', {key: 'value1'}),
                    new DataEntry('two', {key: 'value2'}),
                    new DataEntry('three', {key: 'value3'}),
                ]);
            });
    });
});
