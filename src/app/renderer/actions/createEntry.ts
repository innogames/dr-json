import {DataEntry} from '../entities/editor/DataEntry';
import {normalizeEntry} from '../functions/domain/normalizeEntry';
import {readData} from '../functions/domain/readData';
import {saveData} from '../functions/domain/saveData';
import {editorStore} from '../stores/editorStore';

export function createEntry(file: string, entry: DataEntry): Promise<void> {
    return new Promise((resolve) => {
        entry = normalizeEntry(entry);

        readData(file)
            .then((entries: DataEntry[]) => saveData(file, [...entries, entry]))
            .then((entries: DataEntry[]) => {
                if (editorStore.currentFile) {
                    editorStore.currentFile.setEntries(entries);
                }
                resolve();
            });
    });
}
