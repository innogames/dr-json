import {DataRepo} from '../repositories/DataRepo';
import {EditorState} from '../states/EditorState';
import {ActiveFile} from '../states/objects/editor/ActiveFile';
import {DataEntries} from '../states/objects/editor/DataEntries';
import {SchemaFile} from '../states/objects/fileTree/SchemaFile';

export class SelectFile {

    constructor(
        private editorState: EditorState,
        private dataRepo: DataRepo,
    ) {
    }

    execute(file: SchemaFile): Promise<void> {
        let activeFile: ActiveFile = new ActiveFile(file);
        this.editorState.open(activeFile);

        return this.dataRepo.load(file.dataFile)
            .then((entries: DataEntries) => {
                activeFile.setLoaded(entries);
            })
            .catch((error: any) => {
                activeFile.setError(error);
            });
    }
}