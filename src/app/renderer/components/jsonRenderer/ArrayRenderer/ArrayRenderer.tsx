import * as React from 'react';
import {ArrayOnelineRenderer} from '../ArrayOnelineRenderer';
import {ArrayRowsRenderer} from '../ArrayRowsRenderer';
import {JsonRenderProps} from '../JsonRenderProps';

export class ArrayRenderer extends React.PureComponent<JsonRenderProps, {}> {

    render() {
        const array: any[] = this.props.value;

        let isSimple: boolean = array.every((value: any) => typeof value == 'string' || typeof value == 'number');
        if (isSimple) {
            return <ArrayOnelineRenderer {...this.props} />;
        }

        return <ArrayRowsRenderer {...this.props} />;
    }
}
