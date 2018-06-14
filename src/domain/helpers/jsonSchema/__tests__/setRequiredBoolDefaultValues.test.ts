import 'jest';
import {setRequiredBoolDefaultValues} from '../setRequiredBoolDefaultValues';

describe('setRequiredBoolDefaultValues()', () => {
    it('sets value to false when undefined but required', () => {
        const schema: any = {
            type:       'object',
            properties: {
                bool: {type: 'boolean'},
            },
            required:   ['bool'],
        };

        const data: any = {};

        const expected: any = {
            bool: false,
        };

        expect(setRequiredBoolDefaultValues(data, schema)).toEqual(expected);
    });

    it('keep when not required', () => {
        const schema: any = {
            type:       'object',
            properties: {
                bool: {type: 'boolean'},
            },
            required:   [],
        };

        const data: any     = {};
        const expected: any = {};

        expect(setRequiredBoolDefaultValues(data, schema)).toEqual(expected);
    });

    it('handles children', () => {
        const schema: any = {
            type:       'object',
            properties: {
                arr: {
                    type:  'array',
                    items: {
                        type:       'object',
                        properties: {
                            bool: {type: 'boolean'},
                        },
                        required:   ['bool'],
                    },
                },
                obj: {
                    type:       'object',
                    properties: {
                        bool: {type: 'boolean'},
                    },
                    required:   ['bool'],
                },
            },
        };

        const data: any = {
            arr: [
                {},
            ],
            obj: {},
        };

        const expected: any = {
            arr: [
                {bool: false},
            ],
            obj: {bool: false},
        };

        expect(setRequiredBoolDefaultValues(data, schema)).toEqual(expected);
    });

    it('keeps empty values that are not bool', () => {
        const schema: any = {
            type:       'object',
            properties: {
                int: {type: 'integer'},
                str: {type: 'string'},
            },
            required:   ['int', 'str'],
        };

        const data: any     = {
            int: 0,
            str: '',
        };
        const expected: any = {
            int: 0,
            str: '',
        };

        expect(setRequiredBoolDefaultValues(data, schema)).toEqual(expected);
    });
});