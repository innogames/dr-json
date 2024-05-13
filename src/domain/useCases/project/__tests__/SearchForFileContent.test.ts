import 'jest';
import 'reflect-metadata';
import {ProjectState} from "../../../states/ProjectState";
import {SearchForFileContent} from '../SearchforFileContent';

let useCase: SearchForFileContent;
let projectState: ProjectState;
let search: string;

beforeEach(() => {
    projectState = new ProjectState();
    useCase = new SearchForFileContent(projectState);
    search = 'foo';
});

describe('SearchInProject', () => {
    it('searches files in current project', () => {

        return useCase.execute(search)
            .then(() => {
                expect(projectState.fileContentSearchText).toBe(search);
            });
    });
});
