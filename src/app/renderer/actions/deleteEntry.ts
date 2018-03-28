import {DataEntry} from '../entities/editor/DataEntry';
import {readData} from '../functions/domain/readData';
import {saveData} from '../functions/domain/saveData';
import {editorStore} from '../stores/editorStore';

export function deleteEntry(file: string, entryId: string): Promise<void> {
    return new Promise((resolve) => {
        readData(file)
            .then((entries: DataEntry[]) => entries.filter((entry: DataEntry) => {
                return entry.id != entryId;
            }))
            .then((entries: DataEntry[]) => saveData(file, entries))
            .then((entries: DataEntry[]) => {
                if (editorStore.currentFile && editorStore.currentFile.content) {
                    editorStore.currentFile.content.set(entries);
                }
                resolve();
            });
    });
}
