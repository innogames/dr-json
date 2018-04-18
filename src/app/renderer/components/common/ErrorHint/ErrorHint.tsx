import * as React from 'react';
import {SchemaValidationError} from '../../../../../domain/context/schema/SchemaValidationError';
import styles from './ErrorHintStyles.scss';

interface Props {
    error: any;
}

export class ErrorHint extends React.PureComponent<Props, {}> {

    render() {
        return (
            <div className={styles.error}>
                {this.convertError(this.props.error)}
            </div>
        );
    };

    private convertError = (error: any): any => {
        if (!error) {
            return '';
        }

        if (error instanceof Error) {
            return error.message;
        }

        if (error instanceof SchemaValidationError) {
            let num = 1;
            return (
                <>
                    <div>{error.message}</div>
                    {error.getErrorMessages().map((message: string) => {
                        return <div>{`(${num++}) ${message}`}</div>;
                    })}
                </>
            );
        }

        return error.toString();
    };
}
