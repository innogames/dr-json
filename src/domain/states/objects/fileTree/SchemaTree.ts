import {SchemaDir} from './SchemaDir';
import {SchemaFile} from './SchemaFile';
import {SchemaTreeItem} from './SchemaTreeItem';

type ItemMapper = (item: SchemaTreeItem) => SchemaTreeItem;

export class SchemaTree {
    constructor(
        public readonly children: SchemaTreeItem[],
    ) {
    }

    public map(fn: ItemMapper): SchemaTree {
        return new SchemaTree(this.mapChildren(this.children, fn));
    }

    public getFile(basename: string): SchemaFile | null {
        return this.findFileRecursive(this.children, basename);
    }

    private mapChildren(children: SchemaTreeItem[], fn: ItemMapper): SchemaTreeItem[] {
        return children.map((child: SchemaTreeItem) => {
            if (child instanceof SchemaDir) {
                let dir = child as SchemaDir;

                child = new SchemaDir(
                    dir.label,
                    dir.basename,
                    this.mapChildren(dir.children, fn),
                    dir.collapsed,
                );
            }

            return fn(child);
        });
    }

    private findFileRecursive(children: SchemaTreeItem[], basename: string): SchemaFile | null {
        for (let child of children) {
            if (child instanceof SchemaDir) {
                let found: SchemaFile | null = this.findFileRecursive((child as SchemaDir).children, basename);
                if (found) {
                    return found;
                }
            } else if (child.basename == basename) {
                return child as SchemaFile;
            }
        }

        return null;
    }
}
