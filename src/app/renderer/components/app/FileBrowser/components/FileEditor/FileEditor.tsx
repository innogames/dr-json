import {observer} from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {filterEntriesBySearch} from '../../../../../../../domain/context/data/filterEntriesBySearch';
import {ActiveFile} from '../../../../../../../domain/states/objects/editor/ActiveFile';
import {DataEntry, EntryId} from '../../../../../../../domain/states/objects/editor/DataEntry';
import {SchemaFileVariant} from '../../../../../../../domain/states/objects/fileTree/SchemaFileVariant';
import {VariantTypeConfig} from '../../../../../../../domain/states/objects/ProjectConfig';
import {confirmDeleteEntry} from '../../../../../actions/entries/confirmDeleteEntry';
import {createEntry} from '../../../../../actions/entries/createEntry';
import {openCreateEntry} from '../../../../../actions/entries/openCreateEntry';
import {searchInFile} from '../../../../../actions/entries/searchInFile';
import {updateEntry} from '../../../../../actions/entries/updateEntry';
import {selectFile} from '../../../../../actions/selectFile';
import {selectFileVariant} from '../../../../../actions/selectFileVariant';
import {closeCreateVariant} from '../../../../../actions/variants/closeCreateVariant';
import {createVariant} from '../../../../../actions/variants/createVariant';
import {openCreateVariant} from '../../../../../actions/variants/openCreateVariant';
import {ContentHint} from '../../../../common/ContentHint';
import {Tab, Tabs, TabsPosition} from '../../../../common/Tabs';
import {If} from '../../../../helper/If';
import {SideWindow} from '../../../../layout/SideWindow';
import {Entry} from './components/Entry';
import {EntryForm} from './components/EntryForm';
import {EntryWrapper} from './components/EntryWrapper';
import {Toolbar} from './components/Toolbar';
import {VariantWindow} from './components/VariantWindow';
import styles from './FileEditorStyles.scss';

interface Props {
    activeFile: ActiveFile;
    fileVariants: SchemaFileVariant[];
    variantTypes: VariantTypeConfig[];
    isAddVariantMode?: boolean;
    showFormInline?: boolean;
}

@observer
export class FileEditor extends React.Component<Props, {}> {

    private isCreateMode: boolean = false;

    // @ts-ignore: has no initializer
    refs: {
        createForm: EntryForm,
        container: Element
    };

    componentDidUpdate() {
        if (this.props.showFormInline
            && this.props.activeFile.isCreateMode
            && this.props.activeFile.isCreateMode != this.isCreateMode
        ) {
            this.scrollToCreateForm();
        }
        this.isCreateMode = this.props.activeFile.isCreateMode;
    }

    render() {
        let entries: DataEntry[] = this.props.activeFile.entries.all;
        entries                  = filterEntriesBySearch(entries, this.props.activeFile.searchText);

        return (
            <div className={styles.editor}>
                <Toolbar
                    onClickAdd={this.onClickAdd}
                    onSearch={this.onSearch}
                />

                <div className={styles.entries} ref="container">
                    {this.renderEntries(entries)}

                    {this.renderSidebarEditForm(entries)}
                    {this.renderCreate()}
                </div>

                <Tabs position={TabsPosition.BOTTOM}>
                    <Tab
                        active={!this.props.activeFile.variantId}
                        onClick={() => {
                            this.onSelectDefaultVariant();
                        }}
                    >
                        Default
                    </Tab>
                    {this.props.fileVariants.map((variant: SchemaFileVariant) => {
                        return (
                            <Tab
                                key={variant.variantId}
                                active={variant.variantId == this.props.activeFile.variantId}
                                onClick={() => {
                                    this.onSelectVariant(variant.variantId);
                                }}
                            >
                                {variant.label}
                            </Tab>
                        );
                    })}
                    <Tab onClick={this.onClickAddVariant}>+</Tab>
                </Tabs>

                <If cond={this.props.isAddVariantMode}>
                    <VariantWindow
                        variantTypes={this.props.variantTypes}
                        onSubmit={this.onCreateVariant}
                        onClose={this.onCloseVariantWindow}
                    />
                </If>
            </div>
        );
    }

