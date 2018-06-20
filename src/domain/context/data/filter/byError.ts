import {DataEntry} from '../../../states/objects/editor/DataEntry';

export function byError(entry: DataEntry): boolean {
    return !!entry.error;
}
