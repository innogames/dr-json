import {DataRepo} from '../repositories/DataRepo';
import {EditorState} from '../states/EditorState';
import {ActiveFile} from '../states/objects/editor/ActiveFile';
import {DataEntries} from '../states/objects/editor/DataEntries';
import {SchemaFile} from '../states/objects/fileTree/SchemaFile';

export class SelectFileVariant {

    constructor(
        private editorState: EditorState,
        private dataRepo: DataRepo,
    ) {
    }

    execute(file: SchemaFile, variantId: string): Promise<void> {
        let activeFile: ActiveFile = new ActiveFile(file.basename, variantId);
        this.editorState.open(activeFile);

        const dataFile: string | null = file.getVariantFileById(variantId);
        if (!dataFile) {
            throw new Error(`tried to select not existing variant "${variantId}" in ${file.basename}`);
        }

        return this.dataRepo.load(dataFile)
            .then((entries: DataEntries) => {
                activeFile.setLoaded(entries);
            })
            .catch((error: any) => {
                activeFile.setError(error);
            });
    }
}