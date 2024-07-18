import {SearchForFileContent} from '../../../../domain/useCases/project/SearchforFileContent';
import {container} from '../../container';

const useCase: SearchForFileContent = container.get(SearchForFileContent);

export function searchForFileContent(text: string): Promise<void> {
    return useCase.execute(text);
}