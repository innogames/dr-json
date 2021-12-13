import 'jest';
import 'reflect-metadata';
import {EditorState} from '../../../states/EditorState';
import {ActiveFile} from '../../../states/objects/editor/ActiveFile';
import {SchemaFile} from '../../../states/objects/fileTree/SchemaFile';
import {SchemaFileVariant} from '../../../states/objects/fileTree/SchemaFileVariant';
import {SchemaTree} from '../../../states/objects/fileTree/SchemaTree';
import {Project} from '../../../states/objects/Project';
import {ProjectConfig} from '../../../states/objects/ProjectConfig';
import {ProjectState} from '../../../states/ProjectState';
import {OpenProject} from '../OpenProject';
import {Reload} from '../Reload';
import {SelectFile} from '../../fileTree/SelectFile';
import {SelectFileVariant} from '../../fileTree/SelectFileVariant';

jest.mock('../OpenProject', () => {
    return {
        OpenProject: jest.fn().mockImplementation(() => {
            return {
                execute: jest.fn().mockImplementation(() => {
                    return Promise.resolve();
                }),
            }
        })
    }
});

jest.mock('../../fileTree/SelectFile', () => {
    return {
        SelectFile: jest.fn().mockImplementation(() => {
            return {
                execute: jest.fn().mockImplementation(() => {
                    return Promise.resolve();
                }),
            }
        })
    }
});

jest.mock('../../fileTree/SelectFileVariant', () => {
    return {
        SelectFileVariant: jest.fn().mockImplementation(() => {
            return {
                execute: jest.fn().mockImplementation(() => {
                    return Promise.resolve();
                }),
            }
        })
    }
});


let useCase: Reload;
let editorState: EditorState;
let projectState: ProjectState;
let openProject: OpenProject;
let selectFile: SelectFile;
let selectFileVariant: SelectFileVariant;

beforeEach(() => {
    // @ts-ignore
    openProject = new OpenProject();
    // @ts-ignore
    selectFile = new SelectFile();
    // @ts-ignore
    selectFileVariant = new SelectFileVariant();

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
        editorState.open(new ActiveFile(file.basename, file.dataFile));

        return useCase.execute()
            .then(() => {
                expect(openProject.execute).toBeCalledWith(projectFile);
                expect(selectFile.execute).toBeCalledWith(file.basename);
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
        editorState.open(new ActiveFile(file.basename, file.dataFile, selectedVariantId));

        return useCase.execute()
            .then(() => {
                expect(openProject.execute).toBeCalledWith(projectFile);
                expect(selectFile.execute).not.toBeCalled();
                expect(selectFileVariant.execute).toBeCalledWith(file.basename, selectedVariantId);
            });
    });
});
