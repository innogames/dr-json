import {SchemaDir, sortTreeChildren} from './SchemaDir';
import {SchemaFile} from './SchemaFile';
import {SchemaTreeItem} from './SchemaTreeItem';

type ItemMapper = (item: SchemaTreeItem) => SchemaTreeItem;
export type FileFilterFn = (file: SchemaFile) => boolean;

export class SchemaTree {
    private _children: SchemaTreeItem[];

    constructor(
        children: SchemaTreeItem[],
    ) {
        this._children = sortTreeChildren(children);
    }

    public get children(): SchemaTreeItem[] {
        return this._children;
    }

    public map(fn: ItemMapper): SchemaTree {
        return new SchemaTree(this.mapChildren(this._children, fn));
    }

    public getFilesFlat(): SchemaFile[] {
        return this._children.reduce(this.reduceFiles, []);
    }

    public getFile(basename: string): SchemaFile | null {
        return this.findFileRecursive(this._children, basename);
    }

    public forEachDir(fn: (dir: SchemaDir) => void): void {
        this.forEachDirRecursive(this._children, fn);
    }

    public forEachFile(fn: (file: SchemaFile) => void): void {
        this.forEachFileRecursive(this._children, fn);
    }

    private reduceFiles = (value: SchemaFile[], child: SchemaTreeItem): SchemaFile[] => {
        if (child instanceof SchemaFile) {
            return [...value, child];
        } else {
            return (child as SchemaDir).children.reduce(this.reduceFiles, value);
        }
    };

    public filterFiles(filterFn: FileFilterFn): SchemaTree {
        return new SchemaTree(this.filterChildren(this._children, filterFn));
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

    private forEachDirRecursive(children: SchemaTreeItem[], fn: (dir: SchemaDir) => void): void {
        for (let child of children) {
            if (child instanceof SchemaDir) {
                const dir: SchemaDir = child as SchemaDir;
                this.forEachDirRecursive(dir.children, fn);
                fn(dir);
            }
        }
    }

    private forEachFileRecursive(children: SchemaTreeItem[], fn: (dir: SchemaFile) => void): void {
        for (const child of children) {
            if (child instanceof SchemaDir) {
                const dir: SchemaDir = child as SchemaDir;
                this.forEachFileRecursive(dir.children, fn);
            }
            else if (child instanceof SchemaFile) {
                const file: SchemaFile = child as SchemaFile;
                fn(file);
            }
        }
    }

    private filterChildren(children: SchemaTreeItem[], filterFn: FileFilterFn): SchemaTreeItem[] {
        return children
            .map((child: SchemaTreeItem): SchemaTreeItem | null => {
                if (child instanceof SchemaFile) {
                    return filterFn(child) ? child : null;
                }

                let dir = child as SchemaDir;

                const newChildren: SchemaTreeItem[] = this.filterChildren(dir.children, filterFn);
                if (newChildren.length == 0) {
                    return null;
                }

                return new SchemaDir(
                    dir.label,
                    dir.basename,
                    newChildren,
                    dir.collapsed,
                );
            })
            .filter((child: SchemaTreeItem | null) => child != null) as SchemaTreeItem[];
    }
}
