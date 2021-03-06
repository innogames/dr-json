import {injectable} from 'inversify';
import {SchemaConfig} from './SchemaConfig';
import {SchemaValidationError, ValidationErrorData} from './SchemaValidationError';

const schemaSchema = require('../../../../schemas/data-schema.json');
const Ajv          = require('ajv');

let ajv = new Ajv();

let schemaValidator: any;
try {
    schemaValidator = ajv.compile(schemaSchema);
} catch (error) {
    throw new Error(`data-schema.schema.json is invalid: ${error}`);
}

@injectable()
export class JsonSchemaValidator {

    public validate = <D = any, S = any>(data: D, schema: S, message: string | null = null): Promise<D> => {
        const validateFn = ajv.compile(schema);

        return this.runValidator<D>(validateFn, data, message);
    };

    public validateSchema = (schema: SchemaConfig, file: string | null = null): Promise<SchemaConfig> => {
        let message: string | null = null;
        if (file) {
            message = `Schema file ${file} is invalid.`;
        }

        return this.runValidator(schemaValidator, schema, message)
            .then((schema: SchemaConfig) => {
                this.validateRequiredField(schema.schema, 'schema');
                return schema;
            });
    };

    private runValidator<D = any>(validateFn: any, data: D, message: string | null = null): Promise<D> {
        return new Promise((resolve, reject) => {
            if (!validateFn(data)) {
                let errors: ValidationErrorData[] = validateFn.errors.map((err: any): ValidationErrorData => {
                    return {
                        dataPath:   err.dataPath,
                        keyword:    err.keyword,
                        message:    err.message,
                        params:     err.params,
                        schemaPath: err.schemaPath,
                    };
                });

                reject(new SchemaValidationError(message || 'Schema validation failed.', errors));
                return;
            }

            resolve(data);
        });
    }

    private validateRequiredField(schema: any, path: string): void {
        if (schema.type == 'object') {
            if (!schema.required || !Array.isArray(schema.required)) {
                return;
            }

            const props: string[] = Object.keys(schema.properties);
            schema.required.forEach((prop: string) => {
                if (props.indexOf(prop) < 0) {
                    throw new Error(`required field contains not existing property "${prop}" in ${path}`);
                }
            });

            props.forEach((prop: string) => {
                this.validateRequiredField(schema.properties[prop], `${path}.properties.${prop}`);
            });

        } else if (schema.type == 'array') {
            if (!schema.items) {
                return;
            }

            this.validateRequiredField(schema.items, `${path}.items`);
        }
    }
}
