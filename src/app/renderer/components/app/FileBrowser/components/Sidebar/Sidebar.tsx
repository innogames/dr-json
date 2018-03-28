import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {openFolderExternally} from '../../../../../actions/openFolderExternally';
import {reload} from '../../../../../actions/reload';
import {selectFile} from '../../../../../actions/selectFile';
import {DataDir} from '../../../../../entities/project/DataDir';
import {DataFile} from '../../../../../entities/project/DataFile';
import {EditorStore} from '../../../../../stores/editorStore';
import {SchemaStore} from '../../../../../stores/schemaStore';
import {FileTree} from '../../../../common/FileTree';
import {FileTreeButtons} from '../../../../common/FileTreeButtons';
import {Icon} from '../../../../common/Icon';
import {Link} from '../../../../common/Link';
import styles from './SidebarStyles.scss';

interface Injected {
    schemaStore: SchemaStore;
    editorStore: EditorStore;
}

@inject('schemaStore', 'editorStore')
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
                    files={this.injected.schemaStore.files}
                    selected={this.injected.editorStore.currentFile ? this.injected.editorStore.currentFile.file : undefined}
                    onSelectFile={this.onSelectFile}
                    onSelectDir={this.onSelectDir}
                />
            </div>
        );
    }

    private onSelectFile = (file: DataFile) => {
        selectFile(file);
    };

    private onSelectDir = (dir: DataDir) => {
        dir.setCollapsed(!dir.collapsed);
    };

    private refresh = () => {
        reload();
    };

    private expandAll = () => {
        this.injected.schemaStore.forEachDir((dir: DataDir) => {
            dir.setCollapsed(false);
        });
    };

    private collapseAll = () => {
        this.injected.schemaStore.forEachDir((dir: DataDir) => {
            dir.setCollapsed(true);
        });
    };

    private openFolder = () => {
        openFolderExternally();
    };
}
