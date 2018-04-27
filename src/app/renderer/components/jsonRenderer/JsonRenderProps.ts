export interface JsonRenderProps {
    value: any;
    schema: any;
    path: string;
    renderValue: (value: any, schema: any, path: string) => any;
    renderArrayItems: (array: any[], schema: any, path: string) => any[];
    renderObjectProps: (obj: any, schema: any, path: string) => Map<string, any>;
}
