import {ExternalLink} from '@/components/common/ExternalLink';
import {If} from '@/components/helper/If';
import {Outside} from '@/components/layout/Outside';
import {getDownloadUrl} from '@/functions/app/getDownloadUrl';
import {observer} from 'mobx-react';
import * as React from 'react';

import styles from './IncompatibleVersionStyles.scss';

interface Props {
    projectName: string;
    appVersion: string;
    requiredVersion: string;
}

@observer
export class IncompatibleVersion extends React.Component<Props, {}> {

    render() {
        const downloadUrl: string = getDownloadUrl();

        return (
            <Outside appVersion={this.props.appVersion}>
                <h1>Outdated Version</h1>

                <div className={styles.msg}>
                    <div className={styles.err}>
                        Your Project <b>{this.props.projectName}</b> requires Dr. Json
                        Version <b>{this.props.requiredVersion}</b>
                    </div>

                    (Current installed version: {this.props.appVersion})

                    <If cond={downloadUrl != ''}>
                        <div className={styles.download}>
                            <ExternalLink url={downloadUrl}>Click here to download the new version</ExternalLink>
                        </div>
                    </If>
                </div>
            </Outside>
        );
    }
}
