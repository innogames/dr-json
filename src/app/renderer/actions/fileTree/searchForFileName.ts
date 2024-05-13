import {SearchForFileName} from '../../../../domain/useCases/fileTree/SearchForFileName';
import {container} from '../../container';

const useCase: SearchForFileName = container.get(SearchForFileName);

export function searchForFileName(text: string): Promise<void> {
    return useCase.execute(text);
}