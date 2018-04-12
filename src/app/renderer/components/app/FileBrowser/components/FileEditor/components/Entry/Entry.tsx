import * as React from 'react';
import {DataEntry} from '../../../../../../../../../domain/entities/editor/DataEntry';
import {Button} from '../../../../../../common/Button';
import {Icon} from '../../../../../../common/Icon';
import {EntryJsonData} from '../EntryJsonData';
import {EntryWrapper} from '../EntryWrapper';
import styles from './EntryStyles.scss';

interface Props {
    entry: DataEntry;
    onClickEdit?: (entry: DataEntry) => void;
    onClickDelete?: (entry: DataEntry) => void;
    onClickCopy?: (entry: DataEntry) => void;
}

export class Entry extends React.PureComponent<Props, {}> {

    render() {
        return (
            <EntryWrapper headline={this.props.entry.id as string || ''}>
                <div className={styles.wrapper}>
                    <EntryJsonData entry={this.props.entry}/>
                    <div className={styles.buttons}>
                        <Button title='Edit' icon={Icon.EDIT} onClick={this.handleClickEdit} primary/>
                        <Button title='Delete' icon={Icon.REMOVE} onClick={this.handleClickDelete} danger/>
                        <Button title='Duplicate' icon={Icon.COPY} onClick={this.handleClickCopy}/>
                    </div>
                </div>
            </EntryWrapper>
        );
    };

    private handleClickEdit = () => {
        if (this.props.onClickEdit) {
            this.props.onClickEdit(this.props.entry);
        }
    };

    private handleClickDelete = () => {
        if (this.props.onClickDelete) {
            this.props.onClickDelete(this.props.entry);
        }
    };

    private handleClickCopy = () => {
        if (this.props.onClickCopy) {
            this.props.onClickCopy(this.props.entry);
        }
    };
}
