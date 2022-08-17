import * as React from 'react';
import ReactSelect from 'react-select';

interface SelectValue {
    value: any;
    label: string;
}

interface Props {
    placeholder?: string;
    value?: SelectValue | SelectValue[];
    disabled?: boolean;
    onChange?: (value: any | any[]) => void;
    options?: any[];
    sort?: boolean;
}

interface State {
    value?: any;
}

export class Select extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.value,
        };
    }

    render() {
        return (
            <ReactSelect
                placeholder={this.props.placeholder || ''}
                isDisabled={this.props.disabled}
                options={this.props.options || []}
                onChange={this.handleChange}
                isClearable={true}
                defaultValue={this.state.value}
            />
        );
    }

    private handleChange = (value: any | any[]) => {
        this.setState(() => ({value: value}));

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };
}
