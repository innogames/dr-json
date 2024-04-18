import {SearchForFile} from '../../../../domain/useCases/fileTree/SearchForFile';
import {container} from '../../container';

const useCase: SearchForFile = container.get(SearchForFile);

export function searchForFile(text: string): Promise<void> {
    return useCase.execute(text);
}