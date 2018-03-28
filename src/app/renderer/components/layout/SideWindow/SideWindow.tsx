import * as React from 'react';
import * as ReactDOM from 'react-dom';
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
    resizeMode: boolean;
    resizeFrom: number;
    resizeWidth: number;
}

export class SideWindow extends React.PureComponent<Props, State> {

    // @ts-ignore: has no initializer
    private parentNode: HTMLElement;

    constructor(props: Props) {
        super(props);
        this.state = {
            parentTop:    0,
            parentBottom: 0,
            parentLeft:   0,
            parentRight:  0,
            parentWidth:  0,
            width:        400,
            resizeMode:   false,
            resizeFrom:   0,
            resizeWidth:  0,
        };
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('resize', this.handleResize);

        this.parentNode = ReactDOM.findDOMNode(this).parentElement as HTMLElement;
        this.handleResize();
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
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
                         width:    this.state.resizeMode ? this.state.resizeWidth : this.state.width,
                         maxWidth: this.state.parentWidth,
                         top:      this.state.parentTop,
                         bottom:   this.state.parentBottom,
                         right:    this.state.parentRight,
                     }}
                >
                    <div className={styles.sizeHandle}
                         onMouseDown={this.handleSizeMouseDown}
                    />
                    <div className={[styles.content, this.props.className].join(' ')}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    };

    private handleSizeMouseDown = (event: any) => {
        event.persist();
        this.setState(() => {
            return {
                resizeMode:  true,
                resizeFrom:  event.clientX,
                resizeWidth: this.state.width,
            };
        });
    };

    private handleMouseUp = () => {
        if (!this.state.resizeMode) {
            return;
        }

        this.setState(() => {
            return {
                resizeMode: false,
                width:      this.state.resizeWidth,
            };
        });
    };

    private handleMouseMove = (event: MouseEvent) => {
        if (!this.state.resizeMode) {
            return;
        }

        event.preventDefault();

        this.setState(() => {
            return {
                resizeWidth: this.state.width + (this.state.resizeFrom - event.clientX),
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
