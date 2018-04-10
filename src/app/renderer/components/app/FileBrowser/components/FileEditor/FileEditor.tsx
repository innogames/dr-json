import {observer} from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {confirmDeleteEntry} from '../../../../../actions/confirmDeleteEntry';
import {createEntry} from '../../../../../actions/createEntry';
import {createVariant} from '../../../../../actions/createVariant';
import {openCreateEntry} from '../../../../../actions/openCreateEntry';
import {searchInFile} from '../../../../../actions/searchInFile';
import {selectFile} from '../../../../../actions/selectFile';
import {updateEntry} from '../../../../../actions/updateEntry';
import {DataEntry} from '../../../../../../../domain/entities/editor/DataEntry';
import {OpenFile} from '../../../../../../../domain/entities/editor/OpenFile';
import {FileVariant} from '../../../../../../../domain/entities/project/DataFile';
import {VariantTypeConfig} from '../../../../../../../domain/entities/project/Project';
import {filterEntriesBySearch} from '../../../../../../../domain/data/filter/filterEntriesBySearch';
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
    openFile: OpenFile;
    variantTypes: VariantTypeConfig[];
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
            && this.props.openFile.isCreateMode
            && this.props.openFile.isCreateMode != this.isCreateMode
        ) {
            this.scrollToCreateForm();
        }
        this.isCreateMode = this.props.openFile.isCreateMode;
    }

    render() {
        let entries: DataEntry[] = this.props.openFile.entries;
        entries                  = filterEntriesBySearch(entries, this.props.openFile.searchText);

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
                    {this.props.openFile.file.variants.map((variant: FileVariant, idx: number) => {
                        return (
                            <Tab
                                key={variant.id || 'default'}
                                active={idx == this.props.openFile.file.currentVariantIdx}
                                onClick={() => {
                                    this.onSelectVariant(idx);
                                }}
                            >
                                {variant.id || 'Default'}
                            </Tab>
                        );
                    })}
                    <Tab onClick={this.onClickAddVariant}>+</Tab>
                </Tabs>

                <If cond={this.props.openFile.isAddVariantMode}>
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
        if (entries.length === 0 && !this.props.openFile.isCreateMode) {
            return (
                <ContentHint>Empty</ContentHint>
            );
        }

        return entries.map(this.renderEntry);
    }

    private renderEntry = (entry: DataEntry, idx: number) => {
        if (entry.editMode && this.props.showFormInline) {
            return (
                <EntryWrapper key={idx} headline={entry.id || ''}>
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
        if (!this.props.openFile.isCreateMode) {
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
                schemaFile={this.props.openFile.file.schemaFile}
                entry={this.props.openFile.createByEntry || undefined}
                onSubmit={this.onSubmitCreateForm}
            />
        );
    }

    private renderEditForm(entry: DataEntry, className: string) {
        return (
            <EntryForm
                className={className}
                schemaFile={this.props.openFile.file.schemaFile}
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
            this.props.openFile.entries.forEach((entry: DataEntry) => {
                entry.toggleEditMode(false);
            });
        }
        openCreateEntry();
    };

    private onClickEdit = (entry: DataEntry): void => {
        entry.toggleEditMode(true);
    };

    private onClickDelete = (entry: DataEntry): void => {
        confirmDeleteEntry(this.props.openFile.file.currentVariant.file, entry.id!);
    };

    private onClickCopy = (entry: DataEntry): void => {
        openCreateEntry(entry);
    };

    private onSubmitEditForm = (entryId: string | null, entry: DataEntry): Promise<void> => {
        return updateEntry(this.props.openFile.file.currentVariant.file, entryId, entry);
    };

    private onSubmitCreateForm = (_entryId: string | null, entry: DataEntry): Promise<void> => {
        return createEntry(this.props.openFile.file.currentVariant.file, entry)
            .then(() => {
                if (!this.props.showFormInline) {
                    this.scrollToBottom();
                }
            });
    };

    private onClickAddVariant = () => {
        this.props.openFile.openAddVariant();
    };

    private onCreateVariant = (variantId: string, copyEntries: boolean): Promise<void> => {
        return createVariant(this.props.openFile.file, variantId, copyEntries);
    };

    private onCloseVariantWindow = () => {
        this.props.openFile.closeAddVariant();
    };

    private onSelectVariant = (idx: number) => {
        selectFile(this.props.openFile.file, idx);
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
