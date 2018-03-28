import {SchemaConfig} from '../../entities/json/SchemaConfig';
const Ajv = require('ajv');

let ajv = new Ajv();

export function validateSchema(schema: SchemaConfig): Promise<SchemaConfig> {
    return new Promise((resolve) => {
        ajv.compile(schema.schema);

        if (!schema.schema.properties.id) {
            throw new Error('each schema must have an "id" property defined');
        }

        validateRequiredField(schema.schema, 'schema');

        resolve(schema);
    });
}

function validateRequiredField(schema: any, path: string): void {
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
            validateRequiredField(schema.properties[prop], `${path}.properties.${prop}`);
        });

    } else if (schema.type == 'array') {
        if (!schema.items) {
            return;
        }

        validateRequiredField(schema.items, `${path}.items`);
    }
}