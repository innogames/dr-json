import 'jest';
import {trimNested} from '../trimNested';

describe('trimNested()', () => {
    it('trims string', () => {
        expect(trimNested(' a string ')).toEqual('a string');
        expect(trimNested('break\n')).toEqual('break');
    });

    it('keeps non sring values as is', () => {
        expect(trimNested(null)).toEqual(null);
        expect(trimNested(undefined)).toEqual(undefined);
        expect(trimNested(true)).toEqual(true);
        expect(trimNested(5)).toEqual(5);
        expect(trimNested(1.2)).toEqual(1.2);
    });

    it('trims array', () => {
        expect(trimNested([1, ' foo ', ' bar'])).toEqual([1, 'foo', 'bar']);
    });

    it('trims object', () => {
        expect(trimNested({is: true, name: ' Me '})).toEqual({is: true, name: 'Me'});
    });
});
