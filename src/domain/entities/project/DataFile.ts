import {action, observable} from 'mobx';

export class DataFile {
    @observable variants: FileVariant[];
    @observable currentVariantIdx: number;

    constructor(
        public label: string,
        public basename: string,
        public schemaFile: string,
        variants: FileVariant[],
        variantIdx: number = 0,
    ) {
        this.variants          = variants;
        this.currentVariantIdx = variantIdx < variants.length ? variantIdx : 0;
        this.sortVariants();
    }

    get isDir(): boolean {
        return false;
    }

    get allVariants(): FileVariant[] {
        return this.variants;
    }

    get defaultVariant(): FileVariant {
        return this.variants[0];
    }

    get currentVariant(): FileVariant {
        return this.variants[this.currentVariantIdx];
    }

    @action
    addVariant(variant: FileVariant): number {
        this.variants.push(variant);
        this.sortVariants();
        return this.variants.indexOf(variant);
    }

    private sortVariants() {
        this.variants = this.variants.sort((a: FileVariant, b: FileVariant): number => {
            if (a.id == null) {
                return -1;
            } else if (b.id == null) {
                return 1;
            }
            return a.id < b.id ? -1 : 1;
        });
    }
}

export class FileVariant {
    constructor(
        public file: string,
        public id: string | null = null,
    ) {
    }
}