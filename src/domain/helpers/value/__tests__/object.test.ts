import 'jest';
import {isNestedEmpty, mapObj} from '../object';

describe('mapObj()', () => {
    it('returns mapped properties', () => {
        const obj: any = {
            first:  1,
            second: 'two',
            three:  3,
        };

        const res: any = mapObj(obj, (value, prop) => {
            if (value == 1) {
                return 11;
            } else if (prop == 'second') {
                return 2;
            }

            return value;
        });

        expect(res).toEqual({
            first:  11,
            second: 2,
            three:  3,
        });
    });
});

describe('isNestedEmpty()', () => {
    it('returns true when empty', () => {
        expect(isNestedEmpty(null)).toBe(true);
        expect(isNestedEmpty(undefined)).toBe(true);
        expect(isNestedEmpty('')).toBe(true);
        expect(isNestedEmpty([])).toBe(true);
        expect(isNestedEmpty({})).toBe(true);

        const obj: any = {
            one:        null,
            two:        undefined,
            three:      '',
            emptyObj:   {},
            emptyArray: [],
            sub:        {
                nope: null,
            },
        };
        expect(isNestedEmpty(obj)).toBe(true);
    });

    it('returns false when not empty', () => {
        expect(isNestedEmpty(false)).toBe(false);
        expect(isNestedEmpty(0)).toBe(false);
        expect(isNestedEmpty(' ')).toBe(false);
        expect(isNestedEmpty([undefined])).toBe(false);
        expect(isNestedEmpty({val: false})).toBe(false);
        expect(isNestedEmpty({val: 0})).toBe(false);
        expect(isNestedEmpty({val: ' '})).toBe(false);
        expect(isNestedEmpty({val: [null]})).toBe(false);
        expect(isNestedEmpty({val: {sub: 1}})).toBe(false);
    });
});
