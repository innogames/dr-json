import 'jest';
import {isSet} from '../isSet';

describe('isSet()', () => {
    it('returns false when null', () => {
        expect(isSet(null)).toEqual(false);
    });

    it('returns false when undefined', () => {
        expect(isSet(undefined)).toEqual(false);
    });

    it('returns true when 0', () => {
        expect(isSet(0)).toEqual(true);
    });

    it('returns true when empty string', () => {
        expect(isSet('')).toEqual(true);
    });

    it('returns true when false', () => {
        expect(isSet(false)).toEqual(true);
    });
});