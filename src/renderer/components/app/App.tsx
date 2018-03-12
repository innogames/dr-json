import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {compareVersion} from '../../functions/common/value/version';
import {ProjectStore} from '../../stores/projectStore';
import {Loader} from '../common/Loader/Loader';
import {Outside} from '../layout/Outside';
import {Window} from '../layout/Window';
import {FileBrowser} from './FileBrowser';
import {IncompatibleVersion} from './IncompatibleVersion';
import {Welcome} from './Welcome';

interface Props {
    appVersion?: string;
}

interface Injected {
    projectStore: ProjectStore;
}

@inject('projectStore')
@observer
export class App extends React.Component<Props, {}> {

    private get injected(): Injected {
        return this.props as Injected;
    }

    render() {
        return (
            <Window>
                {this.renderChild()}
            </Window>
        );
    }

    renderChild() {
        const projectStore: ProjectStore = this.injected.projectStore;
        const appVersion                 = this.props.appVersion || '';

        if (projectStore.isLoading) {
            return (
                <Outside appVersion={appVersion}><Loader/></Outside>
            );
        }

        if (!projectStore.hasCurrent) {
            return <Welcome appVersion={appVersion} error={projectStore.error || undefined}/>;
        }

        if (compareVersion(appVersion, projectStore.current.minVersion) < 0) {
            return (
                <IncompatibleVersion
                    projectName={projectStore.current.name}
                    appVersion={appVersion}
                    requiredVersion={projectStore.current.minVersion}
                />
            );
        }

        return <FileBrowser appVersion={appVersion} project={projectStore.current!}/>;
    }
}
