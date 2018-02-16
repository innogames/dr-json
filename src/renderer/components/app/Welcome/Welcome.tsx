import {openSelectProject} from '@/actions/openSelectProject';
import {Button} from '@/components/common/Button';
import {If} from '@/components/helper/If';
import {Outside} from '@/components/layout/Outside';
import {observer} from 'mobx-react';
import * as React from 'react';

import styles from './WelcomeStyles.scss';

interface Props {
    appVersion?: string;
    error?: string;
}

@observer
export class Welcome extends React.Component<Props, {}> {

    render() {
        return (
            <Outside appVersion={this.props.appVersion} className={styles.welcome}>
                <h1>Welcome to Dr. Json!</h1>
                <p>
                    Please select the file <strong>dr.json</strong> in your project.
                </p>

                <Button label='Open Project' onClick={this.handleOpenFolder}/>

                <If cond={!!this.props.error}>
                    <div className={styles.error}>
                        {this.props.error}
                    </div>
                </If>
            </Outside>
        );
    }

    private handleOpenFolder = () => {
        openSelectProject();
    };
}
