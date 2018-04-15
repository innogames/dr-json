import 'jest';
import {trim} from '../trim';

describe('trim()', () => {
    it('trims string', () => {
        expect(trim(' a string ')).toEqual('a string');
        expect(trim('break\n')).toEqual('break');
    });

    it('keeps non sring values as is', () => {
        expect(trim(null)).toEqual(null);
        expect(trim(undefined)).toEqual(undefined);
        expect(trim(true)).toEqual(true);
        expect(trim(5)).toEqual(5);
        expect(trim(1.2)).toEqual(1.2);
    });

    it('does not trim array if not recursive', () => {
        expect(trim([1, ' foo ', ' bar'])).toEqual([1, ' foo ', ' bar']);
    });

    it('trims array', () => {
        expect(trim([1, ' foo ', ' bar'], true)).toEqual([1, 'foo', 'bar']);
    });

    it('does not trim object if not recursive', () => {
        expect(trim({is: true, name: ' Me '})).toEqual({is: true, name: ' Me '});
    });

    it('trims object', () => {
        expect(trim({is: true, name: ' Me '}, true)).toEqual({is: true, name: 'Me'});
    });
});
