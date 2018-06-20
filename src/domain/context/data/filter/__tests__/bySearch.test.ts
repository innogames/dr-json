import 'jest';
import {DataEntry} from '../../../../states/objects/editor/DataEntry';
import {bySearch} from '../bySearch';

describe('bySearch()', () => {
    it('filters entries by search text', () => {
        const entries: DataEntry[] = [
            new DataEntry(1, {id: 1, name: 'one'}),
            new DataEntry(2, {id: 2, name: 'two'}),
            new DataEntry(3, {id: 3, name: 'once'}),
        ];

        const filtered: DataEntry[] = entries.filter(bySearch('on'));

        expect(filtered.length).toEqual(2);
        expect(filtered[0].id).toEqual(1);
        expect(filtered[1].id).toEqual(3);
    });

    it('does not search when no search text', () => {
        const entries: DataEntry[] = [
            new DataEntry(1, {id: 1, name: 'one'}),
            new DataEntry(2, {id: 2, name: 'two'}),
            new DataEntry(3, {id: 3, name: 'once'}),
        ];

        const filtered: DataEntry[] = entries.filter(bySearch(''));

        expect(filtered.length).toEqual(3);
    });
});