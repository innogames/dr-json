export function setRequiredBoolDefaultValues(data: any, schema: any): any {
    if (schema.type == 'object' && data) {
        let required: string[] = schema.required || [];

        if (schema.properties) {
            Object.keys(schema.properties).forEach((prop: string) => {
                let val: any = data[prop];

                if (schema.properties[prop].type == 'boolean' && required.indexOf(prop) >= 0 && !val) {
                    val = false;
                } else {
                    val = setRequiredBoolDefaultValues(data[prop], schema.properties[prop]);
                }

                data = {...data, [prop]: val};
            });
        }
    } else if (schema.type == 'array' && Array.isArray(data)) {
        data = (data as any[])
            .map((item): any => {
                if (schema.items) {
                    item = setRequiredBoolDefaultValues(item, schema.items);
                }

                return item;
            });
    }

    return data;
}
