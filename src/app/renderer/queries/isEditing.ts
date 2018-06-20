import {IsEditing} from '../../../domain/stateQueries/IsEditing';
import {container} from '../container';

const query: IsEditing = container.get(IsEditing);

export function isEditing(): boolean {
    return query.fetch();
}