export abstract class SchemaTreeItem {
    constructor(
        protected _label: string,
        protected _basename: string,
    ) {
    }

    get label(): string {
        return this._label;
    }

    get basename(): string {
        return this._basename;
    }
}
