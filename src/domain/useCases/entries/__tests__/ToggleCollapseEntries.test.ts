import 'jest';
import 'reflect-metadata';
import {EditorState} from '../../../states/EditorState';
import {ActiveFile} from '../../../states/objects/editor/ActiveFile';
import {DataEntries} from '../../../states/objects/editor/DataEntries';
import {DataEntry} from '../../../states/objects/editor/DataEntry';
import {ToggleCollapseEntries} from '../ToggleCollapseEntries';

let useCase: ToggleCollapseEntries;
let editorState: EditorState;

beforeEach(() => {
    editorState = new EditorState();

    let entry1: DataEntry = new DataEntry(1, {id: 1});
    let entry2: DataEntry = new DataEntry(2, {id: 2});
    let entry3: DataEntry = new DataEntry(3, {id: 3});
    let entry4: DataEntry = new DataEntry(4, {id: 4});

    entry1.setCollapsed(true);
    entry3.setCollapsed(true);

    let activeFile = new ActiveFile('myFile', '/temp/myFile.json');
    activeFile.setLoaded({schema: {}, uiSchema: {}}, new DataEntries([entry1, entry2, entry3, entry4]));
    editorState.open(activeFile);

    useCase = new ToggleCollapseEntries(editorState);
});

describe('ToggleCollapseEntries', () => {
    it('collapses all entries', () => {
        return useCase.execute(true)
            .then(() => {
                expect(editorState.currentFile!.entries.getById(1)!.collapsed).toBe(true);
                expect(editorState.currentFile!.entries.getById(2)!.collapsed).toBe(true);
                expect(editorState.currentFile!.entries.getById(3)!.collapsed).toBe(true);
                expect(editorState.currentFile!.entries.getById(4)!.collapsed).toBe(true);
            });
    });

    it('expands all entries', () => {
        return useCase.execute(false)
            .then(() => {
                expect(editorState.currentFile!.entries.getById(1)!.collapsed).toBe(false);
                expect(editorState.currentFile!.entries.getById(2)!.collapsed).toBe(false);
                expect(editorState.currentFile!.entries.getById(3)!.collapsed).toBe(false);
                expect(editorState.currentFile!.entries.getById(4)!.collapsed).toBe(false);
            });
    });
});
