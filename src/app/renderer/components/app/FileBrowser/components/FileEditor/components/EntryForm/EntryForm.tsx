import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {DataEntry} from '../../../../../../../../../domain/entities/editor/DataEntry';
import {SchemaConfig} from '../../../../../../../../../domain/entities/json/SchemaConfig';
import {EditorStore} from '../../../../../../../stores/editorStore';
import {SchemaStore} from '../../../../../../../stores/schemaStore';
import {SchemaForm} from '../../../../../../form/SchemaForm';

interface Props {
    schemaFile: string;
    className: string;
    entry?: DataEntry;
    onSubmit?: (entryId: string | null, entry: DataEntry) => Promise<void>;
}

interface Injected {
    schemaStore: SchemaStore;
    editorStore: EditorStore;
}

@inject('schemaStore', 'editorStore')
@observer
export class EntryForm extends React.Component<Props, {}> {

    private get injected(): Injected {
        // @ts-ignore: can not be converted
        return this.props as Injected;
    }

    render() {
        const schema: SchemaConfig | null = this.injected.schemaStore.get(this.props.schemaFile);
        if (!schema) {
            return null;
        }

        const entry: DataEntry | null = this.props.entry || null;

        const data: any = entry && entry.data ? this.props.entry!.data : {};

        return (
            <SchemaForm
                className={this.props.className}
                schema={schema.schema}
                uiSchema={schema.uiSchema}
                formData={data}
                validate={this.validate}
                onSubmit={this.onSubmit}
                onCancel={this.onClose}
            />
        );
    }

    private validate = (data: any, errors: any) => {
        let entryId: any            = typeof data.id === 'string' ? data.id.trim() : data.id;
        const isCreateMode: boolean = !this.props.entry || !this.props.entry.id;

        if (entryId
            && isCreateMode
            && this.injected.editorStore.currentFile
            && this.injected.editorStore.currentFile.getEntryById(entryId)
        ) {
            errors.id.addError(`ID "${entryId}" already exists`);
        }

        return errors;
    };

    private onSubmit = (data: any) => {
        const entryId: string | null = this.props.entry ? this.props.entry.id : null;
        let entry: DataEntry         = new DataEntry(data.id, data);

        if (this.props.onSubmit) {
            return this.props.onSubmit(entryId, entry);
        } else {
            return Promise.resolve();
        }
    };

    private onClose = () => {
        if (this.props.entry && this.props.entry.id) {
            this.props.entry.toggleEditMode(false);
        } else if (this.injected.editorStore.currentFile) {
            this.injected.editorStore.currentFile.closeCreateMode();
        }
    };
}
