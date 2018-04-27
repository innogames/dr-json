import {action, observable} from 'mobx';
import {SchemaTreeItem} from './SchemaTreeItem';

export function sortTreeChildren(children: SchemaTreeItem[]): SchemaTreeItem[] {
    return children.sort((a: SchemaTreeItem, b: SchemaTreeItem): number => {
        const aIsDir = a instanceof SchemaDir;
        const bIsDir = b instanceof SchemaDir;
        if (aIsDir && !bIsDir) {
            return -1;
        }
        if (!aIsDir && bIsDir) {
            return 1;
        }
        return a.basename.localeCompare(a.basename);
    });
}

export class SchemaDir extends SchemaTreeItem {
    private _children: SchemaTreeItem[]     = [];
    @observable private _collapsed: boolean = false;

    constructor(
        label: string,
        basename: string,
        children: SchemaTreeItem[],
        collapsed = false,
    ) {
        super(label, basename);
        this._children  = sortTreeChildren(children);
        this._collapsed = collapsed;
    }

    public get children(): SchemaTreeItem[] {
        return this._children;
    }

    public get collapsed(): boolean {
        return this._collapsed;
    }

    @action
    public setCollapsed(collapsed: boolean) {
        this._collapsed = collapsed;
    }
}
