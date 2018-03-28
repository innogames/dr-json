import {errorToString} from '../../../common/errorToString';
import {dataRepo} from '../../../domain/repositories/dataRepo';
import {schemaRepo} from '../../../domain/repositories/schemaRepo';
import {DataEntry} from '../../../domain/entities/editor/DataEntry';
import {OpenFile} from '../../../domain/entities/editor/OpenFile';
import {SchemaConfig} from '../../../domain/entities/json/SchemaConfig';
import {DataFile} from '../../../domain/entities/project/DataFile';
import {editorStore} from '../stores/editorStore';
import {projectStore} from '../stores/projectStore';
import {schemaStore} from '../stores/schemaStore';

export function selectFile(file: DataFile, variantIdx: number = 0): Promise<void> {
    file = new DataFile(file.label, file.basename, file.schemaFile, file.allVariants, variantIdx);

    let openFile: OpenFile = new OpenFile(file);
    editorStore.open(openFile);

    return Promise.all<void, DataEntry[]>([
        schemaRepo.load(file.schemaFile, projectStore.current.schemaFolder)
            .then((schema: SchemaConfig) => {
                schemaStore.add(file.schemaFile, schema);
            }),
        dataRepo.load(file.currentVariant.file),
    ])
        .then(([_, entries]) => {
            openFile.setFileLoaded(entries);
        })
        .catch((error: any) => {
            openFile.setError(errorToString(error));
        });
}