import {SelectFile} from '../../../domain/useCases/fileTree/SelectFile';
import {container} from '../container';

const useCase: SelectFile = container.get(SelectFile);

export function selectFile(filename: string): Promise<void> {
    return useCase.execute(filename);
}