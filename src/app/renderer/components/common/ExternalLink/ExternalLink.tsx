import * as React from 'react';
import {openExternal} from '../../../../../infrastructure/openExternal';

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
        openExternal(this.props.url);
    };
}
