import 'jest';
import {FileInfo} from '../FileInfo';

describe('FileInfo', () => {
    describe('filename', () => {
        it('returns name of file', () => {
            let file = new FileInfo('path/to/file.txt', false, []);

            expect(file.filename).toEqual('file.txt');
        });
    });

    describe('filterFiles()', () => {
        it('returns filtered files', () => {
            let file = new FileInfo('dir', true, [
                new FileInfo('dir/fileA.txt', false, []),
                new FileInfo('dir/fileB.txt', false, []),
                new FileInfo('dir/sub', true, [
                    new FileInfo('dir/sub/fileC.txt', false, []),
                    new FileInfo('dir/sub/foo.json', false, []),
                ]),
                new FileInfo('dir/sub/bar.json', false, []),
                new FileInfo('dir/sub/fileE.txt', false, []),
            ]);

            let expected = new FileInfo('dir', true, [
                new FileInfo('dir/fileA.txt', false, []),
                new FileInfo('dir/fileB.txt', false, []),
                new FileInfo('dir/sub', true, [
                    new FileInfo('dir/sub/fileC.txt', false, []),
                ]),
                new FileInfo('dir/sub/fileE.txt', false, []),
            ]);

            expect(file.filterFiles(/\.txt/)).toEqual(expected);
        });
    });

    describe('filterEmptyDirs()', () => {
        it('returns no empty dirs', () => {
            let file = new FileInfo('root', true, [
                new FileInfo('root/first', true, [
                    new FileInfo('root/first/1.txt', false, []),
                    new FileInfo('root/first/2.txt', false, []),
                ]),
                new FileInfo('root/second', true, []),
                new FileInfo('root/third', true, [
                    new FileInfo('root/third/1.txt', false, []),
                ]),
            ]);

            let expected = new FileInfo('root', true, [
                new FileInfo('root/first', true, [
                    new FileInfo('root/first/1.txt', false, []),
                    new FileInfo('root/first/2.txt', false, []),
                ]),
                new FileInfo('root/third', true, [
                    new FileInfo('root/third/1.txt', false, []),
                ]),
            ]);

            expect(file.filterEmptyDirs()).toEqual(expected);
        });
    });

    describe('getAllFiles()', () => {
        it('returns list of files', () => {
            let file = new FileInfo('root', true, [
                new FileInfo('root/first', true, [
                    new FileInfo('root/first/1.txt', false, []),
                    new FileInfo('root/first/2.txt', false, []),
                ]),
                new FileInfo('root/second', true, []),
                new FileInfo('root/third', true, [
                    new FileInfo('root/third/1.txt', false, []),
                ]),
            ]);

            expect(file.getAllFiles()).toEqual([
                new FileInfo('root/first/1.txt', false, []),
                new FileInfo('root/first/2.txt', false, []),
                new FileInfo('root/third/1.txt', false, []),
            ]);
        });
    });

    describe('map()', () => {
        it('returns mapped files', () => {
            let file = new FileInfo('root', true, [
                new FileInfo('root/first', true, [
                    new FileInfo('root/first/1.txt', false, []),
                    new FileInfo('root/first/2.txt', false, []),
                ]),
                new FileInfo('root/second', true, []),
            ]);

            const fn = (file: FileInfo, children: any[]) => {
                return {
                    path:     file.path,
                    children: children,
                };
            };

            expect(file.map<any>(fn)).toEqual({
                path:     'root',
                children: [
                    {
                        path:     'root/first',
                        children: [
                            {path: 'root/first/1.txt', children: []},
                            {path: 'root/first/2.txt', children: []},
                        ],
                    },
                    {
                        path:     'root/second',
                        children: [],
                    },
                ],
            });
        });
    });
});