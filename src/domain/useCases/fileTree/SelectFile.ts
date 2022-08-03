import {injectable} from 'inversify';
import {EntryValidator} from '../../context/data/EntryValidator';
import {DataRepo} from '../../repositories/DataRepo';
import {SchemaRepo} from '../../repositories/SchemaRepo';
import {EditorState} from '../../states/EditorState';
import {ActiveFile} from '../../states/objects/editor/ActiveFile';
import {DataEntries} from '../../states/objects/editor/DataEntries';
import {SchemaFile} from '../../states/objects/fileTree/SchemaFile';
import {ProjectState} from '../../states/ProjectState';

@injectable()
export class SelectFile {

    constructor(
        private editorState: EditorState,
        private projectState: ProjectState,
        private dataRepo: DataRepo,
        private schemaRepo: SchemaRepo,
        private entryValidator: EntryValidator,
    ) {
    }

    execute(basename: string): Promise<void> {
        let file: SchemaFile | null = this.projectState.project.schemaTree.getFile(basename);
        if (!file) {
            return Promise.reject(`tried to select not existing file ${basename}`);
        }

        let activeFile: ActiveFile = new ActiveFile(basename, file.dataFile);
        this.editorState.open(activeFile);

        return Promise.all([
            this.schemaRepo.load(file.schemaFile, this.projectState.project.schemaPath),
            this.dataRepo.load(file.dataFile),
        ])
            .then(([schema, entries]) => {
                return this.entryValidator.validate(entries.all, schema)
                    .then((entries) => {
                        activeFile.setLoaded(schema, new DataEntries(entries));
                    });
            })
            .catch((error: any) => {
                activeFile.setError(error);
            });
    }
}
