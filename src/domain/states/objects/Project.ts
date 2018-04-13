import {dirname, joinPath} from '../../../common/value/path';
import {SchemaTree} from './fileTree/SchemaTree';
import {ProjectConfig} from './ProjectConfig';

export class Project {
    private _file: string;
    private _config: ProjectConfig;
    private _schemaTree: SchemaTree;

    constructor(file: string, config: ProjectConfig, schemaTree: SchemaTree) {
        this._file       = file;
        this._config     = config;
        this._schemaTree = schemaTree;
    }

    get file(): string {
        return this._file;
    }

    get config(): ProjectConfig {
        return this._config;
    }

    get rootPath(): string {
        return dirname(this._file);
    }

    get schemaPath(): string {
        return joinPath(dirname(this._file), this._config.schemaFolder);
    }

    get dataPath(): string {
        return joinPath(dirname(this._file), this._config.dataFolder);
    }

    get variantDataPath(): string {
        return joinPath(dirname(this._file), this._config.variantDataFolder);
    }

    get schemaTree(): SchemaTree {
        return this._schemaTree;
    }

    setSchemaTree(schemaTree: SchemaTree): void {
        this._schemaTree = schemaTree;
    }
}