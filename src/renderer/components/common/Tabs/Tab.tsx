import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './TabsStyles.scss';

interface Props {
    active?: boolean
    onClick?: () => void;
}

export class Tab extends React.PureComponent<Props, {}> {

    componentDidMount() {
        if (this.props.active) {
            this.scrollToTab();
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (!prevProps.active && this.props.active) {
            this.scrollToTab();
        }
    }

    render() {
        let classes: string[] = [styles.tab];

        if (this.props.active) {
            classes.push(styles.active);
        }

        return (
            <a href="#" className={classes.join(' ')} onClick={this.handleClick}>
                {this.props.children}
            </a>
        );
    };

    private handleClick = (e: any) => {
        e.preventDefault();

        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    private scrollToTab(): void {
        const tabNode: HTMLElement = ReactDOM.findDOMNode(this) as HTMLElement;
        const parent: HTMLElement  = tabNode.parentElement as HTMLElement;
        if (tabNode && parent) {
            parent.scrollLeft = tabNode.offsetLeft - parent.offsetLeft;
        }
    }
}
