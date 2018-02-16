import {Button} from '@/components/common/Button';
import * as React from 'react';
import Form from 'react-jsonschema-form';
import styles from './SchemaFormStyles.scss';
import {SelectWidget} from './widgets/SelectWidget';

// import icon component so icon font is available
require('@/components/common/Icon');

const widgets = {
    SelectWidget: SelectWidget,
};

interface Props {
    schema: any;
    uiSchema?: any;
    formData?: any;
    validate?: (data: any, errors: any) => any;
    onChange?: (data: any) => void;
    onSubmit?: (data: any) => Promise<void>;
    onCancel?: () => void;
    className?: string;
}

interface State {
    error: Error;
}

export class SchemaForm extends React.PureComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    componentDidCatch(error: any) {
        this.setState({error: error});
    }

    render() {
        if (this.state.error) {
            return this.renderError(this.state.error.message);
        }

        return (
            <div className={[styles.form, this.props.className].join(' ')}>
                <Form
                    schema={this.props.schema}
                    uiSchema={this.props.uiSchema || {}}
                    formData={this.props.formData || {}}
                    noHtml5Validate
                    showErrorList={false}
                    validate={this.props.validate}
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                    widgets={widgets}
                >
                    {this.props.children}

                    <div className={styles.buttons}>
                        <Button label='Save' type='submit' primary disabled={!Object.keys(this.props.schema).length}/>
                        <Button label='Cancel' type='button' onClick={this.props.onCancel}/>
                    </div>
                </Form>
            </div>
        );
    }

    private renderError(message: string) {
        return (
            <div>
                <div className={styles.error}>
                    Invalid JSON Schema:
                    <p>
                        {message}
                    </p>
                </div>
                <div className={styles.buttons}>
                    <Button label='OK' primary onClick={this.props.onCancel}/>
                </div>
            </div>
        );
    }

    private onSubmit = (data: any) => {
        if (this.props.onSubmit) {
            this.props.onSubmit(data.formData)
                .then(() => {
                    if (this.props.onCancel) {
                        this.props.onCancel();
                    }
                });
        }
    };

    private onChange = (e: any) => {
        if (this.props.onChange) {
            this.props.onChange(e.formData);
        }
    };
}
