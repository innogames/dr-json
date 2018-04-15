import 'jest';
import {compareNumber, toInt} from '../number';

describe('toInt()', () => {
    it('converts numeric string to int', () => {
        expect(toInt('123')).toEqual(123);
    });
});

describe('compareNumber()', () => {
    it('returns -1 when left number is lower', () => {
        expect(compareNumber(1, 2)).toEqual(-1);
    });

    it('returns 1 when left number is higher', () => {
        expect(compareNumber(2, 1)).toEqual(1);
    });

    it('returns 0 when numbers are equal', () => {
        expect(compareNumber(2, 1)).toEqual(1);
    });
});