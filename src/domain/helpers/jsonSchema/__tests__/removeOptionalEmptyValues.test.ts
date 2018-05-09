import 'jest';
import {removeOptionalEmptyValues} from '../removeOptionalEmptyValues';

describe('removeOptionalEmptyValues()', () => {
    it('removes empty values when not required', () => {
        const schema: any = {
            type:       'object',
            properties: {
                keep:   {type: 'string'},
                remove: {type: 'string'},
            },
            required:   ['keep'],
        };

        const data: any = {
            keep:   null,
            remove: null,
        };

        const expected: any = {
            keep:   null,
            remove: undefined,
        };

        expect(removeOptionalEmptyValues(data, schema)).toEqual(expected);
    });

    it('removes empty object when not required', () => {
        const schema: any = {
            type:       'object',
            properties: {
                foo: {type: 'string'},
                obj: {
                    type:       'object',
                    properties: {
                        empty: {type: 'string'},
                    },
                    required:   ['empty'],
                },
            },
        };

        const data: any = {
            foo: 'bar',
            obj: {
                empty: null,
            },
        };

        const expected: any = {
            foo: 'bar',
        };

        expect(removeOptionalEmptyValues(data, schema)).toEqual(expected);
    });

    it('keeps empty object when required', () => {
        const schema: any = {
            type:       'object',
            properties: {
                foo: {type: 'string'},
                obj: {
                    type:       'object',
                    properties: {
                        empty: {type: 'string'},
                    },
                    required:   ['empty'],
                },
            },
            required:   ['obj'],
        };

        const data: any = {
            foo: 'bar',
            obj: {
                empty: null,
            },
        };

        const expected: any = {
            foo: 'bar',
            obj: {
                empty: null,
            },
        };

        expect(removeOptionalEmptyValues(data, schema)).toEqual(expected);
    });

    it('removes empty object in child object when not required', () => {
        const schema: any = {
            type:       'object',
            properties: {
                name:   {type: 'string'},
                parent: {
                    type:       'object',
                    properties: {
                        empty: {type: 'string'},
                    },
                },
            },
        };

        const data: any = {
            parent: {
                name: 'parent',
                obj:  {
                    empty: null,
                },
            },
        };

        const expected: any = {
            parent: {
                name: 'parent',
            },
        };

        expect(removeOptionalEmptyValues(data, schema)).toEqual(expected);
    });

    it('removes empty object in child array when not required', () => {
        const schema: any = {
            type:  'array',
            items: {
                type:       'object',
                properties: {
                    empty: {type: 'string'},
                },
            },
        };

        const data: any[] = [
            {
                empty: null,
            },
        ];

        const expected: any[] = [];

        expect(removeOptionalEmptyValues(data, schema)).toEqual(expected);
    });
});