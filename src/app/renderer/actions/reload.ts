import {DataFileType} from '../../../domain/entities/project/DataDir';
import {DataFile} from '../../../domain/entities/project/DataFile';
import {editorStore} from '../stores/editorStore';
import {projectStore} from '../stores/projectStore';
import {schemaStore} from '../stores/schemaStore';
import {openProject} from './openProject';
import {selectFile} from './selectFile';

export function reload(): Promise<void> {
    let selected: string;
    let variantIdx: number = 0;

    if (editorStore.currentFile) {
        selected   = editorStore.currentFile.file.basename;
        variantIdx = editorStore.currentFile.file.currentVariantIdx;
        editorStore.currentFile.closeCreateMode();
    }

    return openProject(projectStore.current.file)
        .then(() => {
            if (selected) {
                let file: DataFileType | null = schemaStore.findFile(selected);
                if (file) {
                    return selectFile(file as DataFile, variantIdx);
                }
            }

            return Promise.resolve();
        });

}