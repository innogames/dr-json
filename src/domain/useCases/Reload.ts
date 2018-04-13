import {EditorState} from '../states/EditorState';
import {SchemaFile} from '../states/objects/fileTree/SchemaFile';
import {ProjectState} from '../states/ProjectState';
import {OpenProject} from './OpenProject';
import {SelectFile} from './SelectFile';

export class Reload {

    constructor(
        private editorState: EditorState,
        private projectState: ProjectState,
        private openProject: OpenProject,
        private selectFile: SelectFile,
    ) {
    }

    execute(): Promise<void> {
        let selected: string;

        if (this.editorState.currentFile) {
            selected = this.editorState.currentFile.file.basename;
        }

        return this.openProject.execute(this.projectState.project.file)
            .then(() => {
                if (selected) {
                    let file: SchemaFile | null = this.projectState.project.schemaTree.getFile(selected);
                    if (file) {
                        return this.selectFile.execute(file);
                    }
                }

                return;
            });
    }
}
