import * as React from 'react';
import styles from './EntryWrapperStyles.scss';

interface Props {
    headline: string;
}

export class EntryWrapper extends React.PureComponent<Props, {}> {

    render() {
        return (
            <div className={styles.entry}>
                <h3>{this.props.headline}</h3>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    };
}
