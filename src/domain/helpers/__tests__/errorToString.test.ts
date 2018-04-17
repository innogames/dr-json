import 'jest';
import {errorToString} from '../errorToString';

describe('errorToString()', () => {
    it('keeps null as is', () => {
        expect(errorToString(null)).toEqual(null);
        expect(errorToString(undefined)).toEqual(undefined);
    });

    it('keeps string as is', () => {
        expect(errorToString('some error')).toEqual('some error');
    });

    it('converts error code', () => {
        expect(errorToString(123)).toEqual('123');
    });

    it('converts Error object', () => {
        expect(errorToString(new Error('error instance'))).toEqual('error instance');
    });

    it('converts array of errors', () => {
        const errors: any[] = [
            'err string',
            'err obj',
        ];
        expect(errorToString(errors)).toEqual('err string, err obj');
    });

    it('converts object with toString() method', () => {
        class CustomError {
            toString(): string {
                return 'custom err';
            }
        }

        expect(errorToString(new CustomError())).toEqual('custom err');
    });
});