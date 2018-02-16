import {Icon} from '@/components/common/Icon';
import * as React from 'react';
import styles from './LoaderStyles.scss';

export class Loader extends React.PureComponent<{}, {}> {

    render() {
        return (
            <span>
                <Icon value={Icon.LOADER} className={styles.loader}/>
                <span className={styles.text}>
                    Loading...
                </span>
            </span>
        );
    };
}
