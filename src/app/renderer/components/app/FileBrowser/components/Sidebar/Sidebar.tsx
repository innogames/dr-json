import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {EditorState} from '../../../../../../../domain/states/EditorState';
import {SchemaDir} from '../../../../../../../domain/states/objects/fileTree/SchemaDir';
import {SchemaFile} from '../../../../../../../domain/states/objects/fileTree/SchemaFile';
import {SchemaFileVariant} from '../../../../../../../domain/states/objects/fileTree/SchemaFileVariant';
import {SchemaTree} from '../../../../../../../domain/states/objects/fileTree/SchemaTree';
import {ProjectState} from '../../../../../../../domain/states/ProjectState';
import {collapseAllDirs} from '../../../../../actions/fileTree/collapseAllDirs';
import {expandAllDirs} from '../../../../../actions/fileTree/expandAllDirs';
import {toggleCollapseDir} from '../../../../../actions/fileTree/toggleCollapseDir';
import {openFolderExternally} from '../../../../../actions/openFolderExternally';
import {reload} from '../../../../../actions/project/reload';
import {selectFile} from '../../../../../actions/fileTree/selectFile';
import {selectFileVariant} from '../../../../../actions/fileTree/selectFileVariant';
import {openCreateVariant} from '../../../../../actions/variants/openCreateVariant';
import {FileTree} from '../../../../common/FileTree';
import {FileTreeButtons} from '../../../../common/FileTreeButtons';
import {Icon} from '../../../../common/Icon';
import {IconDropdown} from '../../../../common/IconDropdown';
import {Link} from '../../../../common/Link';
import {Menu, MenuItem} from '../../../../common/Menu';
import {If} from '../../../../helper/If';
import styles from './SidebarStyles.scss';
import {selectFilter} from '../../../../../actions/fileTree/selectFilter';
import {resetFilter} from '../../../../../actions/fileTree/resetFilter';

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
                    <IconDropdown title={'Filter'} icon={Icon.FILTER}>
                        <Menu>
                            <MenuItem label={'All'} onClick={this.onResetFilter}/>
                            {
                                this.getUniqueVariantIds().map((variantId: string) => {
                                    return (
                                        <MenuItem
                                            key={variantId}
                                            label={variantId}
                                            onClick={() => {
                                                this.onSelectVariantFilter(variantId);
                                            }}
                                        />
                                    );
                                })
                            }
                        </Menu>
                    </IconDropdown>
                </FileTreeButtons>

                <If cond={this.injected.projectState.project.filter != null}>
                    <div className={styles.filter}>
                        <Link title="Remove Filter" onClick={this.onResetFilter}>
                            Filter: {this.injected.projectState.project.filter}
                        </Link>
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
        toggleCollapseDir(dir.basename);
    };

    private refresh = () => {
        reload();
    };

    private expandAll = () => {
        expandAllDirs();
    };

    private collapseAll = () => {
        collapseAllDirs();
    };

    private openFolder = () => {
        openFolderExternally();
    };

    private onSelectVariantFilter = (filter: string) => {
        selectFilter(filter);
    };

    private onResetFilter = () => {
        resetFilter();
    };

    private getUniqueVariantIds(): string[] {
        let files                         = this.injected.projectState.project.schemaTree.getFilesFlat();
        let uniqueVariantIds: Set<string> = new Set();

        for (let file of files) {
            for (let variant of file.variants) {
                uniqueVariantIds.add(variant.variantId);
            }
        }

        return [...uniqueVariantIds];
    }

    private getFilteredTree(): SchemaTree {
        if (!this.injected.projectState.project.filter) {
            return this.injected.projectState.project.schemaTree;
        }

        return this.injected.projectState.project.schemaTree.filterFiles((file: SchemaFile) => {
            return file.variants.reduce(
                (keep: boolean, variant: SchemaFileVariant) => {
                    return keep || variant.variantId == this.injected.projectState.project.filter;
                },
                false,
            );
        });
    }
}
