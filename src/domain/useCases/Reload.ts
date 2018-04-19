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
        let selectedBasename: string;
        let selectedVariantId: string | null;

        if (this.editorState.currentFile) {
            selectedBasename  = this.editorState.currentFile.basename;
            selectedVariantId = this.editorState.currentFile.variantId;
        }

        return this.openProject.execute(this.projectState.project.file)
            .then(() => {
                if (selectedBasename) {
                    let file: SchemaFile | null = this.projectState.project.schemaTree.getFile(selectedBasename);
                    if (file) {
                        if (selectedVariantId && file.getVariantFileById(selectedVariantId)) {
                            return this.selectFileVariant.execute(file.basename, selectedVariantId);
                        } else {
                            return this.selectFile.execute(file.basename);
                        }
                    }
                }

                return;
            });
    }
}
