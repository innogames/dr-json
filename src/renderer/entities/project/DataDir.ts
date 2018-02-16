import {DataFile} from '@/entities/project/DataFile';
import {action, observable} from 'mobx';

export type DataFileType = DataDir | DataFile;

export class DataDir {
    @observable collapsed: boolean = false;

    constructor(
        public label: string,
        public basename: string,
        public children: DataFileType[],
        collapsed = false,
    ) {
        this.collapsed = collapsed;
    }

    get isDir(): boolean {
        return true;
    }

    @action
    setCollapsed(collapsed: boolean) {
        this.collapsed = collapsed;
    }
}
