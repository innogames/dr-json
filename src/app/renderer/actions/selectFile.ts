import {useCases} from '../container';

export function selectFile(filename: string): Promise<void> {
    return useCases.selectFile.execute(filename);
}