import 'jest';
import {SchemaFile} from '../SchemaFile';
import {SchemaFileVariant} from '../SchemaFileVariant';

describe('SchemaFile', () => {
    it('sorts variants', () => {
        const variants = [
            new SchemaFileVariant('b', 'b', 'b.json'),
            new SchemaFileVariant('a', 'a', 'a.json'),
        ];

        const file = new SchemaFile('File', 'file', 'schemaFile', 'dataFile', variants);

        expect(file.variants[0].variantId).toEqual('a');
        expect(file.variants[1].variantId).toEqual('b');
    });
});
