import {SchemaDir} from '../../../states/objects/fileTree/SchemaDir';
import {SchemaTreeItem} from '../../../states/objects/fileTree/SchemaTreeItem';

export function byFileNameSearch(search: string): (item: SchemaTreeItem) => boolean {
    if (!search) {
        return () => true;
    }

    search = search.toLowerCase();

    return (item: SchemaTreeItem) => {
        if(item instanceof SchemaDir)
        {
            return checkDir(item, search);
        }

        return item.basename.toLowerCase().includes(search);
    };
}

function checkDir(dir: SchemaDir, search: string) : boolean
{
    const children : SchemaTreeItem[] = dir.children;
    for(let i = children.length - 1; i >= 0; i--)
    {
        const child = children[i];
        if(child instanceof SchemaDir)
        {
            if(checkDir(child, search))
            {
                return true;
            }
        }
        else if(child.basename.toLowerCase().includes(search))
        {
            return true;
        }
    }
    return false;
}