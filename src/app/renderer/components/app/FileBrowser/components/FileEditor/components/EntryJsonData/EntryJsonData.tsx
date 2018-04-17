import * as React from 'react';
import {DataEntry} from '../../../../../../../../../domain/states/objects/editor/DataEntry';
import styles from './EntryJsonDataStyles.scss';

interface Props {
    entry: DataEntry;
}

export class EntryJsonData extends React.PureComponent<Props, {}> {

    render() {
        let path: string = '';

        return (
            <div className={styles.props}>
                {this.renderObject({...this.props.entry.data, id: undefined}, path)}
            </div>
        );
    };

    private renderValue(value: any, path: string): any {
        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        } else if (Array.isArray(value)) {
            return this.renderArray(value, path);
        } else if (typeof value === 'object') {
            return this.renderObject(value, path);
        }

        return value.toString();
    }

    private renderObject(obj: any, path: string) {
        let rows: any[] = Object.keys(obj).map((key: string) => {
            if (typeof obj[key] === 'undefined') {
                return null;
            }

            return (
                <tr key={key}>
                    <th>{key}</th>
                    <td>{this.renderValue(obj[key], `${path}.${key}`)}</td>
                </tr>
            );
        });

        return (
            <table>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }

    private renderArray(array: any[], path: string) {
        let simple: boolean = true;

        const values: any[] = array.map((value: any, idx: number) => {
            if (typeof value === 'undefined') {
                return null;
            }

            const rendered: any = this.renderValue(value, `${path}[${idx}]`);

            if (typeof rendered !== 'string') {
                simple = false;
            }

            return rendered;
        });

        if (simple) {
            return values.join(', ');
        }

        return values.map((value: any, idx: number) => {
            return (
                <div key={idx} className={styles.arrayValue}>
                    <div className={styles.arrayIdx}>{`${path}[${idx}]`}</div>
                    <span>{value}</span>
                </div>
            );
        });
    }
}
