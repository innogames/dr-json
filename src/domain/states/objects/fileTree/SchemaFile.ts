import {SchemaFileVariant} from './SchemaFileVariant';
import {SchemaTreeItem} from './SchemaTreeItem';

export class SchemaFile extends SchemaTreeItem {
    private _variants: SchemaFileVariant[] = [];

    constructor(
        label: string,
        basename: string,
        public readonly schemaFile: string,
        public readonly dataFile: string,
        variants: SchemaFileVariant[] = [],
    ) {
        super(label, basename);
        this._variants = variants;
        this.sortVariants();
    }

    get variants(): SchemaFileVariant[] {
        return this._variants;
    }

    private sortVariants() {
        this._variants = this._variants.sort((a: SchemaFileVariant, b: SchemaFileVariant): number => {
            if (a.variantId == null) {
                return -1;
            } else if (b.variantId == null) {
                return 1;
            }
            return a.variantId < b.variantId ? -1 : 1;
        });
    }
}
