import * as React from 'react';
import {observer} from 'mobx-react';
import {TextField} from '@/components/form/TextField';
import {Button} from '@/components/common/Button';
import {Icon} from '@/components/common/Icon';
import styles from './ToolbarStyles.scss';

interface Props {
    onClickAdd: () => void;
    onSearch: (value: string) => void;
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
                </div>

                <div className={styles.toolbarRight}>
                    <Button icon={Icon.PLUS} label='Add' onClick={this.props.onClickAdd} primary/>
                </div>
            </div>
        );
    }
}
