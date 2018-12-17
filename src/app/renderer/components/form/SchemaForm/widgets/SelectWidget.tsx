import * as React from 'react';
import { Select } from '../../Select';

export function SelectWidget(props: any) {
    // See possible props here: https://github.com/mozilla-services/react-jsonschema-form#custom-widget-components

    let options: any[] = [];

    let enumValues: string[] = props.schema.enum;
    if (enumValues && Array.isArray(enumValues)) {
        options = enumValues.map((value: string): any => {
            return {
                label: value,
                value: value,
            };
        });
    }

    return (
        <Select
            options={options}
            disabled={props.disabled}
            onChange={(option: any) => {
                props.onChange(option ? option.value : null);
            }}
        />
    );
}