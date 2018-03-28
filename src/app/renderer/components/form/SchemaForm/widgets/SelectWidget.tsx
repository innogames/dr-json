import * as React from 'react';
import {Option, Options} from 'react-select';
import {Select} from '../../Select';

export function SelectWidget(props: any) {
    // See possible props here: https://github.com/mozilla-services/react-jsonschema-form#custom-widget-components

    let options: Options = [];

    let enumValues: string[] = props.schema.enum;
    if (enumValues && Array.isArray(enumValues)) {
        options = enumValues.map((value: string): Option => {
            return {
                label: value,
                value: value,
            };
        });
    }

    return (
        <Select
            value={props.value}
            options={options}
            disabled={props.disabled}
            onChange={(option: Option) => {
                props.onChange(option ? option.value : null);
            }}
        />
    );
}