import 'jest';
import {SchemaDir} from '../SchemaDir';

describe('SchemaDir', () => {
    it('can be collapsed', () => {
        const dir = new SchemaDir('Dir', 'dir', [], false);
        expect(dir.collapsed).toEqual(false);

        dir.setCollapsed(true);
        expect(dir.collapsed).toEqual(true);
    });
});
