import 'jest';
import {isEmpty} from '../isEmpty';

describe('isEmpty()', () => {
    it('returns true when empty', () => {
        expect(isEmpty(undefined)).toEqual(true);
        expect(isEmpty(null)).toEqual(true);
        expect(isEmpty('')).toEqual(true);
        expect(isEmpty(false)).toEqual(true);
        expect(isEmpty({})).toEqual(true);
        expect(isEmpty([])).toEqual(true);
        expect(isEmpty(NaN)).toEqual(true);
    });

    it('returns false when not empty', () => {
        expect(isEmpty(true)).toEqual(false);
        expect(isEmpty(0)).toEqual(false);
        expect(isEmpty(0.1)).toEqual(false);
        expect(isEmpty(-1)).toEqual(false);
        expect(isEmpty(' ')).toEqual(false);
        expect(isEmpty({a: 1})).toEqual(false);
        expect(isEmpty([''])).toEqual(false);
    });
});