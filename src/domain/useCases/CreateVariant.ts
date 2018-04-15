import {toJS} from 'mobx';
import {joinPath} from '../helpers/value/path';
import {DataRepo} from '../repositories/DataRepo';
import {DataEntries} from '../states/objects/editor/DataEntries';
import {SchemaFile} from '../states/objects/fileTree/SchemaFile';
import {SchemaFileVariant} from '../states/objects/fileTree/SchemaFileVariant';
import {ProjectState} from '../states/ProjectState';
import {SelectFileVariant} from './SelectFileVariant';

export class CreateVariant {

    constructor(
        private projectState: ProjectState,
        private dataRepo: DataRepo,
        private selectFileVariant: SelectFileVariant,
    ) {
    }

    execute(file: SchemaFile, variantId: string, copyEntries: boolean): Promise<void> {
        let promise: Promise<DataEntries>;

        if (copyEntries) {
            promise = this.dataRepo.load(file.dataFile);
        } else {
            promise = Promise.resolve(new DataEntries());
        }

        return promise
            .then((entries: DataEntries) => {
                return this.createVariantFile(variantId, file, entries);
            });
    }

    private createVariantFile(variantId: string, file: SchemaFile, entries: DataEntries): Promise<void> {
        const variantFile: string = joinPath(
            this.projectState.project.variantDataPath,
            variantId,
            `${file.basename}.json`,
        );

        file.addVariant(new SchemaFileVariant(variantId, variantId, variantFile));

        return this.dataRepo.save(variantFile, toJS(entries.all))
            .then(() => this.selectFileVariant.execute(file, variantId));
    }

}