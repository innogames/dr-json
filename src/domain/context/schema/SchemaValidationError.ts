export interface ValidationErrorData {
    dataPath: string;
    keyword: string;
    message: string;
    params: any;
    schemaPath: string;
}

export class SchemaValidationError {
    constructor(
        public readonly message: string,
        public readonly errors: ValidationErrorData[],
    ) {

    }

    public getErrorMessages(): string[] {
        return this.errors.map(this.errorDataToString);
    }

    private errorDataToString = (data: ValidationErrorData): string => {
        return `${data.dataPath} ${data.message} ${this.paramsToString(data.params)}`.trim();
    };

    private paramsToString = (params: any) => {
        if (!params) {
            return '';
        }

        return JSON.stringify(params);
    };
}
