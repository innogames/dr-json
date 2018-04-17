import {errorToString} from '../../helpers/errorToString';
import {ProjectConfigData} from '../../states/objects/ProjectConfig';
import {JsonSchemaValidator} from '../schema/JsonSchemaValidator';

const schema = require('../../../../schemas/project-file-schema.json');

export class ProjectConfigValidator {

    constructor(
        private jsonSchemaValidator: JsonSchemaValidator,
    ) {
    }

    public validate(config: ProjectConfigData): Promise<ProjectConfigData> {
        return this.jsonSchemaValidator.validate(config, schema)
            .catch((error: any) => {
                throw new Error(`File is not a valid Project file. ${errorToString(error)}`);
            });
    }
}
