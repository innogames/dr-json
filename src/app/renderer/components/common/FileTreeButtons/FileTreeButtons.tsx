import * as React from 'react';
import styles from './FileTreeButtonsStyles.scss';

export class FileTreeButtons extends React.Component<{}, {}> {

    render() {
        return (
            <div className={styles.buttons}>
                {this.props.children}
            </div>
        );
    };
}
