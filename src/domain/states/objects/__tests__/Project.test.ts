import 'jest';
import {SchemaTree} from '../fileTree/SchemaTree';
import {Project} from '../Project';
import {ProjectConfig} from '../ProjectConfig';

describe('Project', () => {
    it('returns directory paths', () => {
        const config = new ProjectConfig({
            name:        'Test',
            directories: {
                schemas:     'schemas',
                data:        'data',
                variantData: 'variantData',
            },
        });

        const project: Project = new Project('/path/to/root/file.json', config, new SchemaTree([]));

        expect(project.rootPath).toEqual('/path/to/root');
        expect(project.schemaPath).toEqual('/path/to/root/schemas');
        expect(project.dataPath).toEqual('/path/to/root/data');
        expect(project.variantDataPath).toEqual('/path/to/root/variantData');
    });
});