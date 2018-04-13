import * as React from 'react';
import {Option, Options} from 'react-select';
import {VariantTypeConfig} from '../../../../../../../entities/project/Project';
import {Checkbox} from '../../../../../../form/Checkbox';
import {SchemaForm} from '../../../../../../form/SchemaForm';
import {Select} from '../../../../../../form/Select';
import {SideWindow} from '../../../../../../layout/SideWindow';
import {SideWindowHeadline} from '../../../../../../layout/SideWindow/SideWindowHeadline';
import styles from './VariantWindowStyles.scss';

interface Props {
    variantTypes: VariantTypeConfig[];
    onSubmit?: (variantId: string, copyEntries: boolean) => Promise<void>;
    onClose?: () => void;
}

interface State {
    selectedType: string | null;
    formData: any;
    copyEntries: boolean;
}

export class VariantWindow extends React.PureComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            selectedType: null,
            formData:     {},
            copyEntries:  false,
        };
    }

    render() {
        const selected: VariantTypeConfig | null = this.getSelectedType();
        let schema: any                          = {};

        if (selected) {
            schema = {
                type:       'object',
                properties: selected.vars,
                required:   Object.keys(selected.vars),
            };
        }

        return (
            <SideWindow>
                <SideWindowHeadline>Add variant</SideWindowHeadline>
                <div className={styles.wrap}>
                    <div className={styles.typeSelect}>
                        <Select
                            placeholder='Select Type...'
                            options={this.getOptions()}
                            onChange={this.onTypeChange}
                            value={this.state.selectedType || undefined}
                        />
                    </div>

                    <SchemaForm
                        schema={schema}
                        formData={this.state.formData}
                        onCancel={this.props.onClose}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                    >
                        <Checkbox
                            label='Copy all entries from Default'
                            checked={this.state.copyEntries}
                            onChange={this.onChangeCopyEntries}
                        />
                    </SchemaForm>

                </div>
            </SideWindow>
        );
    };

    private getOptions(): Options {
        return this.props.variantTypes.map((type: VariantTypeConfig): Option => {
            return {
                label: type.name,
                value: type.variantId,
            };
        });
    }

    private getSelectedType(): VariantTypeConfig | null {
        for (let type of this.props.variantTypes) {
            if (this.state.selectedType && type.variantId === this.state.selectedType) {
                return type;
            }
        }

        return null;
    }

    private onTypeChange = (option: Option<string>): void => {
        this.setState(() => ({
            selectedType: option ? option.value as string : null,
        }));
    };

    private onChangeCopyEntries = (checked: boolean): void => {
        this.setState(() => ({
            copyEntries: checked,
        }));
    };

    private onChange = (data: any): void => {
        this.setState(() => ({
            formData: data,
        }));
    };

    private onSubmit = (data: any): Promise<void> => {
        if (this.props.onSubmit) {
            const type: VariantTypeConfig | null = this.getSelectedType();
            if (type) {
                return this.props.onSubmit(
                    this.replaceVariantIdPlaceholders(type.variantId, data),
                    this.state.copyEntries,
                );
            }
        }
        return Promise.resolve();
    };

    private replaceVariantIdPlaceholders(variantId: string, props: any): string {
        Object.keys(props).forEach((prop: string) => {
            variantId = variantId.replace(`{${prop}}`, props[prop]);
        });

        return variantId;
    }
}
