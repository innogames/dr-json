import * as React from 'react';
import {Icon} from '../Icon';
import styles from './ButtonStyles.scss';

interface Props {
    label?: string;
    type?: "button" | "submit" | "reset" | undefined;
    icon?: string;
    primary?: boolean;
    danger?: boolean;
    title?: string;
    disabled?: boolean
    onClick?: () => void;
}

export class Button extends React.PureComponent<Props, {}> {

    render() {
        let classes: string[] = [styles.btn];

        if (this.props.primary) {
            classes.push(styles.primary);
        } else if (this.props.danger) {
            classes.push(styles.danger);
        }
        if (!this.props.label) {
            classes.push(styles.noLabel);
        }

        return (
            <button
                type={this.props.type}
                className={classes.join(' ')}
                title={this.props.title}
                onClick={this.handleClick}
                disabled={this.props.disabled}
            >
                {this.getIcon()}
                {this.props.label}
            </button>
        );
    }

    handleClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    private getIcon() {
        if (this.props.icon) {
            return (
                <span className={styles.icon}>
                    <Icon value={this.props.icon}/>
                </span>
            );
        }

        return null;
    }
}
