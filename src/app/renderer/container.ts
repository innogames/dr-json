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
import {GetAllVariantIds} from '../../domain/stateQueries/GetAllVariantIds';
import {IsEditing} from '../../domain/stateQueries/IsEditing';
import {EditorState} from '../../domain/states/EditorState';
import {ProjectState} from '../../domain/states/ProjectState';
import {SettingsState} from '../../domain/states/SettingsState';
import {CloseCreateEntry} from '../../domain/useCases/entries/CloseCreateEntry';
import {CloseEditEntry} from '../../domain/useCases/entries/CloseEditEntry';
import {CreateEntry} from '../../domain/useCases/entries/CreateEntry';
import {DeleteEntry} from '../../domain/useCases/entries/DeleteEntry';
import {OpenCreateEntry} from '../../domain/useCases/entries/OpenCreateEntry';
import {SearchInFile} from '../../domain/useCases/entries/SearchInFile';
import {SearchForFileContent} from '../../domain/useCases/project/SearchforFileContent';
import {ToggleCollapseEntries} from '../../domain/useCases/entries/ToggleCollapseEntries';
import {UpdateEntry} from '../../domain/useCases/entries/UpdateEntry';
import {CollapseAllDirs} from '../../domain/useCases/fileTree/CollapseAllDirs';
import {ExpandAllDirs} from '../../domain/useCases/fileTree/ExpandAllDirs';
import {SearchForFileName} from '../../domain/useCases/fileTree/SearchForFileName';
import {ResetFilter} from '../../domain/useCases/fileTree/ResetFilter';
import {SelectFile} from '../../domain/useCases/fileTree/SelectFile';
import {SelectFileVariant} from '../../domain/useCases/fileTree/SelectFileVariant';
import {SelectFilter} from '../../domain/useCases/fileTree/SelectFilter';
import {ToggleCollapseDir} from '../../domain/useCases/fileTree/ToggleCollapseDir';
import {CloseProject} from '../../domain/useCases/project/CloseProject';
import {OpenProject} from '../../domain/useCases/project/OpenProject';
import {Reload} from '../../domain/useCases/project/Reload';
import {CloseCreateVariant} from '../../domain/useCases/variants/CloseCreateVariant';
import {CreateVariant} from '../../domain/useCases/variants/CreateVariant';
import {OpenCreateVariant} from '../../domain/useCases/variants/OpenCreateVariant';
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
// - entries
container.bind<CloseCreateEntry>(CloseCreateEntry).toSelf().inSingletonScope();
container.bind<CloseEditEntry>(CloseEditEntry).toSelf().inSingletonScope();
container.bind<CreateEntry>(CreateEntry).toSelf().inSingletonScope();
container.bind<DeleteEntry>(DeleteEntry).toSelf().inSingletonScope();
container.bind<OpenCreateEntry>(OpenCreateEntry).toSelf().inSingletonScope();
container.bind<SearchInFile>(SearchInFile).toSelf().inSingletonScope();
container.bind<ToggleCollapseEntries>(ToggleCollapseEntries).toSelf().inSingletonScope();
container.bind<UpdateEntry>(UpdateEntry).toSelf().inSingletonScope();
// - fileTree
container.bind<CollapseAllDirs>(CollapseAllDirs).toSelf().inSingletonScope();
container.bind<ExpandAllDirs>(ExpandAllDirs).toSelf().inSingletonScope();
container.bind<ResetFilter>(ResetFilter).toSelf().inSingletonScope();
container.bind<SelectFile>(SelectFile).toSelf().inSingletonScope();
container.bind<SelectFileVariant>(SelectFileVariant).toSelf().inSingletonScope();
container.bind<SelectFilter>(SelectFilter).toSelf().inSingletonScope();
container.bind<ToggleCollapseDir>(ToggleCollapseDir).toSelf().inSingletonScope();
container.bind<SearchForFileName>(SearchForFileName).toSelf().inSingletonScope();
// - project
container.bind<CloseProject>(CloseProject).toSelf().inSingletonScope();
container.bind<OpenProject>(OpenProject).toSelf().inSingletonScope();
container.bind<Reload>(Reload).toSelf().inSingletonScope();
container.bind<SearchForFileContent>(SearchForFileContent).toSelf().inSingletonScope();
// - variants
container.bind<CloseCreateVariant>(CloseCreateVariant).toSelf().inSingletonScope();
container.bind<CreateVariant>(CreateVariant).toSelf().inSingletonScope();
container.bind<OpenCreateVariant>(OpenCreateVariant).toSelf().inSingletonScope();

// queries
container.bind<GetAllVariantIds>(GetAllVariantIds).toSelf().inSingletonScope();
container.bind<IsEditing>(IsEditing).toSelf().inSingletonScope();

export {container};
