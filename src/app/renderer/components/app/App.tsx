import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {compareVersion} from '../../../../domain/helpers/value/version';
import {ProjectState} from '../../../../domain/states/ProjectState';
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
    projectState: ProjectState;
}

@inject('projectState')
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
        const projectState: ProjectState = this.injected.projectState;
        const appVersion                 = this.props.appVersion || '';

        if (projectState.isLoading) {
            return (
                <Outside appVersion={appVersion}><Loader/></Outside>
            );
        }

        if (!projectState.hasProject) {
            return <Welcome appVersion={appVersion} error={projectState.error || undefined}/>;
        }

        if (compareVersion(appVersion, projectState.project.config.minVersion) < 0) {
            return (
                <IncompatibleVersion
                    projectName={projectState.project.config.name}
                    appVersion={appVersion}
                    requiredVersion={projectState.project.config.minVersion}
                />
            );
        }

        return <FileBrowser appVersion={appVersion} project={projectState.project}/>;
    }
}
