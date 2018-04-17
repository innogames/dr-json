import 'jest';
import {EditorState} from '../../states/EditorState';
import {CloseCreateVariant} from '../CloseCreateVariant';

let useCase: CloseCreateVariant;
let editorState: EditorState;

beforeEach(() => {
    editorState = new EditorState();

    useCase = new CloseCreateVariant(editorState);
});

describe('CloseCreateVariant', () => {
    it('closes create mode', () => {
        editorState.setAddVariantMode(true);

        return useCase.execute()
            .then(() => {
                expect(editorState.isAddVariantMode).toBe(false);
            });
    });
});
