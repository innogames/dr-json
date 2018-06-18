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
import {SchemaFileVariant} from "../../../../../../../domain/states/objects/fileTree/SchemaFileVariant";
import {selectFileVariant} from "../../../../../actions/selectFileVariant";
import {openCreateVariant} from "../../../../../actions/variants/openCreateVariant";
import {IconDropdown} from "../../../../common/IconDropdown";
import {If} from "../../../../helper/If";
import {SchemaTree} from "../../../../../../../domain/states/objects/fileTree/SchemaTree";

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
                    <IconDropdown icon={Icon.FILTER}>
                        <div className={styles.dropdown}>
                            <li className={styles.dropdownContent}>
                                {
                                    this.getUniqueVariantIds().map((variantId: string, index: number) => {
                                        return (
                                            <a onClick={() => this.onVariantFilterSelected(variantId)}
                                               key={index}>{variantId}</a>
                                        );
                                    })
                                }
                            </li>
                        </div>
                    </IconDropdown>
                </FileTreeButtons>
                <If cond={this.injected.projectState.project.filter != null}>
                    <div className={styles.filter}>
                        <a title="Remove Filter" onClick={this.onResetFilter}> Filter: {this.injected.projectState.project.filter}</a>
                    </div>
                </If>
                <FileTree
                    tree={this.getFilteredTree()}
                    selectedBasename={this.injected.editorState.currentFile ? this.injected.editorState.currentFile.basename : undefined}
                    selectedVariantId={this.injected.editorState.currentFile ? this.injected.editorState.currentFile.variantId : undefined}
                    onSelectFile={this.onSelectFile}
                    onSelectFileVariant={this.onSelectFileVariant}
                    onSelectDir={this.onSelectDir}
                    onClickAddVariant={this.onClickAddVariant}
                />
            </div>
        );
    }


    private onClickAddVariant = () => {
        openCreateVariant();
    };

    private onSelectFile = (file: SchemaFile) => {
        selectFile(file.basename);
    };

    private onSelectFileVariant = (basename: string, file: SchemaFileVariant) => {
        selectFileVariant(basename, file.variantId);
    };

    private onSelectDir = (dir: SchemaDir) => {
        this.injected.projectState.project.schemaTree.forEachDir((originalDir: SchemaDir) => {
            if (originalDir.basename == dir.basename) {
                originalDir.setCollapsed(!originalDir.collapsed);
            }
        });
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

    private onVariantFilterSelected = (filter: string) => {
        this.injected.projectState.project.setFilter(filter);
    };

    private onResetFilter = () => {
        this.injected.projectState.project.setFilter(null);
    };

    private getUniqueVariantIds(): string[] {
        let treeFlat = this.injected.projectState.project.schemaTree.getFilesFlat();

        let variantList: SchemaFileVariant[] = [];
        for (let file of treeFlat) {
            variantList = [...variantList, ...file.variants];
        }

        let uniqueVariantIds: string[] = [];
        for (let variantFile of variantList) {
            uniqueVariantIds.push(variantFile.variantId);
        }

        return [...new Set(uniqueVariantIds)];
    }

    private getFilteredTree(): SchemaTree {
        if (!this.injected.projectState.project.filter) {
            return this.injected.projectState.project.schemaTree;
        }

        return this.injected.projectState.project.schemaTree.filterFiles((file: SchemaFile) => {
            return file.variants.reduce(
                (keep: boolean, variant: SchemaFileVariant) => keep || variant.variantId == this.injected.projectState.project.filter,
                false,
            );
        });
    }
}
