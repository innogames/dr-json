import 'jest';
import {EditorState} from '../../states/EditorState';
import {ActiveFile} from '../../states/objects/editor/ActiveFile';
import {SearchInFile} from '../SearchInFile';

let useCase: SearchInFile;
let editorState: EditorState;

beforeEach(() => {
    editorState = new EditorState();

    useCase = new SearchInFile(editorState);
});

describe('SearchInFile', () => {
    it('searches in current file', () => {
        const search: string = 'foo';

        editorState.open(new ActiveFile('file.json'));

        return useCase.execute(search)
            .then(() => {
                expect(editorState.currentFile!.searchText).toBe(search);
            });
    });
});
