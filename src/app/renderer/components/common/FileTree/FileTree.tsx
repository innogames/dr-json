import {observer} from 'mobx-react';
import * as React from 'react';
import {SchemaDir} from '../../../../../domain/states/objects/fileTree/SchemaDir';
import {SchemaFile} from '../../../../../domain/states/objects/fileTree/SchemaFile';
import {SchemaTree} from '../../../../../domain/states/objects/fileTree/SchemaTree';
import {SchemaTreeItem} from '../../../../../domain/states/objects/fileTree/SchemaTreeItem';
import {If} from '../../helper/If';
import {Icon} from '../Icon';
import {Link} from '../Link';
import styles from './FileTreeStyles.scss';
import {SchemaFileVariant} from "../../../../../domain/states/objects/fileTree/SchemaFileVariant";

interface Props {
    tree: SchemaTree;
    className?: string;
    selectedBasename?: string;
    selectedVariantId?: string | null;
    onSelectFile?: (file: SchemaFile) => void;
    onSelectFileVariant?: (basename: string, file: SchemaFileVariant) => void;
    onSelectDir?: (dir: SchemaDir) => void;
    onClickAddVariant: () => void;
}

@observer
export class FileTree extends React.Component<Props> {

    render() {
        const files = this.props.tree.children.sort();

        return (
            <div className={[styles.tree, this.props.className].join(' ')}>
                <ul>
                    {files.map(this.renderItem)}
                </ul>
            </div>
        );
    };

    private renderItem = (file: SchemaTreeItem): JSX.Element => {
        return file instanceof SchemaDir ? this.renderDir(file as SchemaDir) : this.renderFile(file as SchemaFile);
    };

    private renderFile = (file: SchemaFile): JSX.Element => {
        let className: string = '';
        let icon: string = Icon.FILE_O;

        if (file.variants && file.variants.length) {
            icon = Icon.FILE_MULTIPLE;
        }

        const isSelected: boolean = !!this.props.selectedBasename && file.basename == this.props.selectedBasename;
        if (isSelected) {
            className = styles.active;
            icon = Icon.FILE;
        }

        return (
            <li key={file.basename}>
                <Link data={file} className={className} onClick={this.props.onSelectFile}>
                    <Icon value={icon} className={styles.fileIcon}/> {file.label}
                </Link>
                <If cond={isSelected}>
                    <Link onClick={this.props.onClickAddVariant}>
                        <Icon className={styles.addVariant} value={Icon.PLUS}/>
                    </Link>

                    <If cond={file.variants.length > 0}>
                        <ul>
                            {
                                file.variants.map((variant: SchemaFileVariant) => {
                                    return this.renderVariantFile(file, variant);
                                })
                            }
                        </ul>
                    </If>
                </If>
            </li>
        );
    };

    private renderVariantFile = (file: SchemaFile, variant: SchemaFileVariant) => {
        let className: string = '';
        if (this.props.selectedVariantId && variant.variantId == this.props.selectedVariantId) {
            className = styles.variantActive;
        }

        return (
            <li className={styles.variant} key={variant.variantId}>
                <Link className={className} onClick={() => {
                    this.props.onSelectFileVariant && this.props.onSelectFileVariant(file.basename, variant);
                }}>
                    {variant.label}
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
