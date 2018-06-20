import * as React from 'react';
import {JsonRenderProps} from '../JsonRenderProps';
import styles from './ArrayRendererStyles.scss';

export class ArrayRenderer extends React.PureComponent<JsonRenderProps, {}> {

    render() {
        const array: any[] = this.props.value;
        const schema       = this.props.schema;
        const path         = this.props.path;

        // --------------------------------------------------------------------------------------
        //TODO: remove this when renderer is configurable and simpleArrayRender can be configured
        let isSimple: boolean = array.every((value: any) => typeof value == 'string' || typeof value == 'number');
        if (isSimple) {
            return array.join(', ');
        }
        // --------------------------------------------------------------------------------------

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
