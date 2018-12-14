import * as React from 'react';
import {Option, Options} from 'react-select';
import {Autocomplete} from '../../Autocomplete';

export function AutocompleteWidget(props: any) {
    // See possible props here: https://github.com/mozilla-services/react-jsonschema-form#custom-widget-components

    let options: Options = [];

    let enumValues: string[] = props.schema.options.list;
    if (enumValues && Array.isArray(enumValues)) {
        options = enumValues.map((value: string): Option => {
            return {
                label: value,
                value: value,
            };
        });
    }

    return (
        <Autocomplete
            value={props.value}
            options={options}
            onChange={(option: Option) => {
                props.onChange(option ? option.value : null);
            }}
            onNewOptionClick={(option: Option) => {
                options.push(option);
                props.schema.options.list.push(option.value);
                props.onChange(option? option.value : null);
            }}
        />
    );
}