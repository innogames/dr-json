import * as fs from 'fs';

export function readJsonFile<R>(file: string): Promise<R> {
    return new Promise((resolve, reject) => {
        fs.readFile(file, {encoding: 'utf8'}, (err: NodeJS.ErrnoException, content: string) => {
            if (err) {
                reject(err);
                return;
            }

            let data;

            try {
                data = JSON.parse(content);
            } catch (jsonErr) {
                jsonErr.message = file + ': ' + jsonErr.message;
                reject(jsonErr);
                return;
            }

            resolve(data as R);
        });
    });
}

export function readJsonFileIfExists<R>(file: string, defaultValue: R): Promise<R> {
    return new Promise((resolve) => {
        fs.access(file, fs.constants.F_OK, (err: NodeJS.ErrnoException) => {
            if (err) {
                resolve(defaultValue);
            } else {
                readJsonFile<R>(file).then(resolve);
            }
        });
    });
}

export function readJsonFileSync<R = any>(file: string): R {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}
