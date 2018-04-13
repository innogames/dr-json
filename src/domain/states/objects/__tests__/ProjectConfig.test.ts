import 'jest';
import {ProjectConfig} from '../ProjectConfig';

describe('ProjectConfig', () => {
    it('returns default values for minimal config', () => {
        const config = new ProjectConfig({
            name: 'Some Name',
        });

        expect(config.name).toEqual('Some Name');
        expect(config.minVersion).toEqual('0');
        expect(config.schemaFolder).toEqual('schemas');
        expect(config.dataFolder).toEqual('data');
        expect(config.variantDataFolder).toEqual('variantData');
        expect(config.variantTypes).toEqual([]);
    });

    it('returns all configured values', () => {
        const config = new ProjectConfig({
            name:         'Some Name',
            minVersion:   '1.0.2',
            directories:  {
                schemas:     'customSchemas',
                data:        'customData',
                variantData: 'customVariantData',
            },
            variantTypes: [
                {
                    name:      'Difficulty',
                    variantId: 'mode_{difficulty}',
                    vars:      {
                        difficulty: {
                            title: 'Difficulty',
                            type:  'string',
                        },
                    },
                },
            ],
        });

        expect(config.name).toEqual('Some Name');
        expect(config.minVersion).toEqual('1.0.2');
        expect(config.schemaFolder).toEqual('customSchemas');
        expect(config.dataFolder).toEqual('customData');
        expect(config.variantDataFolder).toEqual('customVariantData');
        expect(config.variantTypes).toEqual([
            {
                name:      'Difficulty',
                variantId: 'mode_{difficulty}',
                vars:      {
                    difficulty: {
                        title: 'Difficulty',
                        type:  'string',
                    },
                },
            },
        ]);
    });
});