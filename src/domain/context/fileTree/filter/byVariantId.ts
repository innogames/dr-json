import {SchemaFile} from '../../../states/objects/fileTree/SchemaFile';
import {SchemaFileVariant} from '../../../states/objects/fileTree/SchemaFileVariant';
import {FileFilterFn} from '../../../states/objects/fileTree/SchemaTree';

export function byVariantId(variantId: string): FileFilterFn {
    if (!variantId) {
        return () => true;
    }

    return (file: SchemaFile): boolean => {
        return file.variants.some((variant: SchemaFileVariant) => {
            return variant.variantId == variantId;
        });
    };
}