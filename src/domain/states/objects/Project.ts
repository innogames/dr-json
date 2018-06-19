import {dirname, joinPath} from '../../helpers/value/path';
import {SchemaTree} from './fileTree/SchemaTree';
import {ProjectConfig} from './ProjectConfig';
import {action, observable} from "mobx";

export class Project {

    private _file: string;
    private _config: ProjectConfig;
    private _schemaTree: SchemaTree;
    @observable private _filter: string | null;

    constructor(file: string, config: ProjectConfig, schemaTree: SchemaTree) {
        this._file       = file;
        this._config     = config;
        this._schemaTree = schemaTree;
        this._filter     = null;
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

    get filter(): string | null {
        return this._filter;
    }

    @action
    setFilter(value: string | null) {
        this._filter = value;
    }

    setSchemaTree(schemaTree: SchemaTree): void {
        this._schemaTree = schemaTree;
    }
}