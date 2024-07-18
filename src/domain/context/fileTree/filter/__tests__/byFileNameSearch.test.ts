import 'jest';
import {SchemaDir} from '../../../../states/objects/fileTree/SchemaDir';
import {SchemaFile} from '../../../../states/objects/fileTree/SchemaFile';
import {SchemaTreeItem} from '../../../../states/objects/fileTree/SchemaTreeItem';
import {byFileNameSearch} from '../byFileNameSearch';

describe('byFileNameSearch()', () => {

    const entries: SchemaTreeItem[] = [
        new SchemaDir("firstDir", "Folder", [
            new SchemaFile("FirstFolderFile", "ChestRewards", "FirstFolderFile", "FirstFolderFile"),
            new SchemaFile("SecondFolderFile", "Nonsense", "SecondFolderFile", "SecondFolderFile"),
        ], false),
        new SchemaDir("secondDir", "Folder", [
            new SchemaFile("FirstFolderFile", "Nonsense", "FirstFolderFile", "FirstFolderFile"),
            new SchemaFile("SecondFolderFile", "Nonsense", "SecondFolderFile", "SecondFolderFile"),
        ], false),
        new SchemaFile("FirstFile", "Buildings", "FirstFile", "FirstFile"),
        new SchemaFile("SecondFile", "GuildRewards", "SecondFile", "SecondFile"),
        new SchemaFile("ThirdFile", "Rewards", "ThirdFile", "ThirdFile"),
    ];

    it('filters entries by search text', () => {
        const filteredRewards: SchemaTreeItem[] = entries.filter(byFileNameSearch('Rewards'));

        expect(filteredRewards.length).toEqual(3);
        expect(filteredRewards[0] instanceof SchemaDir).toEqual(true);
        expect(filteredRewards[1] instanceof SchemaFile).toEqual(true);

        const filteredFolders: SchemaTreeItem[] = entries.filter(byFileNameSearch('Nonsense'));

        expect(filteredFolders.length).toEqual(2);
        expect(filteredFolders[0] instanceof SchemaDir).toEqual(true);
        expect(filteredFolders[1] instanceof SchemaDir).toEqual(true);
    });

    it('does not search when no search text', () => {
        const filtered: SchemaTreeItem[] = entries.filter(byFileNameSearch(''));

        expect(filtered.length).toEqual(5);
    });
});