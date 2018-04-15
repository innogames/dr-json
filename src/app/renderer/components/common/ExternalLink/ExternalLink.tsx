import {shell} from 'electron';
import * as React from 'react';

interface Props {
    url: string;
    className?: string;
}

export class ExternalLink extends React.PureComponent<Props, {}> {

    render() {
        return (
            <a href="#" className={this.props.className} onClick={this.onClick}>
                {this.props.children}
            </a>
        );
    };

    private onClick = (e: any) => {
        e.preventDefault();
        if (this.props.url) {
            shell.openExternal(this.props.url);
        }
    };
}
