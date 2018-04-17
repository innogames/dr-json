import {useCases} from '../../container';

export function searchInFile(text: string): Promise<void> {
    return useCases.searchInFile.execute(text);
}