import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Creatable from 'react-select/lib/Creatable';

interface Props {
    value?: string;
    onChange?: (value: any | any[]) => void;
    options?: string[];
    onCreateOption?: (value: any) => void;
}

export class Autocomplete extends React.Component<Props, {}> {
    render() {
        return (
            <Creatable
                value={this.props.value === null ? '' : this.props.value}
                options={this.props.options || []}
                onChange={this.props.onChange}
                onMenuOpen={this.onOpen}
                onMenuClose={this.onClose}
                onCreateOption={this.props.onCreateOption}
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
