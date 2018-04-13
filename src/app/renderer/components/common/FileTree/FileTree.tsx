import {observer} from 'mobx-react';
import * as React from 'react';
import {DataDir, DataFileType} from '../../../entities/project/DataDir';
import {DataFile} from '../../../entities/project/DataFile';
import {If} from '../../helper/If';
import {Icon} from '../Icon';
import {Link} from '../Link';
import styles from './FileTreeStyles.scss';

interface Props {
    files: DataFileType[];
    className?: string;
    selected?: DataFile;
    onSelectFile?: (file: DataFile) => void;
    onSelectDir?: (dir: DataDir) => void;
}

@observer
export class FileTree extends React.Component<Props> {

    render() {
        return (
            <div className={[styles.tree, this.props.className].join(' ')}>
                <ul>
                    {this.props.files.map(this.renderItem)}
                </ul>
            </div>
        );
    };

    private renderItem = (file: DataFileType): JSX.Element => {
        return file.isDir ? this.renderDir(file as DataDir) : this.renderFile(file as DataFile);
    };

    private renderFile = (file: DataFile): JSX.Element => {
        let className: string = '';
        let icon: string = Icon.FILE_O;

        if (this.props.selected && file.basename == this.props.selected.basename) {
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

    private renderDir = (dir: DataDir): JSX.Element => {
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
