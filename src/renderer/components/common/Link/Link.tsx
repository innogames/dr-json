import * as React from 'react';

interface Props {
    data?: any;
    onClick?: (data: any) => void;
    className?: string;
    title?: string;
}

export class Link extends React.PureComponent<Props, {}> {

    render() {
        return (
            <a href="#" className={this.props.className} onClick={this.handleClick} title={this.props.title}>
                {this.props.children}
            </a>
        );
    };

    private handleClick = (e: any) => {
        e.preventDefault();

        if (this.props.onClick) {
            this.props.onClick(this.props.data);
        }
    };
}
