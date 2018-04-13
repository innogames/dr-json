import 'jest';
import {EditorState} from '../../states/EditorState';
import {ActiveFile} from '../../states/objects/editor/ActiveFile';
import {SchemaFile} from '../../states/objects/fileTree/SchemaFile';
import {SchemaFileVariant} from '../../states/objects/fileTree/SchemaFileVariant';
import {SchemaTree} from '../../states/objects/fileTree/SchemaTree';
import {Project} from '../../states/objects/Project';
import {ProjectConfig} from '../../states/objects/ProjectConfig';
import {ProjectState} from '../../states/ProjectState';
import {OpenProject} from '../OpenProject';
import {Reload} from '../Reload';
import {SelectFile} from '../SelectFile';
import {SelectFileVariant} from '../SelectFileVariant';

let useCase: Reload;
let editorState: EditorState;
let projectState: ProjectState;
let openProject: OpenProject;
let selectFile: SelectFile;
let selectFileVariant: SelectFileVariant;

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

    selectFileVariant = new (jest.fn<SelectFileVariant>(() => ({
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
        selectFileVariant,
    );
});

describe('Reload', () => {
    it('reloads project', () => {
        const projectFile: string  = 'root/myProjectFile.json';
        const selectedFile: string = 'activeFile';

        const file = new SchemaFile('', selectedFile, '', '', []);
        const tree = new SchemaTree([file]);

        projectState.setLoaded(new Project(projectFile, new ProjectConfig({name: ''}), tree));
        editorState.open(new ActiveFile(file.basename));

        return useCase.execute()
            .then(() => {
                expect(openProject.execute).toBeCalledWith(projectFile);
                expect(selectFile.execute).toBeCalledWith(file);
                expect(selectFileVariant.execute).not.toBeCalled();
            });
    });

    it('reloads project with variant', () => {
        const projectFile: string       = 'root/myProjectFile.json';
        const selectedFile: string      = 'activeFile';
        const selectedVariantId: string = 'varId';

        const file = new SchemaFile('', selectedFile, '', '', [
            new SchemaFileVariant('A Variant', selectedVariantId, 'var.json'),
        ]);

        const tree = new SchemaTree([file]);

        projectState.setLoaded(new Project(projectFile, new ProjectConfig({name: ''}), tree));
        editorState.open(new ActiveFile(file.basename, selectedVariantId));

        return useCase.execute()
            .then(() => {
                expect(openProject.execute).toBeCalledWith(projectFile);
                expect(selectFile.execute).not.toBeCalled();
                expect(selectFileVariant.execute).toBeCalledWith(file, selectedVariantId);
            });
    });
});
