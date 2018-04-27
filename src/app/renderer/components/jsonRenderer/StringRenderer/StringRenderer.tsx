import * as React from 'react';
import {JsonRenderProps} from '../JsonRenderProps';

export class StringRenderer extends React.PureComponent<JsonRenderProps, {}> {

    render() {
        return this.props.value;
    }
}
