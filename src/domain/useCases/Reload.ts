import {EditorState} from '../states/EditorState';
import {SchemaFile} from '../states/objects/fileTree/SchemaFile';
import {ProjectState} from '../states/ProjectState';
import {OpenProject} from './OpenProject';
import {SelectFile} from './SelectFile';
import {SelectFileVariant} from './SelectFileVariant';

export class Reload {

    constructor(
        private editorState: EditorState,
        private projectState: ProjectState,
        private openProject: OpenProject,
        private selectFile: SelectFile,
        private selectFileVariant: SelectFileVariant,
    ) {
    }

    execute(): Promise<void> {
        let selectedFile: string;
        let selectedVariantId: string | null;

        if (this.editorState.currentFile) {
            selectedFile      = this.editorState.currentFile.filename;
            selectedVariantId = this.editorState.currentFile.variantId;
        }

        return this.openProject.execute(this.projectState.project.file)
            .then(() => {
                if (selectedFile) {
                    let file: SchemaFile | null = this.projectState.project.schemaTree.getFile(selectedFile);
                    if (file) {
                        if (selectedVariantId && file.getVariantFileById(selectedVariantId)) {
                            return this.selectFileVariant.execute(file, selectedVariantId);
                        } else {
                            return this.selectFile.execute(file);
                        }
                    }
                }

                return;
            });
    }
}
