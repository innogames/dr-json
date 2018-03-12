import {dirname, joinPath} from '../../functions/common/value/path';

export interface VariantTypeConfig {
    name: string,
    variantId: string,
    vars: {
        [prop: string]: {
            title: string,
            type: string,
            [key: string]: any,
        }
    }
}

export interface ProjectConfig {
    name: string;
    minVersion?: string;
    directories?: {
        schemas?: string,
        data?: string,
        variantData?: string,
        [name: string]: string | undefined,
    },
    variantTypes?: VariantTypeConfig[]
}

export class Project {
    file: string;

    private config: ProjectConfig;

    constructor(file: string, config: ProjectConfig) {
        this.file   = file;
        this.config = config;
    }

    get name(): string {
        return this.config.name;
    }

    get minVersion(): string {
        return this.config.minVersion || '0';
    }

    get schemaFolder(): string {
        return this.getConfigDir('schemas');
    }

    get rootFolder(): string {
        return dirname(this.file);
    }

    get dataFolder(): string {
        return this.getConfigDir('data');
    }

    get variantDataFolder(): string {
        return this.getConfigDir('variantData');
    }

    get variantTypes(): VariantTypeConfig[] {
        return this.config.variantTypes || [];
    }

    private getConfigDir(name: string): string {
        if (!this.config.directories) {
            return name;
        }

        const dir = this.config.directories[name] || name;

        return joinPath(dirname(this.file), dir);
    }
}