import {SchemaConfig} from './SchemaConfig';
import {SchemaValidationError} from './SchemaValidationError';

const schemaSchema = require('../../../../schemas/data-schema.json');
const Ajv          = require('ajv');

let ajv = new Ajv();

let schemaValidator: any;
try {
    schemaValidator = ajv.compile(schemaSchema);
} catch (error) {
    throw new Error(`data-schema.schema.json is invalid: ${error}`);
}

export class JsonSchemaValidator {

    public validate = <D = any, S = any>(data: D, schema: S): Promise<D> => {
        const validateFn = ajv.compile(schema);

        return this.runValidator<D>(validateFn, data);
    };

    public validateSchema = (schema: SchemaConfig): Promise<SchemaConfig> => {
        return this.runValidator(schemaValidator, schema)
            .then((schema: SchemaConfig) => {
                this.validateRequiredField(schema.schema, 'schema');
                return schema;
            });
    };

    private runValidator<D = any>(validateFn: any, data: D): Promise<D> {
        return new Promise((resolve, reject) => {
            if (!validateFn(data)) {
                reject(validateFn.errors.map((err: any) => {
                    return new SchemaValidationError(
                        err.dataPath,
                        err.keyword,
                        err.message,
                        err.params,
                        err.schemaPath,
                    );
                }));
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
