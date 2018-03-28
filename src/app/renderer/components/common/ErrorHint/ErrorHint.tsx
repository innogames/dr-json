import * as React from 'react';
import styles from './ErrorHintStyles.scss';

export class ErrorHint extends React.PureComponent<{}, {}> {

    render() {
        return (
            <div className={styles.error}>
                {this.props.children}
            </div>
        );
    };
}
