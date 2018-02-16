import {ContentHint} from '@/components/common/ContentHint';
import {ErrorHint} from '@/components/common/ErrorHint';
import {Loader} from '@/components/common/Loader/Loader';
import {OpenFile} from '@/entities/editor/OpenFile';
import {Project} from '@/entities/project/Project';
import {EditorStore} from '@/stores/editorStore';
import {SettingsStore} from '@/stores/settingsStore';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {FileEditor} from './components/FileEditor';
import {Head} from './components/Head';
import {Sidebar} from './components/Sidebar';
import styles from './FileBrowserStyles.scss';

interface Props {
    appVersion?: string;
    project?: Project;

    editorStore?: EditorStore;
    settingsStore?: SettingsStore;
}

@inject('editorStore', 'settingsStore')
@observer
export class FileBrowser extends React.Component<Props, {}> {

    render() {
        return (
            <div className={styles.wrap}>
                <Head projectName={this.props.project.name}/>
                <div className={styles.main}>
                    <Sidebar />

                    {this.renderContent()}
                </div>
                <div className={styles.footer}>
                    v{this.props.appVersion}
                </div>
            </div>
        );
    }

    private renderContent() {
        const openFile: OpenFile = this.props.editorStore.currentFile;
        if (!openFile) {
            return (
                <ContentHint>
                    No file selected.<br/>
                    Please select a file to see it's content.
                </ContentHint>
            );
        }

        if (openFile.isLoading) {
            return <ContentHint><Loader/></ContentHint>;
        }

        if (openFile.error) {
            return <ErrorHint>{openFile.error}</ErrorHint>;
        }

        return (
            <FileEditor
                openFile={openFile}
                variantTypes={this.props.project.variantTypes}
                showFormInline={this.props.settingsStore.get().inlineForms}
            />
        );
    }
}
