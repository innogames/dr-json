import * as React from 'react';
import {JsonRenderProps} from '../JsonRenderProps';

export class ArrayOnelineRenderer extends React.PureComponent<JsonRenderProps, {}> {

    render() {
        const array: any[] = this.props.value;

        return array.join(', ');
    }
}
