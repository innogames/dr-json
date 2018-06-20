import 'jest';
import {SchemaDir} from '../../../../states/objects/fileTree/SchemaDir';
import {SchemaFile} from '../../../../states/objects/fileTree/SchemaFile';
import {SchemaFileVariant} from '../../../../states/objects/fileTree/SchemaFileVariant';
import {SchemaTree} from '../../../../states/objects/fileTree/SchemaTree';
import {byVariantId} from '../byVariantId';

describe('byVariantId()', () => {
    it('filters files by variantId', () => {
        const tree = new SchemaTree([
            new SchemaDir('Dir 1', 'dir1', [
                new SchemaFile('File A', 'fileA', 'fileA.schema.json', 'fileA.json', []),
                new SchemaFile('File B', 'fileB', 'fileB.schema.json', 'fileB.json', [
                    new SchemaFileVariant('label', 'someId', 'someFile.json'),
                ]),
            ]),
            new SchemaDir('Dir 2', 'dir2', [
                new SchemaFile('File C', 'fileC', 'fileC.schema.json', 'fileC.json', []),
            ]),
            new SchemaFile('File D', 'fileD', 'fileD.schema.json', 'fileD.json', [
                new SchemaFileVariant('label', 'someId', 'someFile.json'),
            ]),
        ]);

        const filteredTree = tree.filterFiles(byVariantId('someId'));

        expect(filteredTree.children.length).toEqual(2);
        expect(filteredTree.children[0].basename).toEqual('dir1');
        expect((filteredTree.children[0] as SchemaDir).children.length).toEqual(1);
        expect((filteredTree.children[0] as SchemaDir).children[0].basename).toEqual('fileB');
        expect(filteredTree.children[1].basename).toEqual('fileD');
    });

    it('does not filter when no variantId', () => {
        const tree = new SchemaTree([
            new SchemaDir('Dir 1', 'dir1', [
                new SchemaFile('File A', 'fileA', 'fileA.schema.json', 'fileA.json', []),
                new SchemaFile('File B', 'fileB', 'fileB.schema.json', 'fileB.json', [
                    new SchemaFileVariant('label', 'someId', 'someFile.json'),
                ]),
            ]),
            new SchemaDir('Dir 2', 'dir2', [
                new SchemaFile('File C', 'fileC', 'fileC.schema.json', 'fileC.json', []),
            ]),
            new SchemaFile('File D', 'fileD', 'fileD.schema.json', 'fileD.json', [
                new SchemaFileVariant('label', 'someId', 'someFile.json'),
            ]),
        ]);

        const filteredTree = tree.filterFiles(byVariantId(''));

        expect(filteredTree.children.length).toEqual(3);
        expect(filteredTree.children[0].basename).toEqual('dir1');
        expect((filteredTree.children[0] as SchemaDir).children.length).toEqual(2);
        expect((filteredTree.children[0] as SchemaDir).children[0].basename).toEqual('fileA');
        expect((filteredTree.children[0] as SchemaDir).children[1].basename).toEqual('fileB');
        expect(filteredTree.children[1].basename).toEqual('dir2');
        expect(filteredTree.children[2].basename).toEqual('fileD');
    });
});