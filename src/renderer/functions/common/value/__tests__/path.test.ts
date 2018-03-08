import 'jest';
import {getAbsolutePath} from '../path';

describe('getAbsolutePath()', () => {
    it('returns path relative to current dir', () => {
        expect(getAbsolutePath('some/file.txt', '/root', '/root/current'))
            .toEqual('/root/current/some/file.txt');

        expect(getAbsolutePath('./some/file.txt', '/root', '/root/current'))
            .toEqual('/root/current/some/file.txt');
    });

    it('returns path relative to base dir', () => {
        expect(getAbsolutePath('/some/file.txt', '/root', '/root/current'))
            .toEqual('/root/some/file.txt');
    });
});
