import 'jest';
import 'reflect-metadata';
import {SchemaFile} from '../../../states/objects/fileTree/SchemaFile';
import {SchemaTree} from '../../../states/objects/fileTree/SchemaTree';
import {Project} from '../../../states/objects/Project';
import {ProjectConfig} from '../../../states/objects/ProjectConfig';
import {ProjectState} from '../../../states/ProjectState';
import {ToggleIsRewardFile} from "../ToggleIsRewardFile";

let useCase: ToggleIsRewardFile;
let projectState: ProjectState;

beforeEach(() => {
    projectState = new ProjectState();

    let fileA: SchemaFile = new SchemaFile('File A', 'normalFile', 'file', 'file');
    let fileB: SchemaFile = new SchemaFile('File B', 'rewardFile', 'file', 'file');
    fileB.setIsReward(true);

    const tree = new SchemaTree([fileA, fileB]);
    projectState.setLoaded(new Project('/root/projectFile', new ProjectConfig({name: ''}), tree));

    useCase = new ToggleIsRewardFile(projectState);
});

describe('ToggleIsReward', () => {
    it('toggle on', () => {
        return useCase.execute('normalFile')
            .then(() => {
                expect((projectState.project.schemaTree.children[0] as SchemaFile).isReward).toBe(true);
                expect((projectState.project.schemaTree.children[1] as SchemaFile).isReward).toBe(true);
            });
    });

    it('toggle off', () => {
        return useCase.execute('rewardFile')
            .then(() => {
                expect((projectState.project.schemaTree.children[0] as SchemaFile).isReward).toBe(false);
                expect((projectState.project.schemaTree.children[1] as SchemaFile).isReward).toBe(false);
            });
    });
});
