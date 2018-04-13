import 'jest';
import {EditorState} from '../../states/EditorState';
import {ActiveFile} from '../../states/objects/editor/ActiveFile';
import {SchemaFile} from '../../states/objects/fileTree/SchemaFile';
import {SchemaTree} from '../../states/objects/fileTree/SchemaTree';
import {Project} from '../../states/objects/Project';
import {ProjectConfig} from '../../states/objects/ProjectConfig';
import {ProjectState} from '../../states/ProjectState';
import {OpenProject} from '../OpenProject';
import {Reload} from '../Reload';
import {SelectFile} from '../SelectFile';

let useCase: Reload;
let editorState: EditorState;
let projectState: ProjectState;
let openProject: OpenProject;
let selectFile: SelectFile;

beforeEach(() => {
    openProject = new (jest.fn<OpenProject>(() => ({
        execute: jest.fn().mockImplementation(() => {
            return Promise.resolve();
        }),
    })));

    selectFile = new (jest.fn<SelectFile>(() => ({
        execute: jest.fn().mockImplementation(() => {
            return Promise.resolve();
        }),
    })));

    editorState  = new EditorState();
    projectState = new ProjectState();

    useCase = new Reload(
        editorState,
        projectState,
        openProject,
        selectFile,
    );
});

describe('Reload', () => {
    it('reloads project', () => {
        const projectFile: string  = 'root/myProjectFile.json';
        const selectedFile: string = 'activeFile';

        const file = new SchemaFile('', selectedFile, '', '', []);
        const tree = new SchemaTree([file]);

        projectState.setLoaded(new Project(projectFile, new ProjectConfig({name: ''}), tree));
        editorState.open(new ActiveFile(file));

        return useCase.execute()
            .then(() => {
                expect(openProject.execute).toBeCalledWith(projectFile);
                expect(selectFile.execute).toBeCalledWith(file);
            });
    });
});
