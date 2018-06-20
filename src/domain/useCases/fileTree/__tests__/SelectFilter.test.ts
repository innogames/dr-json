import 'jest';
import 'reflect-metadata';
import {ProjectState} from '../../../states/ProjectState';
import {SelectFilter} from '../SelectFilter';
import {ProjectConfig} from '../../../states/objects/ProjectConfig';
import {Project} from '../../../states/objects/Project';
import {SchemaTree} from '../../../states/objects/fileTree/SchemaTree';

let useCase: SelectFilter;
let projectState: ProjectState;

beforeEach(() => {
    projectState = new ProjectState();
    useCase = new SelectFilter(projectState);
});

describe('SelectFilter', () => {
    it('selects filter', () => {
        projectState.setLoaded(new Project('/root/projectFile', new ProjectConfig({name: ''}), new SchemaTree([])));

        return useCase.execute('someFilter')
            .then(() => {
                expect(projectState.project.filter).toBe('someFilter');
            });
    });
});