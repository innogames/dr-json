import {SchemaConfig} from '../../entities/json/SchemaConfig';
import {readJsonFile} from '../infrastructure/fs/readJsonFile';
import {resolveSchema} from './resolveSchema';
import {validateSchema} from './validateSchema';

export function loadSchema(file: string, schemaFolder: string): Promise<SchemaConfig> {
    return readJsonFile<SchemaConfig>(file)
        .then((schema: SchemaConfig) => resolveSchema(schema, file, schemaFolder))
        .then((schema: SchemaConfig) => validateSchema(schema));
}
