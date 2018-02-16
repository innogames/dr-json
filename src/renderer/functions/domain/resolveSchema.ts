import {SchemaConfig} from '@/entities/json/SchemaConfig';
import {readJsonFileSync} from '@/functions/infrastructure/fs/readJsonFile';
import {dirname, getAbsolutePath} from '@/functions/common/value/path';

export function resolveSchema(schema: SchemaConfig, currentFile: string, schemaFolder: string): Promise<SchemaConfig> {
    return new Promise((resolve, reject) => {
        if (!schema.schema) {
            reject(`schema must contain a schema property in ${currentFile}`);
            return;
        }

        resolve(mapData(schema.schema, {}, currentFile, schemaFolder));
    });
}

function mapData(schema: any, uiSchema: any, currentFile: string, schemaFolder: string): SchemaConfig {
    let refFile: string = '';
    if (schema.$ref && schema.$ref.indexOf('#') !== 0) {
        refFile = getAbsolutePath(schema.$ref, schemaFolder, dirname(currentFile));

        const refData: any = readJsonFileSync(refFile);

        schema = {...refData, ...schema};
        delete schema.$ref;
    }

    if (schema.type == 'object') {
        if (!schema.properties) {
            throw new Error('type object has no "properties" definition in ' + currentFile);
        }

        Object.keys(schema.properties).forEach((prop: string) => {
            let mapped: SchemaConfig = mapData(schema.properties[prop], {}, refFile || currentFile, schemaFolder);
            schema.properties[prop]  = mapped.schema;
            uiSchema[prop]           = mapped.uiSchema;
        });
    } else if (schema.type == 'array') {
        if (!schema.items) {
            throw new Error('type array has no "items" definition in ' + currentFile);
        }

        let mapped: SchemaConfig = mapData(schema.items, {}, refFile || currentFile, schemaFolder);
        schema.items             = mapped.schema;
        uiSchema.items           = mapped.uiSchema;
    }

    Object.keys(schema).forEach((key: string) => {
        if (key.indexOf('ui:') === 0) {
            uiSchema[key] = schema[key];
            delete schema[key];
        }
    });

    return {
        schema,
        uiSchema,
    };
}