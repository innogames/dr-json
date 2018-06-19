import {SearchInFile} from '../../../../domain/useCases/entries/SearchInFile';
import {container} from '../../container';

const useCase: SearchInFile = container.get(SearchInFile);

export function searchInFile(text: string): Promise<void> {
    return useCase.execute(text);
}