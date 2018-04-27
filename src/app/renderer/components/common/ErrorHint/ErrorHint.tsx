import * as React from 'react';
import {SchemaValidationError} from '../../../../../domain/context/schema/SchemaValidationError';
import styles from './ErrorHintStyles.scss';

type ErrorType = string | Error | SchemaValidationError;

interface Props {
    error: ErrorType;
    className?: string;
}

export class ErrorHint extends React.PureComponent<Props, {}> {

    render() {
        return (
            <div className={[styles.error, this.props.className].join(' ')}>
                {this.convertError(this.props.error)}
            </div>
        );
    };

    private convertError = (error: ErrorType): any => {
        if (!error) {
            return '';
        }

        if (error instanceof SchemaValidationError) {
            return (
                <>
                    <div>{error.message}</div>
                    {error.getErrorMessages().map((message: string, idx: number) => {
                        return <div key={idx}>- {message}</div>;
                    })}
                </>
            );
        }

        if (error instanceof Error) {
            return error.message;
        }

        return error.toString();
    };
}
