import {observer} from 'mobx-react';
import * as React from 'react';
import {Button} from '../../../../../../common/Button';
import {Icon} from '../../../../../../common/Icon';
import {Link} from '../../../../../../common/Link';
import {TextField} from '../../../../../../form/TextField';
import styles from './ToolbarStyles.scss';

interface Props {
    onClickAdd: () => void;
    onSearch?: (value: string) => void;
    onExpandAll?: () => void;
    onCollapseAll?: () => void;
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
                    />

                    <Link title='Expand All' onClick={this.props.onExpandAll} className={styles.btn}>
                        <Icon value={Icon.EXPAND}/>
                    </Link>
                    <Link title='Collapse All' onClick={this.props.onCollapseAll} className={styles.btn}>
                        <Icon value={Icon.COLLAPSE}/>
                    </Link>
                </div>

                <div className={styles.toolbarRight}>
                    <Button icon={Icon.PLUS} label='Add' onClick={this.props.onClickAdd} primary/>
                </div>
            </div>
        );
    }
}
