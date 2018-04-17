import {DataEntry} from '../../../../domain/states/objects/editor/DataEntry';
import {useCases} from '../../container';

export function openCreateEntry(byEntry: DataEntry | null = null): Promise<void> {
    return useCases.openCreateEntry.execute(byEntry);
}