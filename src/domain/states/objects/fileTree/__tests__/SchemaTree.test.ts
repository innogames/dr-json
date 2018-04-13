import 'jest';
import {SchemaDir} from '../SchemaDir';
import {SchemaFile} from '../SchemaFile';
import {SchemaTree} from '../SchemaTree';
import {SchemaTreeItem} from '../SchemaTreeItem';

describe('SchemaTree', () => {
    it('can be mapped', () => {
        let tree = new SchemaTree([
            new SchemaDir('Dir 1', 'dir1', [
                new SchemaFile('File A', 'fileA.json', 'fileA.schema.json', 'fileA.json', []),
                new SchemaFile('File B', 'fileB.json', 'fileB.schema.json', 'fileB.json', []),
            ]),
            new SchemaDir('Dir 2', 'dir2', [
                new SchemaFile('File C', 'fileC.json', 'fileC.schema.json', 'fileC.json', []),
            ]),
            new SchemaFile('File D', 'fileD.json', 'fileD.schema.json', 'fileD.json', []),
        ]);

        tree = tree.map((item: SchemaTreeItem) => {
            if (item instanceof SchemaDir) {
                return new SchemaDir(
                    item.label,
                    item.basename.replace('dir', 'folder'),
                    item.children,
                    item.collapsed,
                );
            } else if (item instanceof SchemaFile) {
                return new SchemaFile(
                    item.label,
                    item.basename.replace('.json', '.txt'),
                    item.schemaFile,
                    item.dataFile,
                    item.variants,
                );
            }

            return item;
        });

        expect(tree.children[0].basename).toEqual('folder1');
        expect((tree.children[0] as SchemaDir).children[0].basename).toEqual('fileA.txt');
        expect((tree.children[0] as SchemaDir).children[1].basename).toEqual('fileB.txt');
        expect(tree.children[1].basename).toEqual('folder2');
        expect((tree.children[1] as SchemaDir).children[0].basename).toEqual('fileC.txt');
        expect(tree.children[2].basename).toEqual('fileD.txt');
    });
});
