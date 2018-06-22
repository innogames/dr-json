import * as React from 'react';
import {JsonRenderProps} from '../JsonRenderProps';
import styles from './ListRendererStyles.scss';

export class ListRenderer extends React.PureComponent<JsonRenderProps, {}> {

    render() {
        const array: any[] = this.props.value;
        const schema       = this.props.schema;
        const path         = this.props.path;

        return (
            <ul className={styles.list}>
                {this.props.renderArrayItems(array, schema, path)
                    .map((value: any, idx: number) => {
                        return (
                            <li key={idx}>{value}</li>
                        );
                    })}
            </ul>
        );
    }
}
