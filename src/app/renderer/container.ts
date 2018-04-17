import {ProjectConfigValidator} from '../../domain/context/config/ProjectConfigValidator';
import {FilesystemInterface} from '../../domain/context/fs/FilesystemInterface';
import {JsonSchemaValidator} from '../../domain/context/schema/JsonSchemaValidator';
import {SettingsStorageInterface} from '../../domain/context/settings/SettingsStorageInterface';
import {DataRepo} from '../../domain/repositories/DataRepo';
import {ProjectRepo} from '../../domain/repositories/ProjectRepo';
import {SchemaRepo} from '../../domain/repositories/SchemaRepo';
import {SettingsRepo} from '../../domain/repositories/SettingsRepo';
import {EditorState} from '../../domain/states/EditorState';
import {ProjectState} from '../../domain/states/ProjectState';
import {SettingsState} from '../../domain/states/SettingsState';
import {CloseCreateEntry} from '../../domain/useCases/CloseCreateEntry';
import {CloseCreateVariant} from '../../domain/useCases/CloseCreateVariant';
import {CloseProject} from '../../domain/useCases/CloseProject';
import {CreateEntry} from '../../domain/useCases/CreateEntry';
import {CreateVariant} from '../../domain/useCases/CreateVariant';
import {DeleteEntry} from '../../domain/useCases/DeleteEntry';
import {OpenCreateEntry} from '../../domain/useCases/OpenCreateEntry';
import {OpenCreateVariant} from '../../domain/useCases/OpenCreateVariant';
import {OpenProject} from '../../domain/useCases/OpenProject';
import {Reload} from '../../domain/useCases/Reload';
import {SearchInFile} from '../../domain/useCases/SearchInFile';
import {SelectFile} from '../../domain/useCases/SelectFile';
import {SelectFileVariant} from '../../domain/useCases/SelectFileVariant';
import {UpdateEntry} from '../../domain/useCases/UpdateEntry';
import {FilesystemImpl} from './services/FilesystemImpl';
import {SettingsStorageImpl} from './services/SettingsStorageImpl';

interface States {
    editorState: EditorState;
    projectState: ProjectState;
    settingsState: SettingsState;
}
export const states: States = {
    editorState:   new EditorState(),
    projectState:  new ProjectState(),
    settingsState: new SettingsState(),
};

const filesystem: FilesystemInterface                = new FilesystemImpl();
const jsonSchemaValidator: JsonSchemaValidator       = new JsonSchemaValidator();
const projectConfigValidator: ProjectConfigValidator = new ProjectConfigValidator(jsonSchemaValidator);
const settingsStorage: SettingsStorageInterface      = new SettingsStorageImpl();

export const settingsRepo: SettingsRepo = new SettingsRepo(settingsStorage);
const dataRepo: DataRepo                = new DataRepo(filesystem);
const projectRepo: ProjectRepo          = new ProjectRepo(filesystem, projectConfigValidator);
const schemaRepo: SchemaRepo            = new SchemaRepo(filesystem, jsonSchemaValidator);

const closeCreateEntry: CloseCreateEntry     = new CloseCreateEntry(states.editorState);
const closeCreateVariant: CloseCreateVariant = new CloseCreateVariant(states.editorState);
const closeProject: CloseProject             = new CloseProject(states.projectState, states.editorState, settingsRepo);
const createEntry: CreateEntry               = new CreateEntry(states.editorState, dataRepo);
const selectFileVariant: SelectFileVariant   = new SelectFileVariant(states.editorState, states.projectState, dataRepo, schemaRepo);
const createVariant: CreateVariant           = new CreateVariant(states.projectState, dataRepo, selectFileVariant);
const deleteEntry: DeleteEntry               = new DeleteEntry(states.editorState, dataRepo);
const openCreateEntry: OpenCreateEntry       = new OpenCreateEntry(states.editorState);
const openCreateVariant: OpenCreateVariant   = new OpenCreateVariant(states.editorState);
const openProject: OpenProject               = new OpenProject(closeProject, projectRepo, settingsRepo, schemaRepo, states.projectState, states.settingsState);
const selectFile: SelectFile                 = new SelectFile(states.editorState, states.projectState, dataRepo, schemaRepo);
const reload: Reload                         = new Reload(states.editorState, states.projectState, openProject, selectFile, selectFileVariant);
const searchInFile: SearchInFile             = new SearchInFile(states.editorState);
const updateEntry: UpdateEntry               = new UpdateEntry(states.editorState, dataRepo);

interface UseCases {
    closeCreateEntry: CloseCreateEntry,
    closeCreateVariant: CloseCreateVariant,
    closeProject: CloseProject,
    createEntry: CreateEntry,
    createVariant: CreateVariant,
    deleteEntry: DeleteEntry,
    openCreateEntry: OpenCreateEntry,
    openCreateVariant: OpenCreateVariant,
    openProject: OpenProject,
    reload: Reload,
    searchInFile: SearchInFile,
    selectFile: SelectFile,
    selectFileVariant: SelectFileVariant,
    updateEntry: UpdateEntry,
}

export const useCases: UseCases = {
    closeCreateEntry,
    closeCreateVariant,
    closeProject,
    createEntry,
    createVariant,
    deleteEntry,
    openCreateEntry,
    openCreateVariant,
    openProject,
    reload,
    searchInFile,
    selectFile,
    selectFileVariant,
    updateEntry,
};
