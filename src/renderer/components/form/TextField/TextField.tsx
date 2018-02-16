import * as React from 'react';
import styles from './TextFieldStyles.scss';

interface Props {
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    onPressEnter?: () => void;
    className?: string;
    maxLength?: number;
    selectAllOnFocus?: boolean;
}

export class TextField extends React.Component<Props, {}> {

    refs: {
        [key: string]: any;
        input: HTMLInputElement;
    };

    render() {
        return (
            <input
                type={this.props.type || 'text'}
                defaultValue={this.props.value}
                className={[styles.textField, this.props.className].join(' ')}
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
                onFocus={this.handleFocus}
                ref='input'
                maxLength={this.props.maxLength || null}
            />
        );
    }

    private handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && this.props.onPressEnter) {
            this.props.onPressEnter();
        }
    };

    private handleChange = (event: Event) => {
        if (this.props.onChange) {
            this.props.onChange((event.target as HTMLInputElement).value);
        }
    };

    private handleFocus = (e: any) => {
        if (this.props.selectAllOnFocus) {
            e.preventDefault();
            this.refs.input.select();
        }
    };
}
