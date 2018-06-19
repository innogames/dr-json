import * as React from 'react';
import {Link} from '../Link';

interface Props {
    label: string;
    onClick: () => void;
}

export class MenuItem extends React.Component<Props, {}> {
    render() {
        return (
            <li>
                <Link onClick={this.props.onClick}>{this.props.label}</Link>
            </li>
        );
    }
}