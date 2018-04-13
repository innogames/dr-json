import {SchemaDir} from './SchemaDir';
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
}
