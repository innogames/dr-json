import {toJS} from 'mobx';
import * as React from 'react';
import {SchemaConfig} from '../../../../../../../../../domain/context/schema/SchemaConfig';
import {unique} from '../../../../../../../../../domain/helpers/value/array';
import {isEmpty} from '../../../../../../../../../domain/helpers/value/isEmpty';
import {DataEntry} from '../../../../../../../../../domain/states/objects/editor/DataEntry';
import {ArrayRenderer} from '../../../../../../jsonRenderer/ArrayRenderer';
import {BoolRenderer} from '../../../../../../jsonRenderer/BoolRenderer';
import {JsonRenderProps} from '../../../../../../jsonRenderer/JsonRenderProps';
import {NumberRenderer} from '../../../../../../jsonRenderer/NumberRenderer';
import {ObjectRenderer} from '../../../../../../jsonRenderer/ObjectRenderer';
import {StringRenderer} from '../../../../../../jsonRenderer/StringRenderer';
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
            <div className={styles.content}>
                {this.renderValue(
                    {...this.props.entry.data, id: undefined},
                    schema,
                    path,
                )}
            </div>
        );
    };

    private renderValue = (value: any, schema: any, path: string): any => {
        if (typeof value === 'undefined') {
            return null;
        }

        const schemaType = schema ? schema.type : null;
        const valueType  = typeof value;

        const renderProps: JsonRenderProps = {
            value:             value,
            schema:            schema,
            path:              path,
            renderValue:       this.renderValue,
            renderArrayItems:  this.renderArrayItems,
            renderObjectProps: this.renderObjectProps,
        };

        if (schemaType == 'object' && valueType == 'object') {
            return <ObjectRenderer {...renderProps} />;
        }

        if (schemaType == 'array' && Array.isArray(value)) {
            return <ArrayRenderer {...renderProps} />;
        }

        if (schemaType == 'boolean' && valueType === 'boolean') {
            return <BoolRenderer {...renderProps} />;
        }

        if ((schemaType == 'integer' || schemaType == 'number') && valueType === 'number') {
            return <NumberRenderer {...renderProps} />;
        }

        if (schemaType == 'string' && valueType == 'string') {
            return <StringRenderer {...renderProps} />;
        }

        if (schemaType == 'null' && value == null) {
            return null;
        }

        // fallback - value does not mach schema or there is no schema

        return (
            <span className={styles.fallback}>{value.toString()}</span>
        );
    };

    private renderArrayItems = (array: any[], schema: any, path: string): any[] => {
        let defaultItemSchema: any;
        let itemSchemas: any[] = [];

        if (Array.isArray(schema.items)) {
            defaultItemSchema = schema.additionalItems;
            itemSchemas       = schema.items;
        } else {
            defaultItemSchema = schema.items;
            itemSchemas       = [];
        }

        return array.map((value: any, idx: number) => {
            const itemSchema = itemSchemas[idx] || defaultItemSchema;
            return this.renderValue(value, itemSchema, `${path}[${idx}]`);
        });
    };

    private renderObjectProps = (obj: any, schema: any, path: string): Map<string, any> => {
        let properties: string[] = Object.keys(schema.properties);

        if (schema.additionalProperties) {
            properties = unique([...properties, ...Object.keys(obj)]);
        }

        let map: Map<string, any> = new Map<string, any>();

        properties.forEach((prop: string) => {
            let required: string[] = Array.isArray(schema.required) ? schema.required : [];

            if (isEmpty(obj[prop]) && required.indexOf(prop) < 0) {
                return;
            }

            map.set(prop, this.renderValue(
                obj[prop],
                this.getPropertySchema(schema, prop),
                `${path}.${prop}`,
            ));
        });

        return map;
    };

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
}
