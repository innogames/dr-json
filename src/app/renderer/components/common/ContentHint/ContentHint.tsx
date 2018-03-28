import * as React from 'react';
import styles from './ContentHintStyles.scss';

export class ContentHint extends React.PureComponent<{}, {}> {

    render() {
        return (
            <div className={styles.hintWrapper}>
                <div className={styles.hint}>
                    {this.props.children}
                </div>
            </div>
        );
    };
}
