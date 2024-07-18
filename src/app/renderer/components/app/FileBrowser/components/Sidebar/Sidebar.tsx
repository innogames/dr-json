import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {byVariantId} from '../../../../../../../domain/context/fileTree/filter/byVariantId';
import {EditorState} from '../../../../../../../domain/states/EditorState';
import {SchemaDir} from '../../../../../../../domain/states/objects/fileTree/SchemaDir';
import {SchemaFile} from '../../../../../../../domain/states/objects/fileTree/SchemaFile';
import {SchemaFileVariant} from '../../../../../../../domain/states/objects/fileTree/SchemaFileVariant';
import {SchemaTree} from '../../../../../../../domain/states/objects/fileTree/SchemaTree';
import {Project} from '../../../../../../../domain/states/objects/Project';
import {ProjectState} from '../../../../../../../domain/states/ProjectState';
import {collapseAllDirs} from '../../../../../actions/fileTree/collapseAllDirs';
import {expandAllDirs} from '../../../../../actions/fileTree/expandAllDirs';
import {selectFile} from '../../../../../actions/fileTree/selectFile';
import {selectFileVariant} from '../../../../../actions/fileTree/selectFileVariant';
import {toggleCollapseDir} from '../../../../../actions/fileTree/toggleCollapseDir';
import {openFolderExternally} from '../../../../../actions/openFolderExternally';
import {reload} from '../../../../../actions/project/reload';
import {openCreateVariant} from '../../../../../actions/variants/openCreateVariant';
import {getAllVariantIds} from '../../../../../queries/getAllVariantIds';
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
import {TextField} from '../../../../form/TextField';
import {searchForFileName} from '../../../../../actions/fileTree/searchForFileName';
import {searchForFileContent} from '../../../../../actions/project/searchForFileContent';

interface Injected {
    projectState: ProjectState;
    editorState: EditorState;
}

const debounce = (fn: Function, ms: number = 400) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

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
                                getAllVariantIds().map((variantId: string) => {
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
                    <TextField
                        className={styles.searchFiles}
                        placeholder='Filter by name...'
                        onChange={(value: string) => {
                            debounce(this.onSearchForFile, 500)(value);
                        }}
                    />
                    <TextField
                        className={styles.searchProject}
                        placeholder='Search for content...'
                        onPressEnter={(value: string) => {
                            this.onSearchProject(value);
                        }}
                    />
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
                    fileNameSearchText={this.injected.editorState.fileNameSearchText}
                    fileContentSearchText={this.injected.projectState.fileContentSearchText}
                />
            </div>
        );
    }


    private onClickAddVariant = () => {
        openCreateVariant();
    };

    private onSelectFile = (file: SchemaFile) => {
        selectFile(file.basename);
        if(this.injected.editorState.currentFile) {
            this.injected.editorState.currentFile.search(this.injected.projectState.fileContentSearchText);
        }
    };

    private onSelectFileVariant = (basename: string, file: SchemaFileVariant) => {
        selectFileVariant(basename, file.variantId);
        if(this.injected.editorState.currentFile) {
            this.injected.editorState.currentFile.search(this.injected.projectState.fileContentSearchText);
        }
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

    private onSearchForFile = (value: string) => {
        searchForFileName(value);
    };

    private onSearchProject = (value: string) => {
        searchForFileContent(value);
    };

    private onSelectVariantFilter = (filter: string) => {
        selectFilter(filter);
    };

    private onResetFilter = () => {
        resetFilter();
    };

    private getFilteredTree(): SchemaTree {
        const project: Project = this.injected.projectState.project;

        if (!project.filter) {
            return project.schemaTree;
        }

        return project.schemaTree.filterFiles(byVariantId(project.filter));
    }
}
