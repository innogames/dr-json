import {observer} from 'mobx-react';
import * as React from 'react';
import {packageJson} from '../../../../shared/app/package';
import {ExternalLink} from '../../common/ExternalLink';
import {Outside} from '../../layout/Outside';

import styles from './IncompatibleVersionStyles.scss';

interface Props {
    projectName: string;
    appVersion: string;
    requiredVersion: string;
}

@observer
export class IncompatibleVersion extends React.Component<Props, {}> {

    render() {
        return (
            <Outside appVersion={this.props.appVersion}>
                <h1>Outdated Version</h1>

                <div className={styles.msg}>
                    <div className={styles.err}>
                        Your Project <b>{this.props.projectName}</b> requires {packageJson.appName}
                        Version <b>{this.props.requiredVersion}</b>
                    </div>

                    (Current installed version: {this.props.appVersion})

                    <div className={styles.download}>
                        <ExternalLink url={packageJson.downloadUrl}>
                            Click here to download the new version
                        </ExternalLink>
                    </div>
                </div>
            </Outside>
        );
    }
}
