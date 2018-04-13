export interface ProjectConfigData {
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

export class ProjectConfig {

    constructor(
        private configData: ProjectConfigData,
    ) {
    }

    get name(): string {
        return this.configData.name;
    }

    get minVersion(): string {
        return this.configData.minVersion || '0';
    }

    get schemaFolder(): string {
        return this.getConfigDir('schemas');
    }

    get dataFolder(): string {
        return this.getConfigDir('data');
    }

    get variantDataFolder(): string {
        return this.getConfigDir('variantData');
    }

    get variantTypes(): VariantTypeConfig[] {
        return this.configData.variantTypes || [];
    }

    private getConfigDir(name: string): string {
        if (!this.configData.directories) {
            return name;
        }

        return this.configData.directories[name] || name;
    }
}