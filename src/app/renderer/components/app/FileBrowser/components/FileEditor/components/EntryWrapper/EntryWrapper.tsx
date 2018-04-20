import * as React from 'react';
import {Icon} from '../../../../../../common/Icon';
import {Link} from '../../../../../../common/Link';
import {If} from '../../../../../../helper/If';
import styles from './EntryWrapperStyles.scss';

interface Props {
    headline: string;
    collapsible?: boolean;
    collapsed?: boolean;
    onToggleCollapsed?: (collapsed: boolean) => void;
}

export class EntryWrapper extends React.PureComponent<Props, {}> {

    render() {
        let contentClasses: string[] = [styles.content];
        if (this.props.collapsed) {
            contentClasses.push(styles.collapsed);
        }

        return (
            <div className={styles.entry}>
                <div className={styles.headline}>
                    <h3>{this.props.headline}</h3>

                    <If cond={this.props.collapsible}>
                        <div className={styles.collapseToggle}>
                            {this.renderCollapseToggle()}
                        </div>
                    </If>
                </div>

                <div className={contentClasses.join(' ')}>
                    {this.props.children}
                </div>
            </div>
        );
    };

    private renderCollapseToggle() {
        if (this.props.collapsed) {
            return (
                <Link title='Expand' onClick={this.props.onToggleCollapsed} data={false}>
                    <Icon value={Icon.EXPAND}/>
                </Link>
            );
        }

        return (
            <Link title='Collapse' onClick={this.props.onToggleCollapsed} data={true}>
                <Icon value={Icon.COLLAPSE}/>
            </Link>
        );
    }
}
