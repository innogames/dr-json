import * as React from 'react';
import {JsonRenderProps} from '../JsonRenderProps';
import styles from './ArrayRowsRendererStyles.scss';

export class ArrayRowsRenderer extends React.PureComponent<JsonRenderProps, {}> {

    render() {
        const array: any[] = this.props.value;
        const schema       = this.props.schema;
        const path         = this.props.path;

        return this.props.renderArrayItems(array, schema, path)
            .map((value: any, idx: number) => {
                return (
                    <div key={idx} className={styles.arrayValue}>
                        <div className={styles.arrayIdx}>{`${path}[${idx}]`}</div>
                        <span>{value}</span>
                    </div>
                );
            });
    }
}
