import * as React from 'react';
import {JsonRenderProps} from '../JsonRenderProps';

export class BoolRenderer extends React.PureComponent<JsonRenderProps, {}> {

    render() {
        return this.props.value ? 'Yes' : 'No';
    }
}
