import * as fs from 'fs-extra';

export function writeJsonFile(file: string, data: any): Promise<void> {
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
