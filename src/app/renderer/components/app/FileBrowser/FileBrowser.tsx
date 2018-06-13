import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {EditorState} from '../../../../../domain/states/EditorState';
import {ActiveFile} from '../../../../../domain/states/objects/editor/ActiveFile';
import {Project} from '../../../../../domain/states/objects/Project';
import {SettingsState} from '../../../../../domain/states/SettingsState';
import {ContentHint} from '../../common/ContentHint';
import {ErrorHint} from '../../common/ErrorHint';
import {Loader} from '../../common/Loader';
import {FileEditor} from './components/FileEditor';
import {Head} from './components/Head';
import {Sidebar} from './components/Sidebar';
import styles from './FileBrowserStyles.scss';

interface Props {
    appVersion?: string;
    project: Project;
}

interface Injected {
    editorState: EditorState;
    settingsState: SettingsState;
}

@inject('editorState', 'settingsState')
@observer
export class FileBrowser extends React.Component<Props, {}> {

    private get injected(): Injected {
        // @ts-ignore: can not be converted
        return this.props as Injected;
    }

    render() {
        return (
            <div className={styles.wrap}>
                <Head projectName={this.props.project.config.name}/>
                <div className={styles.main}>
                    <Sidebar/>

                    {this.renderContent()}
                </div>
                <div className={styles.footer}>
                    v{this.props.appVersion}
                </div>
            </div>
        );
    }

    private renderContent() {
        const activeFile: ActiveFile | null = this.injected.editorState.currentFile;
        if (!activeFile) {
            return (
                <ContentHint>
                    No file selected.<br/>
                    Please select a file to see it's content.
                </ContentHint>
            );
        }

        if (activeFile.isLoading) {
            return <ContentHint><Loader/></ContentHint>;
        }

        if (activeFile.error) {
            return <ErrorHint error={activeFile.error}/>;
        }

        return (
            <FileEditor
                activeFile={activeFile}
                variantTypes={this.props.project.config.variantTypes}
                isAddVariantMode={this.injected.editorState.isAddVariantMode}
                showFormInline={this.injected.settingsState.globalSettings.inlineForms}
            />
        );
    }
}
