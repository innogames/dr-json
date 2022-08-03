import {injectable} from 'inversify';
import {DataRepo} from '../../repositories/DataRepo';
import {SchemaRepo} from '../../repositories/SchemaRepo';
import {EditorState} from '../../states/EditorState';
import {ActiveFile} from '../../states/objects/editor/ActiveFile';
import {SchemaFile} from '../../states/objects/fileTree/SchemaFile';
import {ProjectState} from '../../states/ProjectState';

@injectable()
export class SelectFileVariant {

    constructor(
        private editorState: EditorState,
        private projectState: ProjectState,
        private dataRepo: DataRepo,
        private schemaRepo: SchemaRepo,
    ) {
    }

    execute(basename: string, variantId: string): Promise<void> {
        let file: SchemaFile | null = this.projectState.project.schemaTree.getFile(basename);
        if (!file) {
            return Promise.reject(`tried to select not existing file ${basename}`);
        }

        const dataFile: string | null = file.getVariantFileById(variantId);
        if (!dataFile) {
            throw new Error(`tried to select not existing variant "${variantId}" in ${file.basename}`);
        }

        let activeFile: ActiveFile = new ActiveFile(basename, dataFile, variantId);
        this.editorState.open(activeFile);

        return Promise.all([
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
