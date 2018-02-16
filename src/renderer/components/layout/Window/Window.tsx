import * as React from 'react';
import styles from './WindowStyles.scss';

export class Window extends React.PureComponent<{}, {}> {

    render() {
        return (
            <div className={styles.win}>
                {this.props.children}
            </div>
        );
    }
}
