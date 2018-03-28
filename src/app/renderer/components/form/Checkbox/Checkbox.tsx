import * as React from 'react';

let idCount = 0;

interface Props {
    label: string;
    disabled?: boolean;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

export class Checkbox extends React.Component<Props, {}> {

    private uniqueId: string;

    constructor(props: Props) {
        super(props);
        this.uniqueId = 'checkbox-' + (idCount++);
    }

    render() {
        return (
            <div>
                <input
                    id={this.uniqueId}
                    type='checkbox'
                    defaultChecked={this.props.checked}
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                />
                <label htmlFor={this.uniqueId}>{this.props.label}</label>
            </div>
        );
    }

    private handleChange = (event: any) => {
        if (this.props.onChange) {
            this.props.onChange(event.target.checked);
        }
    };
}
