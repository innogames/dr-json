import {SchemaValidationError} from '@/entities/json/SchemaValidationError';
import Ajv from 'ajv';

let ajv = new Ajv();

export function validateJsonBySchema<D = any, S = any>(data: D, schema: S): Promise<D> {
    return new Promise((resolve, reject) => {
        let validate = ajv.compile(schema);

        if (!validate(data)) {
            reject(validate.errors.map((err: any) => {
                return new SchemaValidationError(err.dataPath, err.keyword, err.message, err.params, err.schemaPath);
            }));
            return;
        }

        resolve(data);
    });
}
