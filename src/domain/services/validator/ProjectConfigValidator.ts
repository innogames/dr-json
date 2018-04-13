import {errorToString} from '../../../common/errorToString';
import {ProjectConfig} from '../../states/objects/ProjectConfig';
import {JsonSchemaValidator} from './JsonSchemaValidator';

const schema = require('../../../../schemas/project-file-schema.json');

export class ProjectConfigValidator {

    constructor(
        private jsonSchemaValidator: JsonSchemaValidator,
    ) {
    }

    public validate(config: ProjectConfig): Promise<ProjectConfig> {
        return this.jsonSchemaValidator.validate(config, schema)
            .catch((error: any) => {
                throw new Error(`File is not a valid Project file. ${errorToString(error)}`);
            });
    }
}
