import {action, observable} from 'mobx';
import {SchemaFileVariant} from './SchemaFileVariant';
import {SchemaTreeItem} from './SchemaTreeItem';

export class SchemaFile extends SchemaTreeItem {
    private _variants: SchemaFileVariant[] = [];
    @observable private _isReward: boolean = false;

    constructor(
        label: string,
        basename: string,
        public readonly schemaFile: string,
        public readonly dataFile: string,
        variants: SchemaFileVariant[] = [],
        isReward: boolean = false,
    ) {
        super(label, basename);
        this._variants = variants;
        this.sortVariants();
        this._isReward = isReward;
    }

    public get isReward(): boolean {
        return this._isReward;
    }

    @action
    public setIsReward(isReward: boolean) {
        this._isReward = isReward;
    }

    get variants(): SchemaFileVariant[] {
        return this._variants;
    }

    public getVariantFileById(variantId: string): string | null {
        const variant: SchemaFileVariant | undefined = this._variants.find((v: SchemaFileVariant) => {
            return v.variantId == variantId;
        });

        return variant ? variant.variantFile : null;
    }

    @action
    public addVariant(variant: SchemaFileVariant): void {
        this._variants.push(variant);
        this.sortVariants();
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
