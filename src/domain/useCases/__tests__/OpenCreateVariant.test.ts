import 'jest';
import {EditorState} from '../../states/EditorState';
import {OpenCreateVariant} from '../OpenCreateVariant';

let useCase: OpenCreateVariant;
let editorState: EditorState;

beforeEach(() => {
    editorState = new EditorState();

    useCase = new OpenCreateVariant(editorState);
});

describe('OpenCreateVariant', () => {
    it('closes create mode', () => {
        return useCase.execute()
            .then(() => {
                expect(editorState.isAddVariantMode).toBe(true);
            });
    });
});
