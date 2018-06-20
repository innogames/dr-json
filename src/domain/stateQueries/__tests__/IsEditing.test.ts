import 'jest';
import 'reflect-metadata';
import {EditorState} from '../../states/EditorState';
import {ActiveFile} from '../../states/objects/editor/ActiveFile';
import {DataEntries} from '../../states/objects/editor/DataEntries';
import {DataEntry} from '../../states/objects/editor/DataEntry';
import {IsEditing} from '../IsEditing';

let query: IsEditing;
let editorState: EditorState;
let activeFile: ActiveFile;

beforeEach(() => {
    editorState = new EditorState();

    activeFile = new ActiveFile('myFile', '/temp/myFile.json');
    editorState.open(activeFile);

    query = new IsEditing(editorState);
});

describe('IsEditing', () => {
    it('returns false when not editing', () => {
        expect(query.fetch()).toEqual(false);
    });

    it('returns true when in create mode', () => {
        activeFile.openCreateMode();

        expect(query.fetch()).toEqual(true);
    });

    it('returns true when in edit mode', () => {
        let entry1: DataEntry = new DataEntry(1, {id: 1});
        let entry2: DataEntry = new DataEntry(2, {id: 2});

        entry1.toggleEditMode(true);

        activeFile.setLoaded({schema: {}, uiSchema: {}}, new DataEntries([entry1, entry2]));

        expect(query.fetch()).toEqual(true);
    });

    it('returns true when in create variant mode', () => {
        editorState.setAddVariantMode(true);

        expect(query.fetch()).toEqual(true);
    });
});
