import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {EditorState} from '../../../../../../../domain/states/EditorState';
import {SchemaDir} from '../../../../../../../domain/states/objects/fileTree/SchemaDir';
import {SchemaFile} from '../../../../../../../domain/states/objects/fileTree/SchemaFile';
import {ProjectState} from '../../../../../../../domain/states/ProjectState';
import {openFolderExternally} from '../../../../../actions/openFolderExternally';
import {reload} from '../../../../../actions/reload';
import {selectFile} from '../../../../../actions/selectFile';
import {FileTree} from '../../../../common/FileTree';
import {FileTreeButtons} from '../../../../common/FileTreeButtons';
import {Icon} from '../../../../common/Icon';
import {Link} from '../../../../common/Link';
import styles from './SidebarStyles.scss';

interface Injected {
    projectState: ProjectState;
    editorState: EditorState;
}

@inject('projectState', 'editorState')
@observer
export class Sidebar extends React.Component<{}, {}> {

    private get injected(): Injected {
        return this.props as Injected;
    }

    render() {
        return (
            <div className={styles.sidebar}>
                <FileTreeButtons>
                    <Link title='Refresh' onClick={this.refresh}><Icon value={Icon.RELOAD}/></Link>
                    <Link title='Expand All' onClick={this.expandAll}><Icon value={Icon.EXPAND}/></Link>
                    <Link title='Collapse All' onClick={this.collapseAll}><Icon value={Icon.COLLAPSE}/></Link>
                    <Link title='Open folder' onClick={this.openFolder}><Icon value={Icon.EXTERNAL_LINK}/></Link>
                </FileTreeButtons>
                <FileTree
                    tree={this.injected.projectState.project.schemaTree}
                    selectedFilename={this.injected.editorState.currentFile ? this.injected.editorState.currentFile.filename : undefined}
                    onSelectFile={this.onSelectFile}
                    onSelectDir={this.onSelectDir}
                />
            </div>
        );
    }

    private onSelectFile = (file: SchemaFile) => {
        selectFile(file.basename);
    };

    private onSelectDir = (dir: SchemaDir) => {
        dir.setCollapsed(!dir.collapsed);
    };

    private refresh = () => {
        reload();
    };

    private expandAll = () => {
        this.injected.projectState.project.schemaTree.forEachDir((dir: SchemaDir) => {
            dir.setCollapsed(false);
        });
    };

    private collapseAll = () => {
        this.injected.projectState.project.schemaTree.forEachDir((dir: SchemaDir) => {
            dir.setCollapsed(true);
        });
    };

    private openFolder = () => {
        openFolderExternally();
    };
}
