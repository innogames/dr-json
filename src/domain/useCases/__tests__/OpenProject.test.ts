import 'jest';
import 'reflect-metadata';
import {ProjectRepo} from '../../repositories/ProjectRepo';
import {SchemaRepo} from '../../repositories/SchemaRepo';
import {SettingsRepo} from '../../repositories/SettingsRepo';
import {SchemaDir} from '../../states/objects/fileTree/SchemaDir';
import {SchemaFile} from '../../states/objects/fileTree/SchemaFile';
import {SchemaTree} from '../../states/objects/fileTree/SchemaTree';
import {ProjectConfig} from '../../states/objects/ProjectConfig';
import {ProjectSettings} from '../../states/objects/settings/ProjectSettings';
import {ProjectState} from '../../states/ProjectState';
import {SettingsState} from '../../states/SettingsState';
import {CloseProject} from '../CloseProject';
import {OpenProject} from '../OpenProject';

let useCase: OpenProject;
let closeProject: CloseProject;
let projectRepo: ProjectRepo;
let settingsRepo: SettingsRepo;
let schemaRepo: SchemaRepo;
let projectState: ProjectState;
let settingsState: SettingsState;

beforeEach(() => {
    closeProject = new (jest.fn<CloseProject>(() => ({
        execute: () => Promise.resolve(),
    })));

    projectRepo = new (jest.fn<ProjectRepo>(() => ({
        loadConfig: () => Promise.resolve(new ProjectConfig({name: 'Test'})),
    })));

    settingsRepo = new (jest.fn<SettingsRepo>(() => ({
        saveLastProjectFile: jest.fn().mockImplementation(() => {
            return Promise.resolve();
        }),
        loadProjectSettings: jest.fn().mockImplementation((): Promise<ProjectSettings> => {
            return Promise.resolve({
                collapsedDirs: ['collapsedFolder'],
            });
        }),
    })));

    schemaRepo = new (jest.fn<SchemaRepo>(() => ({
        loadFileTree: jest.fn(),
    })));

    projectState  = new ProjectState();
    settingsState = new SettingsState();

    useCase = new OpenProject(
        closeProject,
        projectRepo,
        settingsRepo,
        schemaRepo,
        projectState,
        settingsState,
    );
});

describe('OpenProject', () => {
    it('opens project', () => {
        const projectFile = 'root/myProjectFile.json';

        schemaRepo.loadFileTree = () => {
            const fileA = new SchemaFile('File A', 'fileA', 'fileA.schema.json', 'fileA.json', []);
            const fileB = new SchemaFile('File B', 'fileB', 'fileB.schema.json', 'fileB.json', []);
            const fileC = new SchemaFile('File C', 'fileC', 'fileC.schema.json', 'fileC.json', []);

            return Promise.resolve(new SchemaTree([
                new SchemaDir('Open Folder', 'openFolder', [fileA]),
                new SchemaDir('Collapsed Folder', 'collapsedFolder', [fileB]),
                fileC,
            ]));
        };

        return useCase.execute(projectFile)
            .then(() => {
                if (projectState.error) {
                    throw projectState.error;
                }

                expect(projectState.isLoading).toBe(false);
                expect(projectState.error).toBeNull();
                expect(projectState.project.file).toBe(projectFile);
                expect(projectState.project.schemaTree.children.length).toBe(3);

                expect((projectState.project.schemaTree.children[0] as SchemaDir).collapsed).toBe(false);
                expect((projectState.project.schemaTree.children[1] as SchemaDir).collapsed).toBe(true);

                expect(settingsRepo.saveLastProjectFile).toBeCalledWith(projectFile);
            });
    });
});
