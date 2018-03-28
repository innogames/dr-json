import * as fs from 'fs-extra';

class JsonFile {

    public read<R>(file: string): Promise<R> {
        return new Promise((resolve, reject) => {
            fs.readFile(file, 'utf8', (err: NodeJS.ErrnoException, content: string) => {
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

    public readIfExists<R>(file: string, defaultValue: R): Promise<R> {
        return new Promise((resolve) => {
            fs.access(file, fs.constants.F_OK, (err: NodeJS.ErrnoException) => {
                if (err) {
                    resolve(defaultValue);
                } else {
                    this.read<R>(file).then(resolve);
                }
            });
        });
    }

    public readSync<R = any>(file: string): R {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    }

    public write(file: string, data: any): Promise<void> {
        return new Promise((resolve) => {
            const options = {
                spaces:   4,
                encoding: 'utf8',
            };

            fs.ensureFile(file)
                .then(() => fs.writeJson(file, data, options))
                .then(resolve);
        });
    }
}

export const jsonFile = new JsonFile();