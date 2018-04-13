import 'jest';
import {DataRepo} from '../../repositories/DataRepo';
import {EditorState} from '../../states/EditorState';
import {ActiveFile} from '../../states/objects/editor/ActiveFile';
import {DataEntries} from '../../states/objects/editor/DataEntries';
import {DataEntry} from '../../states/objects/editor/DataEntry';
import {CreateEntry} from '../CreateEntry';

let useCase: CreateEntry;
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

    useCase = new CreateEntry(editorState, dataRepo);
});

describe('CreateEntry', () => {
    it('creates entry', () => {
        editorState.open(new ActiveFile('file.json'));

        const newEntry: DataEntry = new DataEntry('three', {key: 'value3'});

        return useCase.execute('file', newEntry)
            .then(() => {
                expect(editorState.currentFile!.entries.all.length).toBe(3);
                expect(editorState.currentFile!.entries.getById('three')!.data.key).toBe('value3');

                expect(dataRepo.save).toBeCalled();
            });
    });
});
