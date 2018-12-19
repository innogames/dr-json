import * as React from 'react';
import Creatable from 'react-select/lib/Creatable';

interface Props {
    onChange?: (value: any | any[]) => void;
    options?: string[];
    value?: any | any[]
}

interface State {
    value?: any
}

export class Autocomplete extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.value,
        };
    }

    render() {
        return (
            <Creatable
                value={this.state.value === null ? '' : this.state.value}
                defaultValue={this.state.value}
                options={this.props.options || []}
                onChange={this.handleChange}
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