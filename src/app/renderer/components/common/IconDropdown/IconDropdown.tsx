import * as React from "react";
import {If} from "../../helper/If";
import styles from "./IconDropdownStyles.scss"
import {Link} from "../Link";
import {Icon} from "../Icon";

interface Props {
    title: string;
    icon: string;
}

interface State {
    isOpen: boolean;
}

export class IconDropdown extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    render() {
        return (
            <>
                <Link title={this.props.title} onClick={this.toggle}><Icon value={this.props.icon}/></Link>

                <If cond={this.state.isOpen}>
                    <div className={styles.wrapper}>
                        <div className={styles.dropdown}>
                            {this.props.children}
                        </div>
                    </div>
                </If>
            </>
        );
    };

    private toggle = () => {
        this.setState(({isOpen: !this.state.isOpen}), () => {
            if (this.state.isOpen) {
                document.addEventListener('click', this.toggle)
            } else {
                document.removeEventListener('click', this.toggle)
            }
        })
    };
}
