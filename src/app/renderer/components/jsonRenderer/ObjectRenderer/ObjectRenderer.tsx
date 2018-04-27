import * as React from 'react';
import {JsonRenderProps} from '../JsonRenderProps';
import styles from './ObjectRendererStyles.scss';

export class ObjectRenderer extends React.PureComponent<JsonRenderProps, {}> {

    render() {
        const obj: any = this.props.value;
        const schema   = this.props.schema;
        const path     = this.props.path;

        let map: Map<string, any> = this.props.renderObjectProps(obj, schema, path);

        return (
            <table className={styles.props}>
                <tbody>
                {Array.from(map.entries()).map(([prop, val]) => {
                    return (
                        <tr key={prop}>
                            <th>{prop}</th>
                            <td>{val}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        );
    }
}
