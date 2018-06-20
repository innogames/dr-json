import {injectable} from 'inversify';
import {ProjectState} from '../states/ProjectState';

@injectable()
export class GetAllVariantIds {

    constructor(
        private projectState: ProjectState,
    ) {
    }

    fetch(): string[] {
        let files                   = this.projectState.project.schemaTree.getFilesFlat();
        let variantIds: Set<string> = new Set();

        for (let file of files) {
            for (let variant of file.variants) {
                variantIds.add(variant.variantId);
            }
        }

        return [...variantIds];
    }
}
