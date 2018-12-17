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
            options={options}
            onChange={(option: {value: string, label: string}) => {
                props.onChange(option ? option.value : null);

                if (enumValues.indexOf(option.value) < 0) {
                    options.push({ label: option.value, value: option.value });
                    autocompleteConfig.enum.push(option.value);
                }
            }}
        />
    );
}