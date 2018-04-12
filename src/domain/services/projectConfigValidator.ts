import {ProjectConfig} from '../entities/project/Project';
import {errorToString} from '../../common/errorToString';
import {jsonSchemaValidator} from './jsonSchemaValidator';

const schema = require('../../../schemas/project-file-schema.json');

class ProjectConfigValidator {
    public validate(config: ProjectConfig): Promise<ProjectConfig> {
        return jsonSchemaValidator.validate(config, schema)
            .catch((error: any) => {
                throw new Error(`File is not a valid Project file. ${errorToString(error)}`);
            });
    }
}

export const projectConfigValidator = new ProjectConfigValidator();