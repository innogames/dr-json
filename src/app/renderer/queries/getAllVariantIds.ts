import {GetAllVariantIds} from '../../../domain/stateQueries/GetAllVariantIds';
import {container} from '../container';

const query: GetAllVariantIds = container.get(GetAllVariantIds);

export function getAllVariantIds(): string[] {
    return query.fetch();
}