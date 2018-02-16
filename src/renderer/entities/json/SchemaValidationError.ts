export class SchemaValidationError {
    constructor(
        public readonly dataPath: string,
        public readonly keyword: string,
        public readonly message: string,
        public readonly params: any,
        public readonly schemaPath: string,
    ) {

    }
}
