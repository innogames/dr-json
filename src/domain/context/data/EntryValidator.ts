import {DataEntry} from '../../states/objects/editor/DataEntry';
import {JsonSchemaValidator} from '../schema/JsonSchemaValidator';
import {SchemaConfig} from '../schema/SchemaConfig';

export class EntryValidator {

    constructor(
        private jsonSchemaValidator: JsonSchemaValidator,
    ) {

    }

    public validate(entries: DataEntry[], schema: SchemaConfig): Promise<DataEntry[]> {
        return Promise.all(
            entries.map((entry: DataEntry) => {
                return this.jsonSchemaValidator.validate(
                    entry.data,
                    schema.schema,
                    `Entry #${entry.id} is invalid`,
                )
                    .then(() => entry)
                    .catch((error) => {
                        entry.setError(error);
                        return entry;
                    });
            }),
        )
            .then(([...entries]) => entries);
    }
}
