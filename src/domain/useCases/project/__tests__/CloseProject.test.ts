import 'jest';
import 'reflect-metadata';
import {SettingsRepo} from '../../../repositories/SettingsRepo';
import {EditorState} from '../../../states/EditorState';
import {ActiveFile} from '../../../states/objects/editor/ActiveFile';
import {SchemaTree} from '../../../states/objects/fileTree/SchemaTree';
import {Project} from '../../../states/objects/Project';
import {ProjectConfig} from '../../../states/objects/ProjectConfig';
import {ProjectState} from '../../../states/ProjectState';
import {CloseProject} from '../CloseProject';

let useCase: CloseProject;
let projectState: ProjectState;
let editorState: EditorState;
let settingsRepo: SettingsRepo;

beforeEach(() => {
    projectState = new ProjectState();
    editorState  = new EditorState();
    settingsRepo = new (jest.fn<SettingsRepo>(() => ({
        saveLastProjectFile: jest.fn().mockImplementation(() => {
            return Promise.resolve();
        }),
    })));

    useCase = new CloseProject(projectState, editorState, settingsRepo);
});

describe('CloseProject', () => {
    it('closes project', () => {
        projectState.setLoaded(new Project('someFile', new ProjectConfig({name: ''}), new SchemaTree([])));
        editorState.open(new ActiveFile('myFile', '/temp/myFile.json'));

        expect(projectState.hasProject).toBe(true);
        expect(editorState.currentFile).not.toBeNull();

        return useCase.execute()
            .then(() => {
                expect(projectState.error).toBeNull();
                expect(projectState.isLoading).toBe(false);
                expect(projectState.hasProject).toBe(false);

                expect(editorState.currentFile).toBeNull();

                expect(settingsRepo.saveLastProjectFile).toBeCalledWith(null);
            });
    });
});
