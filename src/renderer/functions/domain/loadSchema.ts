import {jsonFile} from '../../../shared/infrastructure/jsonFile';
import {SchemaConfig} from '../../entities/json/SchemaConfig';
import {resolveSchema} from './resolveSchema';
import {validateSchema} from './validateSchema';

export function loadSchema(file: string, schemaFolder: string): Promise<SchemaConfig> {
    return jsonFile.read<SchemaConfig>(file)
        .then((schema: SchemaConfig) => resolveSchema(schema, file, schemaFolder))
        .then((schema: SchemaConfig) => validateSchema(schema));
}
