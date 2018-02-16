import {DataEntry} from '@/entities/editor/DataEntry';
import {FileContent} from '@/entities/editor/FileContent';
import {OpenFile} from '@/entities/editor/OpenFile';
import {SchemaConfig} from '@/entities/json/SchemaConfig';
import {DataFile} from '@/entities/project/DataFile';
import {errorToString} from '@/functions/domain/errorToString';
import {loadSchema} from '@/functions/domain/loadSchema';
import {readData} from '@/functions/domain/readData';
import {editorStore} from '@/stores/editorStore';
import {projectStore} from '@/stores/projectStore';
import {schemaStore} from '@/stores/schemaStore';

export function selectFile(file: DataFile, variantIdx: number = 0): Promise<void> {
    file = new DataFile(file.label, file.basename, file.schemaFile, file.allVariants, variantIdx);

    let openFile: OpenFile = new OpenFile(file);
    editorStore.open(openFile);

    return Promise.all<void, DataEntry[]>([
        loadSchema(file.schemaFile, projectStore.current.schemaFolder)
            .then((schema: SchemaConfig) => {
                schemaStore.add(file.schemaFile, schema);
            }),
        readData(file.currentVariant.file),
    ])
        .then(([_, entries]) => {
            openFile.setFileLoaded(new FileContent(entries));
        })
        .catch((error: any) => {
            openFile.setError(errorToString(error));
        });
}