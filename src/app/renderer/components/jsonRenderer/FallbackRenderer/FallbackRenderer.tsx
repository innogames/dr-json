import * as React from 'react';
import {Icon} from '../../common/Icon';
import {JsonRenderProps} from '../JsonRenderProps';
import styles from './FallbackRendererStyles.scss';

export class FallbackRenderer extends React.PureComponent<JsonRenderProps, {}> {

    render() {
        return (
            <span className={styles.fallback}>
                <Icon value={Icon.WARNING}/>
                {this.props.value.toString()}
            </span>
        );
    }
}
