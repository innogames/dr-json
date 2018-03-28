import * as React from 'react';
import styles from './SideWindowStyles.scss';

export class SideWindowHeadline extends React.PureComponent<{}, {}> {

    render() {
        return (
            <h3 className={styles.headline}>
                {this.props.children}
            </h3>
        );
    };
}
