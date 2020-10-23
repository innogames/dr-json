import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ResizeHandle} from '../../common/ResizeHandle';
import {If} from '../../helper/If';
import styles from './SideWindowStyles.scss';

interface Props {
    className?: string;
    hideOverlay?: boolean;
}

interface State {
    parentTop: number;
    parentBottom: number;
    parentLeft: number;
    parentRight: number;
    parentWidth: number;
    width: number;
}

export class SideWindow extends React.PureComponent<Props, State> {

    // @ts-ignore: has no initializer
    private parentNode: HTMLElement;
    private originWidth: number = 400;

    constructor(props: Props) {
        super(props);
        this.state = {
            parentTop:    0,
            parentBottom: 0,
            parentLeft:   0,
            parentRight:  0,
            parentWidth:  0,
            width:        this.originWidth,
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);

        this.parentNode = ReactDOM.findDOMNode(this)!.parentElement as HTMLElement;
        this.handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        return (
            <div>
                <If cond={!this.props.hideOverlay}>
                    <div
                        className={styles.overlay}
                        style={{
                            top:    this.state.parentTop,
                            bottom: this.state.parentBottom,
                            left:   this.state.parentLeft,
                            right:  this.state.parentRight,
                        }}
                    />
                </If>
                <div className={styles.side}
                     style={{
                         width:    this.state.width,
                         maxWidth: this.state.parentWidth,
                         top:      this.state.parentTop,
                         bottom:   this.state.parentBottom,
                         right:    this.state.parentRight,
                     }}
                >
                    <ResizeHandle
                        onChangeValue={this.handleWidthChange}
                    />
                    <div className={[styles.content, this.props.className].join(' ')}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    };

    private handleWidthChange = (offset: number) => {
        this.setState(() => {
            return {
                width: this.originWidth + offset,
            };
        });
    };

    private handleResize = () => {
        this.setState(() => ({
            parentTop:    this.parentNode.offsetTop,
            parentBottom: window.innerHeight - this.parentNode.offsetTop - this.parentNode.offsetHeight,
            parentLeft:   this.parentNode.offsetLeft,
            parentRight:  window.innerWidth - this.parentNode.offsetLeft - this.parentNode.offsetWidth,
            parentWidth:  this.parentNode.offsetWidth,
        }));
    };
}
