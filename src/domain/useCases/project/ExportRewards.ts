import {inject, injectable} from 'inversify';
import {ProjectState} from '../../states/ProjectState';
import {SchemaFile} from "../../states/objects/fileTree/SchemaFile";
import {FilesystemId, FilesystemInterface} from '../../context/fs/FilesystemInterface';
import {SchemaFileVariant} from "../../states/objects/fileTree/SchemaFileVariant";
import {json2csv} from "json-2-csv";

interface RewardData {
    id: string;
    name: string;
    rewardType: string;
    featureFlag: string;
    premiumEquivalent: string;
    premiumEquivalentExchange: string;
}

@injectable()
export class ExportRewards {

    constructor(
        @inject(FilesystemId) private filesystem: FilesystemInterface,
        private projectState: ProjectState,
    ) {
    }

    private createNewRewardData = (): RewardData => {
        return  {
            id: '',
            name: '',
            rewardType: '',
            featureFlag: '',
            premiumEquivalent: '',
            premiumEquivalentExchange: '',
        };
    }

    execute(path: string): Promise<void> {
        if (!this.projectState.hasProject) {
            console.warn("Cant export rewards, no project selected...")
            return Promise.resolve();
        }

        const rewards: SchemaFile[] = [];
        this.projectState.project.schemaTree.forEachFile((file: SchemaFile): void => {
            if (file.isReward) {
                rewards.push(file);
            }
        });

        if(rewards.length === 0) {
            console.warn("Cant export rewards, no files marked as rewards...")
            return Promise.resolve();
        }

        let jsonData: RewardData[] = [];
        //Loop through all files
        rewards.map((file: SchemaFile) => {
            jsonData = [ ...jsonData, ...this.extractSchemaFileData(file)];
        })

        const csvData: string = json2csv(jsonData)
        this.filesystem.writeCsv(path, csvData);

        return Promise.resolve();
    }

    private extractFileData(path: string, fileName: string, variantName: string = ""): RewardData[] {
        const rawData: Object = this.filesystem.readJsonSync(path);

        const extractedData: RewardData[] = [];
        //Loop through entries of the current file
        for (const key of Object.keys(rawData)) {
            const entryData: Object = rawData[key as keyof typeof rawData];
            const convertedData: RewardData = this.extractEntryData(entryData, fileName);
            convertedData.featureFlag = variantName;
            extractedData.push(convertedData);
        }
        return extractedData;
    }

    private extractSchemaFileData(file: SchemaFile): RewardData[] {
        let extractedData: RewardData[] = [];
        try{
            extractedData = [...extractedData, ...this.extractFileData(file.dataFile, file.label)]
        } catch(error) {
            console.warn(`Failed to read file "${file.dataFile}": ${error}`)
            file.setIsReward(false);
        }

        try{
            //Loop through file variants if exist
            file.variants.map((variant: SchemaFileVariant): void => {
                const variantPath = file.getVariantFileById(variant.variantId);
                if(variantPath) {
                    extractedData = [...extractedData, ...this.extractFileData(variantPath, file.label, variant.variantId)]
                }
            })
        } catch(error) {
            console.warn(`Failed to read variant file "${file.dataFile}": ${error}`)
        }

        return extractedData;
    }

    private extractEntryData(entry: Object, fileName: string) : RewardData {
        let extractedData: RewardData = this.createNewRewardData();
        extractedData.rewardType = fileName;

        //Loop through keys of the entry
        for (const key of Object.keys(entry)) {
            // Check if key is part of what we are looking for
            Object.keys(extractedData).map((rewardKey: string) => {
                if(rewardKey === key) {
                    extractedData[rewardKey as keyof typeof extractedData] = entry[rewardKey as keyof typeof entry] as unknown as string;
                }
            })

            // Some rewards are scaled depending on ages
            if(key === "ages") {
                const agesEntry: Object = entry[key as keyof typeof entry]["0" as keyof typeof entry];
                Object.keys(agesEntry).map((innerKey: string) => {
                    Object.keys(extractedData).map((rewardKey: string) => {
                        if(rewardKey === innerKey) {
                            extractedData[rewardKey as keyof typeof extractedData] = agesEntry[rewardKey as keyof typeof entry] as unknown as string;
                        }
                    })
                })
            }
        }

        return extractedData;
    }
}
