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
});