    private renderEntries(entries: DataEntry[]) {
        if (entries.length === 0 && !this.props.activeFile.isCreateMode) {
            return (
                <ContentHint>Empty</ContentHint>
            );
        }

        return entries.map(this.renderEntry);
    }

    private renderEntry = (entry: DataEntry, idx: number) => {
        if (entry.editMode && this.props.showFormInline) {
            return (
                <EntryWrapper key={idx} headline={entry.id as string || ''}>
                    {this.renderEditForm(entry, styles.inlineForm)}
                </EntryWrapper>
            );
        }

        return (
            <Entry
                key={idx}
                entry={entry}
                onClickEdit={this.onClickEdit}
                onClickDelete={this.onClickDelete}
                onClickCopy={this.onClickCopy}
            />
        );
    };

    private renderSidebarEditForm(entries: DataEntry[]) {
        if (this.props.showFormInline) {
            return null;
        }

        for (const entry of entries) {
            if (entry.editMode) {
                return (
                    <SideWindow className={styles.sidebar} hideOverlay>
                        <h1>Edit: {entry.id}</h1>
                        {this.renderEditForm(entry, styles.sidebarForm)}
                    </SideWindow>
                );
            }
        }

        return null;
    }

    private renderCreate() {
        if (!this.props.activeFile.isCreateMode) {
            return null;
        }

        if (!this.props.showFormInline) {
            return (
                <SideWindow className={styles.sidebar} hideOverlay>
                    <h1>New Entry</h1>
                    {this.renderCreateForm(styles.sidebarForm)}
                </SideWindow>
            );
        }

        return (
            <EntryWrapper headline='New Entry'>
                {this.renderCreateForm(styles.inlineForm)}
            </EntryWrapper>
        );
    }

    private renderCreateForm(className: string) {
        return (
            <EntryForm
                ref="createForm"
                key='new'
                className={className}
                activeFile={this.props.activeFile}
                entry={this.props.activeFile.createModeEntry || undefined}
                onSubmit={this.onSubmitCreateForm}
            />
        );
    }

    private renderEditForm(entry: DataEntry, className: string) {
        return (
            <EntryForm
                className={className}
                activeFile={this.props.activeFile}
                entry={entry}
                onSubmit={this.onSubmitEditForm}
            />
        );
    }

    private onSearch = (value: string) => {
        searchInFile(value);
    };

    private onClickAdd = (): void => {
        if (!this.props.showFormInline) {
            this.props.activeFile.entries.all.forEach((entry: DataEntry) => {
                entry.toggleEditMode(false);
            });
        }
        openCreateEntry();
    };

    private onClickEdit = (entry: DataEntry): void => {
        entry.toggleEditMode(true);
    };

    private onClickDelete = (entry: DataEntry): void => {
        confirmDeleteEntry(this.props.activeFile.dataFile, entry.id!);
    };

    private onClickCopy = (entry: DataEntry): void => {
        openCreateEntry(entry);
    };

    private onSubmitEditForm = (entryId: EntryId | null, entry: DataEntry): Promise<void> => {
        return updateEntry(this.props.activeFile.dataFile, entryId, entry);
    };

    private onSubmitCreateForm = (_entryId: EntryId | null, entry: DataEntry): Promise<void> => {
        return createEntry(this.props.activeFile.dataFile, entry)
            .then(() => {
                if (!this.props.showFormInline) {
                    this.scrollToBottom();
                }
            });
    };

    private onClickAddVariant = () => {
        openCreateVariant();
    };

    private onCreateVariant = (variantId: string, copyEntries: boolean): Promise<void> => {
        return createVariant(this.props.activeFile.basename, variantId, copyEntries);
    };

    private onCloseVariantWindow = () => {
        closeCreateVariant();
    };

    private onSelectDefaultVariant = () => {
        selectFile(this.props.activeFile.basename);
    };

    private onSelectVariant = (variantId: string) => {
        selectFileVariant(this.props.activeFile.basename, variantId);
    };

    private scrollToCreateForm = () => {
        let container: Element = ReactDOM.findDOMNode(this.refs.container);
        let form: Element      = ReactDOM.findDOMNode(this.refs.createForm);
        if (container && form) {
            container.scrollTop = container.scrollHeight - form.scrollHeight;
        }
    };

    private scrollToBottom = () => {
        let container: Element = ReactDOM.findDOMNode(this.refs.container);
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    };
}
