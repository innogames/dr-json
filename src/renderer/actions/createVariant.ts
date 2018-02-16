import {selectFile} from '@/actions/selectFile';
import {DataEntry} from '@/entities/editor/DataEntry';
import {DataFile, FileVariant} from '@/entities/project/DataFile';
import {joinPath} from '@/functions/common/value/path';
import {readData} from '@/functions/domain/readData';
import {saveData} from '@/functions/domain/saveData';
import {editorStore} from '@/stores/editorStore';
import {projectStore} from '@/stores/projectStore';

export function createVariant(file: DataFile, variantId: string, copyEntries: boolean): Promise<void> {
    let promise: Promise<DataEntry[]>;

    if (copyEntries) {
        promise = readData(file.defaultVariant.file);
    } else {
        promise = Promise.resolve([]);
    }

    return promise
        .then((entries: DataEntry[]) => {
            return createVariantFile(variantId, file.basename, entries);
        });
}

function createVariantFile(variantId: string, file: string, entries: DataEntry[]): Promise<void> {
    const variantFile: string = joinPath(projectStore.current.variantDataFolder, variantId, `${file}.json`);

    let currentFile: DataFile = editorStore.currentFile.file;
    const idx: number         = currentFile.addVariant(new FileVariant(variantFile, variantId));

    return saveData(variantFile, entries)
        .then(() => {
            return selectFile(currentFile, idx);
        });
}
