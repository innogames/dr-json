import * as React from 'react';
import {JsonRenderProps} from '../JsonRenderProps';

export class NullRenderer extends React.PureComponent<JsonRenderProps, {}> {

    render() {
        return null;
    }
}
