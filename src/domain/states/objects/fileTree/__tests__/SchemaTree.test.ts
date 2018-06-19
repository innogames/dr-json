import 'jest';
import {SchemaDir} from '../SchemaDir';
import {SchemaFile} from '../SchemaFile';
import {SchemaTree} from '../SchemaTree';
import {SchemaTreeItem} from '../SchemaTreeItem';
import {SchemaFileVariant} from "../SchemaFileVariant";

describe('SchemaTree', () => {
    it('can be mapped', () => {
        let tree = new SchemaTree([
            new SchemaDir('Dir 1', 'dir1', [
                new SchemaFile('File A', 'fileA', 'fileA.schema.json', 'fileA.json', []),
                new SchemaFile('File B', 'fileB', 'fileB.schema.json', 'fileB.json', []),
            ]),
            new SchemaDir('Dir 2', 'dir2', [
                new SchemaFile('File C', 'fileC', 'fileC.schema.json', 'fileC.json', []),
            ]),
            new SchemaFile('File D', 'fileD', 'fileD.schema.json', 'fileD.json', []),
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
                    item.basename.replace('file', '_'),
                    item.schemaFile,
                    item.dataFile,
                    item.variants,
                );
            }

            return item;
        });

        expect(tree.children[0].basename).toEqual('folder1');
        expect((tree.children[0] as SchemaDir).children[0].basename).toEqual('_A');
        expect((tree.children[0] as SchemaDir).children[1].basename).toEqual('_B');
        expect(tree.children[1].basename).toEqual('folder2');
        expect((tree.children[1] as SchemaDir).children[0].basename).toEqual('_C');
        expect(tree.children[2].basename).toEqual('_D');
    });

    it('orders children by type and name', () => {
        let tree = new SchemaTree([
            new SchemaDir('Dir 1', 'dir1', [
                new SchemaFile('BB', 'bb', 'bb.schema.json', 'bb.json', []),
                new SchemaFile('AA', 'aa', 'aa.schema.json', 'aa.json', []),
            ]),
            new SchemaFile('A File', 'aFile', 'aFile.schema.json', 'aFile.json', []),
            new SchemaFile('B File', 'bFile', 'bFile.schema.json', 'bFile.json', []),
            new SchemaDir('Dir 2', 'dir2', []),
        ]);

        expect(tree.children[0].basename).toBe('dir1');
        expect(tree.children[1].basename).toBe('dir2');
        expect(tree.children[2].basename).toBe('aFile');
        expect(tree.children[3].basename).toBe('bFile');
    });

    it('returns a flat file list', () => {
        let fileA = new SchemaFile('File A', 'fileA', 'fileA.schema.json', 'fileA.json', []);
        let fileB = new SchemaFile('File B', 'fileB', 'fileB.schema.json', 'fileB.json', []);
        let fileC = new SchemaFile('File C', 'fileC', 'fileC.schema.json', 'fileC.json', []);
        let fileD = new SchemaFile('File D', 'fileD', 'fileD.schema.json', 'fileD.json', []);

        let tree = new SchemaTree([
            new SchemaDir('Dir 1', 'dir1', [
                fileA,
                fileB,
            ]),
            new SchemaDir('Dir 2', 'dir2', [
                fileC,
            ]),
            fileD,
        ]);

        let expectedFlatTree = [fileA, fileB, fileC, fileD];

        expect(tree.getFilesFlat()).toEqual(expectedFlatTree);
    })

    it('can be filtered', () => {
        let tree = new SchemaTree([
            new SchemaDir('Dir 1', 'dir1', [
                new SchemaFile('File A', 'fileA', 'fileA.schema.json', 'fileA.json', []),
                new SchemaFile('File B', 'fileB', 'fileB.schema.json', 'fileB.json', [
                    new SchemaFileVariant('v', 'v', 'v.json'),
                ]),
            ]),
            new SchemaDir('Dir 2', 'dir2', [
                new SchemaFile('File C', 'fileC', 'fileC.schema.json', 'fileC.json', []),
            ]),
            new SchemaFile('File D', 'fileD', 'fileD.schema.json', 'fileD.json', [
                new SchemaFileVariant('v', 'v', 'v.json'),
            ]),
        ]);

        const filtered: SchemaTree = tree.filterFiles((file: SchemaFile) => {
            return file.variants.reduce(
                (keep: boolean, variant: SchemaFileVariant) => keep || variant.variantId == 'v',
                false,
            );
        });

        expect(filtered.children.length).toEqual(2);
        expect(filtered.children[0].basename).toEqual('dir1');
        expect((filtered.children[0] as SchemaDir).children.length).toEqual(1);
        expect((filtered.children[0] as SchemaDir).children[0].basename).toEqual('fileB');
        expect(filtered.children[1].basename).toEqual('fileD');
    });
});
