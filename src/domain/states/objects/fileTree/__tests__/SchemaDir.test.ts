import 'jest';
import {SchemaDir} from '../SchemaDir';
import {SchemaFile} from '../SchemaFile';

describe('SchemaDir', () => {
    it('can be collapsed', () => {
        const dir = new SchemaDir('Dir', 'dir', [], false);
        expect(dir.collapsed).toEqual(false);

        dir.setCollapsed(true);
        expect(dir.collapsed).toEqual(true);
    });

    it('orders children by type and name', () => {
        let dir = new SchemaDir('Root', 'root', [
            new SchemaDir('Dir 1', 'dir1', [
                new SchemaFile('BB', 'bb', 'bb.schema.json', 'bb.json', []),
                new SchemaFile('AA', 'aa', 'aa.schema.json', 'aa.json', []),
            ]),
            new SchemaFile('A File', 'aFile', 'aFile.schema.json', 'aFile.json', []),
            new SchemaFile('B File', 'bFile', 'bFile.schema.json', 'bFile.json', []),
            new SchemaDir('Dir 2', 'dir2', []),
        ]);

        expect(dir.children[0].basename).toBe('dir1');
        expect(dir.children[1].basename).toBe('dir2');
        expect(dir.children[2].basename).toBe('aFile');
        expect(dir.children[3].basename).toBe('bFile');
    });
});
