import * as React from 'react';
import styles from './IconStyles.scss';

interface Props {
    value: string;
    className?: string;
    color?: Colors;
    onClick?: () => void;
}

enum Colors {
    Danger = styles.colorDanger
}

export class Icon extends React.Component<Props, {}> {

    static LOADER           = 'loader';
    static PLUS             = 'plus';
    static ARROW_DOWN       = 'arrow-down';
    static ARROW_UP         = 'arrow-up';
    static MENU             = 'menu';
    static EDIT             = 'edit';
    static REMOVE           = 'remove';
    static COPY             = 'copy';
    static RELOAD           = 'reload';
    static FOLDER           = 'folder';
    static FOLDER_COLLAPSED = 'folder-collapsed';
    static FILE             = 'file';
    static FILE_O           = 'file-o';
    static VALIDATE         = 'validate';
    static CROSSHAIRS       = 'crosshairs';
    static EXPAND           = 'expand';
    static COLLAPSE         = 'collapse';
    static PIN              = 'pin';
    static EXTERNAL_LINK    = 'external-link';
    static WARNING          = 'warning';

    static Colors = Colors;

    render() {
        let classNames = [
            'icon',
            `icon-${this.props.value}`,
            this.props.className,
            this.props.color,
        ];

        return (
            <span
                className={classNames.join(' ')}
                onClick={this.handleClick}
            />
        );
    }

    handleClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    };
}
