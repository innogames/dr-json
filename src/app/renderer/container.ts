import {Container} from 'inversify';
import {ProjectConfigValidator} from '../../domain/context/config/ProjectConfigValidator';
import {EntryValidator} from '../../domain/context/data/EntryValidator';
import {FilesystemId, FilesystemInterface} from '../../domain/context/fs/FilesystemInterface';
import {JsonSchemaValidator} from '../../domain/context/schema/JsonSchemaValidator';
import {SettingsStorageId, SettingsStorageInterface} from '../../domain/context/settings/SettingsStorageInterface';
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
import {CollapseAllDirs} from '../../domain/useCases/fileTree/CollapseAllDirs';
import {ExpandAllDirs} from '../../domain/useCases/fileTree/ExpandAllDirs';
import {ToggleCollapseDir} from '../../domain/useCases/fileTree/ToggleCollapseDir';
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

let container: Container = new Container();

// states
container.bind<EditorState>(EditorState).toSelf().inSingletonScope();
container.bind<ProjectState>(ProjectState).toSelf().inSingletonScope();
container.bind<SettingsState>(SettingsState).toSelf().inSingletonScope();

// services
container.bind<DataRepo>(DataRepo).toSelf().inSingletonScope();
container.bind<EntryValidator>(EntryValidator).toSelf().inSingletonScope();
container.bind<FilesystemInterface>(FilesystemId).to(FilesystemImpl).inSingletonScope();
container.bind<JsonSchemaValidator>(JsonSchemaValidator).toSelf().inSingletonScope();
container.bind<ProjectConfigValidator>(ProjectConfigValidator).toSelf().inSingletonScope();
container.bind<ProjectRepo>(ProjectRepo).toSelf().inSingletonScope();
container.bind<SchemaRepo>(SchemaRepo).toSelf().inSingletonScope();
container.bind<SettingsRepo>(SettingsRepo).toSelf().inSingletonScope();
container.bind<SettingsStorageInterface>(SettingsStorageId).to(SettingsStorageImpl).inSingletonScope();

// use cases
// - fileTree
container.bind<CollapseAllDirs>(CollapseAllDirs).toSelf().inSingletonScope();
container.bind<ExpandAllDirs>(ExpandAllDirs).toSelf().inSingletonScope();
container.bind<ToggleCollapseDir>(ToggleCollapseDir).toSelf().inSingletonScope();

container.bind<CloseCreateEntry>(CloseCreateEntry).toSelf().inSingletonScope();
container.bind<CloseCreateVariant>(CloseCreateVariant).toSelf().inSingletonScope();
container.bind<CloseProject>(CloseProject).toSelf().inSingletonScope();
container.bind<CreateEntry>(CreateEntry).toSelf().inSingletonScope();
container.bind<SelectFileVariant>(SelectFileVariant).toSelf().inSingletonScope();
container.bind<CreateVariant>(CreateVariant).toSelf().inSingletonScope();
container.bind<DeleteEntry>(DeleteEntry).toSelf().inSingletonScope();
container.bind<OpenCreateEntry>(OpenCreateEntry).toSelf().inSingletonScope();
container.bind<OpenCreateVariant>(OpenCreateVariant).toSelf().inSingletonScope();
container.bind<OpenProject>(OpenProject).toSelf().inSingletonScope();
container.bind<SelectFile>(SelectFile).toSelf().inSingletonScope();
container.bind<Reload>(Reload).toSelf().inSingletonScope();
container.bind<SearchInFile>(SearchInFile).toSelf().inSingletonScope();
container.bind<UpdateEntry>(UpdateEntry).toSelf().inSingletonScope();

export {container};
