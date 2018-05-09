import {isNestedEmpty} from '../value/object';

export function removeOptionalEmptyValues(data: any, schema: any): any {
    if (schema.type == 'object') {
        let required: string[] = schema.required || [];

        Object.keys(data).forEach((prop: string) => {
            let newVal: any = data[prop];

            if (required.indexOf(prop) < 0 && isNestedEmpty(data[prop])) {
                newVal = undefined;
            } else if (schema.properties && schema.properties[prop]) {
                newVal = removeOptionalEmptyValues(data[prop], schema.properties[prop]);
            }

            data = {...data, [prop]: newVal};
        });
    } else if (schema.type == 'array') {
        data = (data as any[])
            .map((item): any => {
                if (schema.items) {
                    item = removeOptionalEmptyValues(item, schema.items);
                }

                return item;
            })
            .filter((item: any) => !isNestedEmpty(item));
    }

    return data;
}
