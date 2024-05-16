import {observer} from 'mobx-react';
import * as React from 'react';
import {Button} from '../../../../../../common/Button';
import {Icon} from '../../../../../../common/Icon';
import {Link} from '../../../../../../common/Link';
import {TextField} from '../../../../../../form/TextField';
import {If} from '../../../../../../helper/If';
import {Checkbox} from "../../../../../../form/Checkbox";
import styles from './ToolbarStyles.scss';

interface Props {
    onClickAdd: () => void;
    onSearch?: (value: string) => void;
    onExpandAll?: () => void;
    onCollapseAll?: () => void;
    hasErrors?: boolean;
    onToggleErrors?: () => void;
    searchText?: string;
    isReward?: boolean;
    onIsRewardsToggle?: (status: boolean) => void;
}

@observer
export class Toolbar extends React.Component<Props, {}> {

    render() {
        return (
            <div className={styles.toolbar}>
                <div className={styles.toolbarLeft}>
                    <TextField
                        className={styles.search}
                        placeholder='Search'
                        onChange={this.props.onSearch}
                        selectAllOnFocus
                        value={this.props.searchText}
                    />

                    <Link title='Expand All' onClick={this.props.onExpandAll} className={styles.btn}>
                        <Icon value={Icon.EXPAND}/>
                    </Link>
                    <Link title='Collapse All' onClick={this.props.onCollapseAll} className={styles.btn}>
                        <Icon value={Icon.COLLAPSE}/>
                    </Link>

                    <Checkbox
                        label={"Are Rewards"}
                        checked={this.props.isReward}
                        onChange={this.props.onIsRewardsToggle}
                    />

                    <If cond={this.props.hasErrors}>
                        <Link title='Show/Hide Errors Only' onClick={this.props.onToggleErrors} className={styles.btn}>
                            <Icon value={Icon.WARNING} color={Icon.Colors.Danger}/>
                        </Link>
                    </If>
                </div>

                <div className={styles.toolbarRight}>
                    <Button icon={Icon.PLUS} label='Add' onClick={this.props.onClickAdd} primary/>
                </div>
            </div>
        );
    }
}
