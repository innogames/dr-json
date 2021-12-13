import {observer} from 'mobx-react';
import * as React from 'react';
import {packageJson} from '../../../../../../shared/package';
import styles from './HeadStyles.scss';

interface Props {
    projectName: string;
    version: string | undefined;
}

@observer
export class Head extends React.Component<Props, {}> {

    render() {
        return (
            <div className={styles.head}>
                <div className={styles.left}>
                    {this.props.projectName}
                </div>
                <div className={styles.right}>
                  {packageJson.appName} v{this.props.version}
                </div>
            </div>
        );
    }
}
