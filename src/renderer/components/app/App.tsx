import {FileBrowser} from '@/components/app/FileBrowser';
import {IncompatibleVersion} from '@/components/app/IncompatibleVersion';
import {Welcome} from '@/components/app/Welcome';
import {Loader} from '@/components/common/Loader/Loader';
import {Outside} from '@/components/layout/Outside';
import {Window} from '@/components/layout/Window';
import {compareVersion} from '@/functions/common/value/version';
import {ProjectStore} from '@/stores/projectStore';
import {inject, observer} from 'mobx-react';
import * as React from 'react';

interface Props {
    appVersion?: string;

    projectStore?: ProjectStore;
}

@inject('projectStore')
@observer
export class App extends React.Component<Props, {}> {

    render() {
        return (
            <Window>
                {this.renderChild()}
            </Window>
        );
    }

    renderChild() {
        const projectStore: ProjectStore = this.props.projectStore;

        if (projectStore.isLoading) {
            return (
                <Outside appVersion={this.props.appVersion}><Loader/></Outside>
            );
        }

        if (!projectStore.hasCurrent) {
            return <Welcome appVersion={this.props.appVersion} error={projectStore.error}/>;
        }

        if (compareVersion(this.props.appVersion, projectStore.current.minVersion) < 0) {
            return (
                <IncompatibleVersion
                    projectName={projectStore.current.name}
                    appVersion={this.props.appVersion}
                    requiredVersion={projectStore.current.minVersion}
                />
            );
        }

        return <FileBrowser appVersion={this.props.appVersion} project={projectStore.current}/>;
    }
}
