import * as React from 'react';
import Creatable from 'react-select/lib/Creatable';

interface Props {
    onChange?: (value: any | any[]) => void;
    options?: string[];
}

export class Autocomplete extends React.Component<Props, {}> {
    render() {
        return (
            <Creatable
                options={this.props.options || []}
                onChange={this.props.onChange}
            />
        );
    }
}
