import 'jest';
import {DataEntry} from '../../../../states/objects/editor/DataEntry';
import {byError} from '../byError';

describe('byError()', () => {
    it('filters entries by error', () => {
        let entry1: DataEntry = new DataEntry(1, {id: 1, name: 'one'});
        let entry2: DataEntry = new DataEntry(2, {id: 2, name: 'two'});
        let entry3: DataEntry = new DataEntry(3, {id: 3, name: 'three'});

        entry2.setError('failed');

        const entries: DataEntry[] = [entry1, entry2, entry3];

        const filtered: DataEntry[] = entries.filter(byError);

        expect(filtered.length).toEqual(1);
        expect(filtered[0].id).toEqual(2);
    });
});
