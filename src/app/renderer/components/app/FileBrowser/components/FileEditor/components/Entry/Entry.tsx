import {observer} from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
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

    // @ts-ignore: has no initializer
    refs: {
        entry: Element,
        buttons: Element
    };

    private buttonDivElem!: HTMLElement;
    private entryContainerElem!: HTMLElement;

    componentDidMount(): void {
        this.buttonDivElem = ReactDOM.findDOMNode(this.refs.buttons) as HTMLElement;
        this.entryContainerElem = ReactDOM.findDOMNode(this.refs.entry) as HTMLElement;

        const containerElem = document.getElementById('editorContainer');

        if(!containerElem) {
            return;
        }

        const entryRect = this.entryContainerElem.getBoundingClientRect();
        const entryHeight = entryRect.height;

        // Entry is small enough
        if(entryHeight <= window.innerHeight) {
            return;
        }

        containerElem.addEventListener('scroll', this.updatePositions);

        this.updatePositions();
    }

    componentWillUnmount(): void {
        const containerElem = document.getElementById('editorContainer');
        if(containerElem) {
            containerElem.removeEventListener('scroll', this.updatePositions);
        }
    }

    render() {
        return (
            <EntryWrapper
                headline={this.props.entry.id === 0 ? '0' : this.props.entry.id as string || ''}
                hasError={this.props.entry.error}
                collapsible
                collapsed={this.props.entry.collapsed}
                onToggleCollapsed={this.toggleCollapsed}
                ref="entry"
            >
                <If cond={this.props.entry.error}>
                    <ErrorHint error={this.props.entry.error} className={styles.error}/>
                </If>

                <div className={styles.wrapper}>
                    <EntryJsonData entry={this.props.entry} schema={this.props.schema}/>

                    <div className={styles.buttons} ref="buttons">
                        <Button title='Edit' icon={Icon.EDIT} onClick={this.handleClickEdit} primary/>
                        <Button title='Delete' icon={Icon.REMOVE} onClick={this.handleClickDelete} danger/>
                        <Button title='Duplicate' icon={Icon.COPY} onClick={this.handleClickCopy}/>
                    </div>
                </div>
            </EntryWrapper>
        );
    };

    private updatePositions = () => {
        const entryRect = this.entryContainerElem.getBoundingClientRect();
        const entryTop = entryRect.top;
        const entryBottom = entryRect.bottom;

        // Entry is outside the viewport
        if(entryTop >= window.innerHeight || entryBottom <= 100) {
            return;
        }

        const buttonsHeight = this.buttonDivElem.getBoundingClientRect().height;

        const newTopMargin = (window.innerHeight / 2) - entryTop - (buttonsHeight / 2);

        if(newTopMargin < entryRect.height - buttonsHeight - 60 && newTopMargin >= 0)
        {
            this.buttonDivElem.style.marginTop = newTopMargin.toString() + "px";
        }
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