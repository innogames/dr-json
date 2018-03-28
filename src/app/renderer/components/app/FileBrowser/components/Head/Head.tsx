import {observer} from 'mobx-react';
import * as React from 'react';
import {packageJson} from '../../../../../../shared/package';
import styles from './HeadStyles.scss';

interface Props {
    projectName: string;
}

@observer
export class Head extends React.Component<Props, {}> {

    render() {
        return (
            <div className={styles.head}>
                <div className={styles.left}>
                    {packageJson.appName} ({this.props.projectName})
                </div>
            </div>
        );
    }
}
