import 'jest';
import {EditorState} from '../../states/EditorState';
import {ActiveFile} from '../../states/objects/editor/ActiveFile';
import {DataEntry} from '../../states/objects/editor/DataEntry';
import {OpenCreateEntry} from '../OpenCreateEntry';

let useCase: OpenCreateEntry;
let editorState: EditorState;

beforeEach(() => {
    editorState = new EditorState();

    useCase = new OpenCreateEntry(editorState);
});

describe('OpenCreateEntry', () => {
    it('activated create mode', () => {
        editorState.open(new ActiveFile('myFile', '/temp/myFile.json'));

        return useCase.execute()
            .then(() => {
                expect(editorState.currentFile!.isCreateMode).toBe(true);
                expect(editorState.currentFile!.createModeEntry).toBeNull();
            });
    });

    it('activated create mode from another entry', () => {
        editorState.open(new ActiveFile('myFile', '/temp/myFile.json'));

        const byEntry: DataEntry       = new DataEntry('someId', {key: 'someValue'});
        const templateEntry: DataEntry = new DataEntry(null, byEntry.data);

        return useCase.execute(byEntry)
            .then(() => {
                expect(editorState.currentFile!.isCreateMode).toBe(true);
                expect(editorState.currentFile!.createModeEntry).toEqual(templateEntry);
            });
    });
});
