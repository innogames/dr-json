import * as React from 'react';
import ReactSelect from 'react-select';

interface Props {
    placeholder?: string;
    disabled?: boolean;
    onChange?: (value: any | any[]) => void;
    options?: any[];
    sort?: boolean;
    clearable?: boolean;
}

export class Select extends React.Component<Props, {}> {

    render() {
        return (
            <ReactSelect
                placeholder={this.props.placeholder || ''}
                isDisabled={this.props.disabled}
                options={this.props.options || []}
                onChange={this.props.onChange}
                noOptionsMessage={() => this.props.placeholder || ''}
                isClearable={this.props.clearable}
            />
        );
    }
}
