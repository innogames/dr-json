import {action, observable} from 'mobx';
import {SchemaTreeItem} from './SchemaTreeItem';

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
        this._children  = children;
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
