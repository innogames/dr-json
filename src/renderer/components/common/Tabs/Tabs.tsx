import * as React from 'react';
import styles from './TabsStyles.scss';

export enum TabsPosition {
    TOP,
    BOTTOM
}

interface Props {
    position?: TabsPosition;
}

export class Tabs extends React.PureComponent<Props, {}> {

    render() {
        let posClass: string = styles.top;

        if (this.props.position == TabsPosition.BOTTOM) {
            posClass = styles.bottom;
        }

        return (
            <div className={[styles.tabs, posClass].join(' ')}>
                {this.props.children}
            </div>
        );
    };
}
