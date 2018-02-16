import {basename} from '@/functions/common/value/path';
import {filterEmpty} from '@/functions/common/value/array';

export class FileInfo {
    constructor(
        public readonly path: string,
        public readonly isDir: boolean,
        public readonly children: FileInfo[],
    ) {
    }

    public get filename() {
        return basename(this.path);
    }

    public filterFiles(regex: RegExp | string): FileInfo | null {
        return this.filter((child: FileInfo) => {
            return child.isDir || !!child.path.match(regex);
        });
    }

    public filterEmptyDirs(): FileInfo | null {
        return this.filter((child: FileInfo) => {
            return !child.isDir || child.children.length > 0;
        });
    }

    public getAllFiles(): FileInfo[] {
        let files: FileInfo[] = [];

        if (this.isDir) {
            this.children.forEach((child: FileInfo) => {
                files.push(...child.getAllFiles());
            });
        } else {
            files.push(this);
        }

        return files;
    }

    public map<R>(fn: (file: FileInfo, children: R[]) => R | null): R {
        let children: R[] = [];

        if (this.isDir) {
            children = this.children
                .map((child: FileInfo) => {
                    return child.map(fn);
                })
                .filter(filterEmpty);
        }

        return fn(this, children);
    }

    private filter(fn: (child: FileInfo) => boolean): FileInfo | null {
        if (!fn(this)) {
            return null;
        }

        let children: FileInfo[] = this.children
            .map((child: FileInfo) => {
                return child.filter(fn);
            })
            .filter(filterEmpty);

        return new FileInfo(this.path, this.isDir, children);
    }
}