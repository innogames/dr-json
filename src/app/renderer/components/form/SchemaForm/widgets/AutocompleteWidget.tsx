import * as React from 'react';
import { Autocomplete } from '../../Autocomplete';

export function AutocompleteWidget(props: any) {
    // See possible props here: https://github.com/mozilla-services/react-jsonschema-form#custom-widget-components

    let autocompleteConfig = props.schema['dj:autocomplete'];
    if (!autocompleteConfig || !autocompleteConfig.enum) {
        throw new Error('autocomplete config has no enum configured');
    }

    let options: any[] = [];
    let enumValues: string[] = autocompleteConfig.enum;
    if (enumValues && Array.isArray(enumValues)) {
        options = enumValues.map((value: string): any => {
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
            onChange={(option: any) => {
                props.onChange(option ? option : null);
            }}
            onCreateOption={(option: any) => {
                options.push({ label: option, value: option });
                autocompleteConfig.enum.push(option);
                props.onChange(option ? option : null);
            }}
        />
    );
}