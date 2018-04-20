import {ActiveFile} from '../../../../domain/states/objects/editor/ActiveFile';
import {DataEntry} from '../../../../domain/states/objects/editor/DataEntry';

export function toggleCollapseEntries(activeFile: ActiveFile, collapsed: boolean): void {
    activeFile.entries.all.map((entry: DataEntry) => {
        entry.setCollapsed(collapsed);
    });
}