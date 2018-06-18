import * as React from "react";
import {If} from "../../helper/If";
import styles from "./IconDropdownStyles.scss"
import {Link} from "../Link";
import {Icon} from "../Icon";

interface Props {
    optionsList?: string[];
    icon: string;
}

interface State {
    isOpen: boolean;
}

export class IconDropdown extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        
        this.props = {
            icon: ''
        };

        this.state = {
            isOpen: false,
        };

        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    render() {
        return (
            <>
                <Link title='Filter' onClick={this.onOpen}><Icon value={this.props.icon}/></Link>

                <If cond={this.state.isOpen}>
                    <div className={styles.dropdown}>
                        {this.props.children}
                    </div>
                </If>
            </>
        );
    };

    public onClose = () => {
        this.setState({isOpen: false}, () => {
            document.removeEventListener('click', this.onClose)
        })
    };

    private onOpen = () => {
        this.setState({isOpen: !this.state.isOpen}, () => {
            document.addEventListener('click', this.onClose)
        })
    };
}
