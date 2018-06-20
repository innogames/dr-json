import 'jest';
import 'reflect-metadata';
import {EditorState} from '../../../states/EditorState';
import {ActiveFile} from '../../../states/objects/editor/ActiveFile';
import {DataEntries} from '../../../states/objects/editor/DataEntries';
import {DataEntry} from '../../../states/objects/editor/DataEntry';
import {CloseEditEntry} from '../CloseEditEntry';

let useCase: CloseEditEntry;
let editorState: EditorState;

beforeEach(() => {
    editorState = new EditorState();

    useCase = new CloseEditEntry(editorState);
});

describe('CloseEditEntry', () => {
    it('closes edit modes', () => {
        let entry1: DataEntry = new DataEntry(1, {id: 1});
        let entry2: DataEntry = new DataEntry(2, {id: 2});

        entry1.toggleEditMode(true);
        entry2.toggleEditMode(true);

        editorState.open(new ActiveFile('myFile', '/temp/myFile.json'));
        editorState.currentFile!.setLoaded({schema: {}, uiSchema: {}}, new DataEntries([entry1, entry2]));

        return useCase.execute()
            .then(() => {
                expect(editorState.currentFile!.entries.getById(1)!.editMode).toBe(false);
                expect(editorState.currentFile!.entries.getById(2)!.editMode).toBe(false);
            });
    });
});
