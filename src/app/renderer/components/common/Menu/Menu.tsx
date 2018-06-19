import * as React from 'react';
import styles from './MenuStyles.scss';

export class Menu extends React.Component<{}, {}> {

    render() {
        return (
            <ul className={styles.menu}>
                {this.props.children}
            </ul>
        );
    }
}