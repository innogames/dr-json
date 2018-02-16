import {SchemaForm} from '@/components/form/SchemaForm';
import {DataEntry} from '@/entities/editor/DataEntry';
import {SchemaConfig} from '@/entities/json/SchemaConfig';
import {EditorStore} from '@/stores/editorStore';
import {SchemaStore} from '@/stores/schemaStore';
import {inject, observer} from 'mobx-react';
import * as React from 'react';

interface Props {
    schemaFile: string;
    className: string;
    entry?: DataEntry;
    onSubmit?: (entryId: string | null, entry: DataEntry) => Promise<void>;

    schemaStore?: SchemaStore;
    editorStore?: EditorStore;
}

@inject('schemaStore', 'editorStore')
@observer
export class EntryForm extends React.Component<Props, {}> {

    render() {
        const schema: SchemaConfig = this.props.schemaStore.get(this.props.schemaFile);
        if (!schema) {
            return null;
        }

        const entry: DataEntry | null = this.props.entry;

        const data: any = entry && entry.data ? this.props.entry.data : {};

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
            && this.props.editorStore.currentFile.content.getById(entryId)
        ) {
            errors.id.addError(`ID "${entryId}" already exists`);
        }

        return errors;
    };

    private onSubmit = (data: any) => {
        const entryId: string = this.props.entry ? this.props.entry.id : null;
        let entry: DataEntry  = new DataEntry(data.id, data);

        if (this.props.onSubmit) {
            return this.props.onSubmit(entryId, entry);
        } else {
            return Promise.resolve();
        }
    };

    private onClose = () => {
        if (this.props.entry && this.props.entry.id) {
            this.props.entry.toggleEditMode(false);
        } else {
            this.props.editorStore.currentFile.closeCreateMode();
        }
    };
}
