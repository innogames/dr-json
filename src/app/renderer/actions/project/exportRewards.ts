import {ExportRewards} from '../../../../domain/useCases/project/ExportRewards';
import {container} from '../../container';

const useCase: ExportRewards = container.get(ExportRewards);

export function exportRewards(path: string): Promise<void> {
    return useCase.execute(path);
}