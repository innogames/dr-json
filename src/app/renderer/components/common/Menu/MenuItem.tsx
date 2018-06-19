import * as React from "react";

interface Props {
    label: string;
    onClick: () => void;
}

export class MenuItem extends React.Component<Props, {}> {
    render() {
        return (
            <li>
                <a onClick={this.handleClick}>{this.props.label}</a>
            </li>
        );
    }

    private handleClick = () => {
        this.props.onClick();
    };
}