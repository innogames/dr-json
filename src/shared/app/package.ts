const jsonData: any = require('../../../package.json');

class PackageJson {
    constructor(private readonly data: any) {
    }

    get appName(): string {
        return this.data.build.productName;
    }

    get version(): string {
        return this.data.version;
    }
}

export let packageJson = new PackageJson(jsonData);