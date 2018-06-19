import {injectable} from 'inversify';
import {joinPath} from '../../helpers/value/path';
import {DataRepo} from '../../repositories/DataRepo';
import {DataEntries} from '../../states/objects/editor/DataEntries';
import {SchemaFile} from '../../states/objects/fileTree/SchemaFile';
import {SchemaFileVariant} from '../../states/objects/fileTree/SchemaFileVariant';
import {ProjectState} from '../../states/ProjectState';
import {SelectFileVariant} from '../fileTree/SelectFileVariant';

@injectable()
export class CreateVariant {

    constructor(
        private projectState: ProjectState,
        private dataRepo: DataRepo,
        private selectFileVariant: SelectFileVariant,
    ) {
    }

    execute(basename: string, variantId: string, copyEntries: boolean): Promise<void> {
        let promise: Promise<DataEntries>;

        let file: SchemaFile | null = this.projectState.project.schemaTree.getFile(basename);
        if (!file) {
            return Promise.reject(`tried to create variant for not existing file ${basename}`);
        }

        if (copyEntries) {
            promise = this.dataRepo.load(file.dataFile);
        } else {
            promise = Promise.resolve(new DataEntries());
        }

        return promise
            .then((entries: DataEntries) => {
                return this.createVariantFile(variantId, file as SchemaFile, entries);
            });
    }

    private createVariantFile(variantId: string, file: SchemaFile, entries: DataEntries): Promise<void> {
        const variantFile: string = joinPath(
            this.projectState.project.variantDataPath,
            variantId,
            `${file.basename}.json`,
        );

        file.addVariant(new SchemaFileVariant(variantId, variantId, variantFile));

        return this.dataRepo.save(variantFile, [...entries.all])
            .then(() => this.selectFileVariant.execute(file.basename, variantId));
    }

}