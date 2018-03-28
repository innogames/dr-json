import {SchemaConfig} from '../entities/json/SchemaConfig';
import {SchemaValidationError} from '../entities/json/SchemaValidationError';
const Ajv = require('ajv');

let ajv = new Ajv();

class JsonSchemaValidator {

    public validate<D = any, S = any>(data: D, schema: S): Promise<D> {
        return new Promise((resolve, reject) => {
            let validate = ajv.compile(schema);

            if (!validate(data)) {
                reject(validate.errors.map((err: any) => {
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

    public validateSchema(schema: SchemaConfig): Promise<SchemaConfig> {
        return new Promise((resolve) => {
            ajv.compile(schema.schema);

            if (!schema.schema.properties.id) {
                throw new Error('each schema must have an "id" property defined');
            }

            this.validateRequiredField(schema.schema, 'schema');

            resolve(schema);
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

export const jsonSchemaValidator = new JsonSchemaValidator();