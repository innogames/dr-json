import {errorToString} from '../../../shared/common/errorToString';
import {ProjectConfig} from '../../entities/project/Project';
import {validateJsonBySchema} from './validateJsonBySchema';

const schema = require('../../project.schema.json');

export function validateProjectConfig(config: ProjectConfig): Promise<ProjectConfig> {
    return validateJsonBySchema(config, schema)
        .catch((error: any) => {
            throw new Error(`File is not a valid Project file. ${errorToString(error)}`);
        });
}