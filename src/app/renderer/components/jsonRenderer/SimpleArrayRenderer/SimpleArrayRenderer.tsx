import * as React from 'react';
import {JsonRenderProps} from '../JsonRenderProps';

export class SimpleArrayRenderer extends React.PureComponent<JsonRenderProps, {}> {

    render() {
        const array: any[] = this.props.value;
        const schema       = this.props.schema;
        const path         = this.props.path;

        return this.props.renderArrayItems(array, schema, path).join(', ');
    }
}
