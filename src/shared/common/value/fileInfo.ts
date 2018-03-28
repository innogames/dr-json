import {isSet} from './isSet';
import {basename} from './path';

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

    public filterFiles(regex: RegExp | string): FileInfo {
        const res: FileInfo | null = this.filter((child: FileInfo) => {
            return child.isDir || !!child.path.match(regex);
        });

        return res || new FileInfo(this.path, this.isDir, []);
    }

    public filterEmptyDirs(): FileInfo {
        const res: FileInfo | null = this.filter((child: FileInfo) => {
            return !child.isDir || child.children.length > 0;
        });

        return res || new FileInfo(this.path, this.isDir, []);
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

    public map<R>(fn: (file: FileInfo, children: R[]) => R): R {
        let children: R[] = [];

        if (this.isDir) {
            children = this.children
                .map((child: FileInfo) => {
                    return child.map(fn);
                })
                .filter(isSet);
        }

        return fn(this, children);
    }

    private filter(fn: (child: FileInfo) => boolean): FileInfo | null {
        if (!fn(this)) {
            return null;
        }

        let children: FileInfo[] = this.children
            .map((child: FileInfo) => {
                return child.filter(fn) as FileInfo;
            })
            .filter(isSet);

        return new FileInfo(this.path, this.isDir, children);
    }
}