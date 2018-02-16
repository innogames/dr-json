import {SchemaConfig} from '@/entities/json/SchemaConfig';
import {resolveSchema} from '@/functions/domain/resolveSchema';
import {validateSchema} from '@/functions/domain/validateSchema';
import {readJsonFile} from '@/functions/infrastructure/fs/readJsonFile';

export function loadSchema(file: string, schemaFolder: string): Promise<SchemaConfig> {
    return readJsonFile<SchemaConfig>(file)
        .then((schema: SchemaConfig) => resolveSchema(schema, file, schemaFolder))
        .then((schema: SchemaConfig) => validateSchema(schema));
}
