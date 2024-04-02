import {observer} from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {byError} from '../../../../../../../domain/context/data/filter/byError';
import {bySearch} from '../../../../../../../domain/context/data/filter/bySearch';
import {ActiveFile} from '../../../../../../../domain/states/objects/editor/ActiveFile';
import {DataEntry, EntryId} from '../../../../../../../domain/states/objects/editor/DataEntry';
import {VariantTypeConfig} from '../../../../../../../domain/states/objects/ProjectConfig';
import {closeEditEntry} from '../../../../../actions/entries/closeEditEntry';
import {confirmDeleteEntry} from '../../../../../actions/entries/confirmDeleteEntry';
import {createEntry} from '../../../../../actions/entries/createEntry';
import {openCreateEntry} from '../../../../../actions/entries/openCreateEntry';
import {searchInFile} from '../../../../../actions/entries/searchInFile';
import {toggleCollapseEntries} from '../../../../../actions/entries/toggleCollapseEntries';
import {updateEntry} from '../../../../../actions/entries/updateEntry';
import {closeCreateVariant} from '../../../../../actions/variants/closeCreateVariant';
import {createVariant} from '../../../../../actions/variants/createVariant';
import {ContentHint} from '../../../../common/ContentHint';
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
    variantTypes: VariantTypeConfig[];
    isAddVariantMode?: boolean;
    showFormInline?: boolean;
}

interface State {
    showErrorsOnly: boolean;
}

@observer
export class FileEditor extends React.Component<Props, State> {

    private isCreateMode: boolean = false;

    // @ts-ignore: has no initializer
    refs: {
        createForm: EntryForm,
        container: Element
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            showErrorsOnly: false,
        };
    }

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
        entries                  = entries.filter(bySearch(this.props.activeFile.searchText));
        let hasErrors: boolean   = this.props.activeFile.entries.hasErrors();

        return (
            <div className={styles.editor}>
                <Toolbar
                    onClickAdd={this.onClickAdd}
                    onSearch={this.onSearch}
                    onCollapseAll={this.onCollapseAll}
                    onExpandAll={this.onExpandAll}
                    hasErrors={hasErrors}
                    onToggleErrors={this.onToggleErrors}
                />

                <div className={styles.entries} ref="container" id="editorContainer">
                    {this.renderEntries(entries, hasErrors)}
                    {this.renderSidebarEditForm(entries)}
                    {this.renderCreate()}
                </div>

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

    private renderEntries(entries: DataEntry[], hasErrors: boolean) {
        if (entries.length === 0 && !this.props.activeFile.isCreateMode) {
            return (
                <ContentHint>Empty</ContentHint>
            );
        }

        if (hasErrors && this.state.showErrorsOnly) {
            entries = entries.filter(byError);
        }

        return entries.map(this.renderEntry);
    }

    private renderEntry = (entry: DataEntry, idx: number) => {
        if (entry.editMode && this.props.showFormInline) {
            return (
                <EntryWrapper key={idx} headline={entry.id === 0 ? '0' : entry.id as string || ''}>
                    {this.renderEditForm(entry, styles.inlineForm)}
                </EntryWrapper>
            );
        }

        return (
            <Entry
                key={idx}
                entry={entry}
                schema={this.props.activeFile.schema}
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
            closeEditEntry();
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

    private onCreateVariant = (variantId: string, copyEntries: boolean): Promise<void> => {
        return createVariant(this.props.activeFile.basename, variantId, copyEntries);
    };

    private onCloseVariantWindow = () => {
        closeCreateVariant();
    };

    private scrollToCreateForm = () => {
        let container: Element = ReactDOM.findDOMNode(this.refs.container) as Element;
        let form: Element      = ReactDOM.findDOMNode(this.refs.createForm) as Element;
        if (container && form) {
            container.scrollTop = container.scrollHeight - form.scrollHeight;
        }
    };

    private scrollToBottom = () => {
        let container: Element = ReactDOM.findDOMNode(this.refs.container) as Element;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    };

    private onCollapseAll = () => {
        toggleCollapseEntries(true);
    };

    private onExpandAll = () => {
        toggleCollapseEntries(false);
    };

    private onToggleErrors = () => {
        this.setState(() => ({showErrorsOnly: !this.state.showErrorsOnly}));
    };
}
