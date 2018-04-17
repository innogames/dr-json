import {observer} from 'mobx-react';
import * as React from 'react';
import {SchemaDir} from '../../../../../domain/states/objects/fileTree/SchemaDir';
import {SchemaFile} from '../../../../../domain/states/objects/fileTree/SchemaFile';
import {SchemaTreeItem} from '../../../../../domain/states/objects/fileTree/SchemaTreeItem';
import {If} from '../../helper/If';
import {Icon} from '../Icon';
import {Link} from '../Link';
import styles from './FileTreeStyles.scss';
import {SchemaTree} from '../../../../../domain/states/objects/fileTree/SchemaTree';

interface Props {
    tree: SchemaTree;
    className?: string;
    selectedFilename?: string;
    onSelectFile?: (file: SchemaFile) => void;
    onSelectDir?: (dir: SchemaDir) => void;
}

@observer
export class FileTree extends React.Component<Props> {

    render() {
        return (
            <div className={[styles.tree, this.props.className].join(' ')}>
                <ul>
                    {this.props.tree.children.map(this.renderItem)}
                </ul>
            </div>
        );
    };

    private renderItem = (file: SchemaTreeItem): JSX.Element => {
        return file instanceof SchemaDir ? this.renderDir(file as SchemaDir) : this.renderFile(file as SchemaFile);
    };

    private renderFile = (file: SchemaFile): JSX.Element => {
        let className: string = '';
        let icon: string      = Icon.FILE_O;

        if (this.props.selectedFilename && file.basename == this.props.selectedFilename) {
            className = styles.active;
            icon      = Icon.FILE;
        }

        return (
            <li key={file.basename}>
                <Link data={file} className={className} onClick={this.props.onSelectFile}>
                    <Icon value={icon} className={styles.fileIcon}/> {file.label}
                </Link>
            </li>
        );
    };

    private renderDir = (dir: SchemaDir): JSX.Element => {
        let icon: string = Icon.FOLDER;
        if (dir.collapsed) {
            icon = Icon.FOLDER_COLLAPSED;
        }

        return (
            <li key={dir.basename}>
                <Link data={dir} className={styles.folderIcon} onClick={this.props.onSelectDir}>
                    <Icon value={icon} className={styles.folderIcon}/> {dir.label}
                </Link>
                <If cond={!dir.collapsed}>
                    <ul>
                        {dir.children.map(this.renderItem)}
                    </ul>
                </If>
            </li>
        );
    };
}
