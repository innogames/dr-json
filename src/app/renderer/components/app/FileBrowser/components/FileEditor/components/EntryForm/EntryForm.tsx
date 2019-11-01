import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import * as React from 'react';
import {SchemaConfig} from '../../../../../../../../../domain/context/schema/SchemaConfig';
import {trim} from '../../../../../../../../../domain/helpers/value/trim';
import {ActiveFile} from '../../../../../../../../../domain/states/objects/editor/ActiveFile';
import {DataEntry, EntryId} from '../../../../../../../../../domain/states/objects/editor/DataEntry';
import {closeCreateEntry} from '../../../../../../../actions/entries/closeCreateEntry';
import {SchemaForm} from '../../../../../../form/SchemaForm';

interface Props {
    activeFile: ActiveFile;
    className: string;
    entry?: DataEntry;
    onSubmit?: (entryId: EntryId | null, entry: DataEntry) => Promise<void>;
}

@observer
export class EntryForm extends React.Component<Props, {}> {

    render() {
        const entry: DataEntry | null = this.props.entry || null;

        const data: any            = entry && entry.data ? this.props.entry!.data : {};
        const schema: SchemaConfig = toJS(this.props.activeFile.schema);

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

        if ((entryId || entryId === 0)
            && isCreateMode
            && this.props.activeFile.entries.getById(entryId)
        ) {
            errors.id.addError(`ID "${entryId}" already exists`);
        }

        return errors;
    };

    private onSubmit = (data: any) => {
        const entryId: EntryId | null = this.props.entry ? this.props.entry.id : null;

        let entry: DataEntry = new DataEntry(trim(data.id), trim(data, true));

        if (this.props.onSubmit) {
            return this.props.onSubmit(entryId, entry);
        } else {
            return Promise.resolve();
        }
    };

    private onClose = () => {
        if (this.props.entry && (this.props.entry.id || this.props.entry.id === 0)) {
            this.props.entry.toggleEditMode(false);
        } else {
            closeCreateEntry();
        }
    };
}
