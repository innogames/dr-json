import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactSelect from 'react-select';

require('./SelectStyles.scss');

interface Props {
    placeholder?: string;
    disabled?: boolean;
    onChange?: (value: any | any[]) => void;
    options?: any[];
    sort?: boolean;
    clearable?: boolean;
}

export class Select extends React.Component<Props, {}> {

    render() {
        return (
            <ReactSelect
                placeholder={this.props.placeholder || ''}
                isDisabled={this.props.disabled}
                options={this.props.options || []}
                onChange={this.props.onChange}
                noOptionsMessage={() => this.props.placeholder || ''}
                isClearable={this.props.clearable}
                onMenuOpen={this.onOpen}
                onMenuClose={this.onClose}
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
