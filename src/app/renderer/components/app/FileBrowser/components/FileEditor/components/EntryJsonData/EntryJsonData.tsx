import {toJS} from 'mobx';
import * as React from 'react';
import {SchemaConfig} from '../../../../../../../../../domain/context/schema/SchemaConfig';
import {unique} from '../../../../../../../../../domain/helpers/value/array';
import {DataEntry} from '../../../../../../../../../domain/states/objects/editor/DataEntry';
import styles from './EntryJsonDataStyles.scss';

interface Props {
    entry: DataEntry;
    schema: SchemaConfig;
}

export class EntryJsonData extends React.PureComponent<Props, {}> {

    render() {
        let path: string = '';
        let schema       = toJS(this.props.schema.schema);

        // hide id (is already displayed in entry title)
        delete schema.properties.id;

        return (
            <div className={styles.props}>
                {this.renderValue(
                    {...this.props.entry.data, id: undefined},
                    schema,
                    path,
                )}
            </div>
        );
    };

    private renderValue(value: any, schema: any, path: string) {
        if (typeof value === 'undefined') {
            return null;
        }

        const schemaType = schema ? schema.type : null;
        const valueType  = typeof value;

        if (schemaType == 'object' && valueType == 'object') {
            return this.renderObject(value, schema, path);
        }

        if (schemaType == 'array' && Array.isArray(value)) {
            return this.renderArray(value, schema, path);
        }

        if (schemaType == 'boolean' && valueType === 'boolean') {
            return this.renderBool(value);
        }

        if ((schemaType == 'integer' || schemaType == 'number') && valueType === 'number') {
            return this.renderNumber(value);
        }

        if (schemaType == 'string' && valueType == 'string') {
            return this.renderString(value);
        }

        if (schemaType == 'null' && value == null) {
            return null;
        }

        // fallback - value does not mach schema or there is no schema

        return (
            <span className={styles.fallback}>{value.toString()}</span>
        );
    }


    private renderObject(obj: any, schema: any, path: string) {
        let properties: string[] = Object.keys(schema.properties);

        if (schema.additionalProperties) {
            properties = unique([...properties, ...Object.keys(obj)]);
        }

        let rows: any[] = properties.map((prop: string) => {
            let required: string[] = Array.isArray(schema.required) ? schema.required : [];

            if (typeof obj[prop] === 'undefined' && required.indexOf(prop) < 0) {
                return null;
            }

            return (
                <tr key={prop}>
                    <th>{prop}</th>
                    <td>{this.renderValue(obj[prop], this.getPropertySchema(schema, prop), `${path}.${prop}`)}</td>
                </tr>
            );
        });

        return (
            <table>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }

    private getPropertySchema(schema: any, prop: string): any {
        let subSchema: any = schema.properties[prop];
        if (subSchema) {
            return subSchema;
        }

        if (schema.patternProperties) {
            const patterns: string[] = Object.keys(schema.patternProperties);
            for (const pattern of patterns) {
                if (prop.match(pattern)) {
                    return schema.patternProperties[pattern];
                }
            }
        }

        return schema.additionalProperties;
    }

    private renderArray(array: any[], schema: any, path: string) {
        let defaultItemSchema: any;
        let itemSchemas: any[] = [];

        if (Array.isArray(schema.items)) {
            defaultItemSchema = schema.additionalItems;
            itemSchemas       = schema.items;
        } else {
            defaultItemSchema = schema.items;
            itemSchemas       = [];
        }

        const values: any[] = array.map((value: any, idx: number) => {
            const itemSchema = itemSchemas[idx] || defaultItemSchema;
            return this.renderValue(value, itemSchema, `${path}[${idx}]`);
        });

        let isSimple: boolean = values.reduce(
            (isSimple: boolean, value: any) => isSimple && typeof value == 'string',
            true,
        );

        if (isSimple) {
            return values.join(', ');
        }

        return values.map((value: any, idx: number) => {
            return (
                <div key={idx} className={styles.arrayValue}>
                    <div className={styles.arrayIdx}>{`${path}[${idx}]`}</div>
                    <span>{value}</span>
                </div>
            );
        });
    }

    private renderBool(value: boolean) {
        return value ? 'Yes' : 'No';
    }

    private renderNumber(value: number) {
        return value.toString();
    }

    private renderString(value: string) {
        return value;
    }
}
