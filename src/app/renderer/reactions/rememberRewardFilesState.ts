import {reaction} from 'mobx';
import {ProjectState} from '../../../domain/states/ProjectState';
import {container} from '../container';
import {SchemaFile} from "../../../domain/states/objects/fileTree/SchemaFile";
import {changeSettingRewardDirs} from "../actions/settings/changeSettingRewardDirs";

// remember the reward files, so the states will be the same
// after closing and opening the application again.
const projectState: ProjectState = container.get(ProjectState);

export function rememberRewardFilesState(): void {
    reaction(
        (): string[] => {
            if (!projectState.hasProject) {
                return [];
            }

            const rewards: string[] = [];

            projectState.project.schemaTree.forEachFile((file: SchemaFile) => {
                if (file.isReward) {
                    rewards.push(file.basename);
                }
            });

            return rewards;
        },
        (rewards: string[]): void => {
            if (rewards.length > 0) {
                changeSettingRewardDirs(rewards);
            }
        },
        {
            delay: 1000,
        },
    );
}

