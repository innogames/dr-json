import {observer} from 'mobx-react';
import * as React from 'react';
import {SchemaConfig} from '../../../../../../../../../domain/context/schema/SchemaConfig';
import {DataEntry} from '../../../../../../../../../domain/states/objects/editor/DataEntry';
import {Button} from '../../../../../../common/Button';
import {ErrorHint} from '../../../../../../common/ErrorHint';
import {Icon} from '../../../../../../common/Icon';
import {If} from '../../../../../../helper/If';
import {EntryJsonData} from '../EntryJsonData';
import {EntryWrapper} from '../EntryWrapper';
import styles from './EntryStyles.scss';

interface Props {
    entry: DataEntry;
    schema: SchemaConfig;
    onClickEdit?: (entry: DataEntry) => void;
    onClickDelete?: (entry: DataEntry) => void;
    onClickCopy?: (entry: DataEntry) => void;
}

@observer
export class Entry extends React.Component<Props, {}> {

    render() {
        return (
            <EntryWrapper
                headline={this.props.entry.id as string || '0'}
                hasError={this.props.entry.error}
                collapsible
                collapsed={this.props.entry.collapsed}
                onToggleCollapsed={this.toggleCollapsed}
            >
                <If cond={this.props.entry.error}>
                    <ErrorHint error={this.props.entry.error} className={styles.error}/>
                </If>

                <div className={styles.wrapper}>
                    <EntryJsonData entry={this.props.entry} schema={this.props.schema}/>

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

    private toggleCollapsed = (collapsed: boolean) => {
        this.props.entry.setCollapsed(collapsed);
    };
}
