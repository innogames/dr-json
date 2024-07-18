import {SchemaDir} from '../../../states/objects/fileTree/SchemaDir';
import {SchemaTreeItem} from '../../../states/objects/fileTree/SchemaTreeItem';
import {SchemaFile} from "../../../states/objects/fileTree/SchemaFile";
import {FilesystemImpl} from "../../../../app/renderer/services/FilesystemImpl";

export function byFileContentSearch(search: string, filesystem: FilesystemImpl): (item: SchemaTreeItem) => boolean {
    if (!search) {
        return (): boolean => true;
    }

    search = search.toLowerCase();

    return (item: SchemaTreeItem): boolean => {
        if(item instanceof SchemaDir)
        {
            //Search dir
            return checkDir(item, search, filesystem);
        }
        if(item instanceof SchemaFile)
        {
            //Check File
            return checkFile(item, search, filesystem);
        }

        return false;
    };
}

function checkDir(dir: SchemaDir, search: string, filesystem: FilesystemImpl) : boolean
{
    const children : SchemaTreeItem[] = dir.children;
    for(let i: number = 0; i < children.length; i++)
    {
        const child: SchemaTreeItem = children[i];
        if(child instanceof SchemaDir)
        {
            if(checkDir(child, search, filesystem))
            {
                return true;
            }
        }
        else if(child instanceof SchemaFile)
        {
            if(checkFile(child, search, filesystem))
            {
                return true;
            }
        }
    }
    return false;
}

function checkFile(file: SchemaFile, search: string, filesystem: FilesystemImpl) : boolean
{
    try{
        const haystack: string = JSON.stringify(filesystem.readJsonSync(file.dataFile)).replace('\\', '').toLowerCase();
        return haystack.includes(search);
    } catch(error) {
        console.warn(`Failed to read file "${file.dataFile}": ${error}`)
    }

    return false;
}