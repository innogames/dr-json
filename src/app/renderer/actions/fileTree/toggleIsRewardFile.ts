import {container} from '../../container';
import {ToggleIsRewardFile} from "../../../../domain/useCases/fileTree/ToggleIsRewardFile";

const useCase: ToggleIsRewardFile = container.get(ToggleIsRewardFile);

export function toggleIsRewardFile(basename: string): Promise<void> {
    return useCase.execute(basename);
}