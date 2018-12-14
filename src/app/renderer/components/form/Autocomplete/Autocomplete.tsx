import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Creatable, OnChangeHandler, Option, Options} from 'react-select';

interface Props {
    value?: string;
    onChange?: (value: Option<any> | Options<any>) => void;
    options?: Options;
    onNewOptionClick?: (value: Option<any>) => void;
}

export class Autocomplete extends React.Component<Props, {}> {
    render() {
        return (
            <Creatable
                value={this.props.value === null ? '' : this.props.value}
                options={this.props.options || []}
                onChange={this.props.onChange as OnChangeHandler}
                onOpen={this.onOpen}
                onClose={this.onClose}
                onNewOptionClick={this.props.onNewOptionClick}
            />
        );
    }

    private onOpen = () => {
        this.repositionDropdown();
        document.addEventListener('scroll', this.repositionDropdown, true);
    };

    private onClose = () => {
        document.removeEventListener('scroll', this.repositionDropdown, true);
    };


    private repositionDropdown = () => {
        const element: HTMLElement = ReactDOM.findDOMNode(this) as HTMLElement;
        if (!element) {
            return;
        }

        const select: HTMLElement = element.getElementsByClassName('Select-control').item(0) as HTMLElement;
        let dropdown: HTMLElement = element.getElementsByClassName('Select-menu-outer').item(0) as HTMLElement;
        if (!select || !dropdown) {
            return;
        }

        let rect: ClientRect = select.getBoundingClientRect();
        dropdown.style.top   = rect.top + rect.height + 'px';
        dropdown.style.left  = rect.left + 'px';
        dropdown.style.width = rect.width + 'px';
    };
}
