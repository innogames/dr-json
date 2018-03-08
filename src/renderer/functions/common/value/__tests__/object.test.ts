import 'jest';
import {mapObj} from '../object';

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
