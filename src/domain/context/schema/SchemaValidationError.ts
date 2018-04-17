export class SchemaValidationError {
    constructor(
        public readonly dataPath: string,
        public readonly keyword: string,
        public readonly message: string,
        public readonly params: any,
        public readonly schemaPath: string,
    ) {

    }

    toString(): string {
        return `${this.dataPath} ${this.message}`.substr(1).trim();
    }
}