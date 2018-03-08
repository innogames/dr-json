import 'jest';
import {compareVersion} from '../version';

describe('compareVersion()', () => {
    it('returns -1 when left version is lower', () => {
        expect(compareVersion('1.2.1', '1.2.2')).toEqual(-1);
        expect(compareVersion('1.2', '1.2.1')).toEqual(-1);
        expect(compareVersion('1.2', '1.3')).toEqual(-1);
        expect(compareVersion('1.2', '2')).toEqual(-1);
    });

    it('returns 1 when left version is higher', () => {
        expect(compareVersion('1.2.2', '1.2.1')).toEqual(1);
        expect(compareVersion('1.2.1', '1.2')).toEqual(1);
        expect(compareVersion('1.3', '1.2')).toEqual(1);
        expect(compareVersion('2', '1.99')).toEqual(1);
    });

    it('returns 0 when versions are equal', () => {
        expect(compareVersion('1.2.1', '1.2.1')).toEqual(0);
        expect(compareVersion('1.2', '1.2.0')).toEqual(0);
        expect(compareVersion('1', '1.0.0')).toEqual(0);
    });
});
