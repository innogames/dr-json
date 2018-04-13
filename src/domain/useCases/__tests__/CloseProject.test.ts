import 'jest';
import {SettingsRepo} from '../../repositories/SettingsRepo';
import {SchemaTree} from '../../states/objects/fileTree/SchemaTree';
import {Project} from '../../states/objects/Project';
import {ProjectConfig} from '../../states/objects/ProjectConfig';
import {ProjectState} from '../../states/ProjectState';
import {CloseProject} from '../CloseProject';

let useCase: CloseProject;
let projectState: ProjectState;
let settingsRepo: SettingsRepo;

beforeEach(() => {
    projectState = new ProjectState();
    settingsRepo = new (jest.fn<SettingsRepo>(() => ({
        saveLastProjectFile: jest.fn().mockImplementation(() => {
            return Promise.resolve();
        }),
    })));

    useCase = new CloseProject(projectState, settingsRepo);
});

describe('CloseProject', () => {
    it('closes project', () => {
        projectState.setLoaded(new Project('someFile', new ProjectConfig({name: ''}), new SchemaTree([])));

        expect(projectState.hasProject).toBe(true);

        return useCase.execute()
            .then(() => {
                expect(projectState.error).toBeNull();
                expect(projectState.isLoading).toBe(false);
                expect(projectState.hasProject).toBe(false);

                expect(settingsRepo.saveLastProjectFile).toBeCalledWith(null);
            });
    });
});
