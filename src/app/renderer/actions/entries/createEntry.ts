import {DataEntry} from '../../../../domain/states/objects/editor/DataEntry';
import {CreateEntry} from '../../../../domain/useCases/CreateEntry';
import {container} from '../../container';

const useCase: CreateEntry = container.get(CreateEntry);

export function createEntry(file: string, entry: DataEntry): Promise<void> {
    return useCase.execute(file, entry);
}