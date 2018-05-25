import {DataEntry} from '../../../../domain/states/objects/editor/DataEntry';
import {OpenCreateEntry} from '../../../../domain/useCases/OpenCreateEntry';
import {container} from '../../container';

const useCase: OpenCreateEntry = container.get(OpenCreateEntry);

export function openCreateEntry(byEntry: DataEntry | null = null): Promise<void> {
    return useCase.execute(byEntry);
}