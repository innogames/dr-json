import 'jest';
import {EditorState} from '../../states/EditorState';
import {ActiveFile} from '../../states/objects/editor/ActiveFile';
import {DataEntry} from '../../states/objects/editor/DataEntry';
import {CloseCreateEntry} from '../CloseCreateEntry';

let useCase: CloseCreateEntry;
let editorState: EditorState;

beforeEach(() => {
    editorState = new EditorState();

    useCase = new CloseCreateEntry(editorState);
});

describe('CloseCreateEntry', () => {
    it('closes create mode', () => {
        const byEntry: DataEntry = new DataEntry('someId', {key: 'someValue'});

        editorState.open(new ActiveFile('myFile', '/temp/myFile.json'));
        editorState.currentFile!.openCreateMode(byEntry);

        return useCase.execute()
            .then(() => {
                expect(editorState.currentFile!.isCreateMode).toBe(false);
                expect(editorState.currentFile!.createModeEntry).toBeNull();
            });
    });
});
