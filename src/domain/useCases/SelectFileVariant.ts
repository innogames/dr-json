import {SchemaConfig} from '../context/schema/SchemaConfig';
import {DataRepo} from '../repositories/DataRepo';
import {SchemaRepo} from '../repositories/SchemaRepo';
import {EditorState} from '../states/EditorState';
import {ActiveFile} from '../states/objects/editor/ActiveFile';
import {DataEntries} from '../states/objects/editor/DataEntries';
import {SchemaFile} from '../states/objects/fileTree/SchemaFile';
import {ProjectState} from '../states/ProjectState';

export class SelectFileVariant {

    constructor(
        private editorState: EditorState,
        private projectState: ProjectState,
        private dataRepo: DataRepo,
        private schemaRepo: SchemaRepo,
    ) {
    }

    execute(filename: string, variantId: string): Promise<void> {
        let activeFile: ActiveFile = new ActiveFile(filename, variantId);
        this.editorState.open(activeFile);

        let file: SchemaFile | null = this.projectState.project.schemaTree.getFile(filename);
        if (!file) {
            return Promise.reject(`tried to select not existing file ${filename}`);
        }

        const dataFile: string | null = file.getVariantFileById(variantId);
        if (!dataFile) {
            throw new Error(`tried to select not existing variant "${variantId}" in ${file.basename}`);
        }

        return Promise.all<SchemaConfig, DataEntries>([
            this.schemaRepo.load(file.schemaFile, this.projectState.project.schemaPath),
            this.dataRepo.load(dataFile),
        ])
            .then(([schema, entries]) => {
                activeFile.setLoaded(schema, entries);
            })
            .catch((error: any) => {
                activeFile.setError(error);
            });
    }
}