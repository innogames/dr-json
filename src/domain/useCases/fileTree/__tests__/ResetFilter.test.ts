import 'jest';
import 'reflect-metadata';
import {ProjectState} from '../../../states/ProjectState';
import {ProjectConfig} from '../../../states/objects/ProjectConfig';
import {Project} from '../../../states/objects/Project';
import {SchemaTree} from '../../../states/objects/fileTree/SchemaTree';
import {ResetFilter} from '../ResetFilter';

let useCase: ResetFilter;
let projectState: ProjectState;

beforeEach(() => {
    projectState = new ProjectState();
    useCase = new ResetFilter(projectState);
});

describe('ResetFilter', () => {
    it('resets filter', () => {
        projectState.setLoaded(new Project('/root/projectFile', new ProjectConfig({name: ''}), new SchemaTree([])));

        return useCase.execute()
            .then(() => {
                expect(projectState.project.filter).toBe(null);
            });
    });
});