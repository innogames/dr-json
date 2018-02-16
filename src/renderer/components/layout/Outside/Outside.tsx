import * as React from 'react';
import styles from './OutsideStyles.scss';

interface Props {
    className?: string;
    appVersion?: string;
}

export class Outside extends React.PureComponent<Props, {}> {

    render() {
        return (
            <div className={[styles.outside, this.props.className].join(' ')}>
                <div className={styles.main}>
                    <div className={styles.center}>
                        {this.props.children}
                    </div>
                </div>
                <div className={styles.footer}>
                    v{this.props.appVersion}
                </div>
            </div>
        );
    }
}
