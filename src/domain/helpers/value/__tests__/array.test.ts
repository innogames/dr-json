import 'jest';
import {unique} from '../array';

describe('unique()', () => {
    it('returns unique array', () => {
        expect(unique(['a', 'b', 'a'])).toEqual(['a', 'b']);
    });
});