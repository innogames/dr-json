import * as React from 'react';
import styles from './ResizeHandleStyles.scss';

interface Props {
    className?: string;
    onChangeValue: (offset: number) => void;
}

interface State {
    isMoving: boolean;
    moveFrom: number;
    offset: number;
}

export class ResizeHandle extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isMoving: false,
            moveFrom: 0,
            offset:   0,
        };
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }

    render() {
        return (
            <div className={styles.sizeHandle + ' ' + this.props.className}
                 onMouseDown={this.handleSizeMouseDown}
            />
        );
    };

    private handleSizeMouseDown = (event: any) => {
        event.persist();
        this.setState(() => {
            return {
                isMoving: true,
                moveFrom: event.clientX + this.state.offset,
            };
        });
    };

    private handleMouseUp = () => {
        if (!this.state.isMoving) {
            return;
        }

        this.setState(() => {
            return {
                isMoving: false,
            };
        });
    };

    private handleMouseMove = (event: MouseEvent) => {
        if (!this.state.isMoving) {
            return;
        }

        event.preventDefault();

        const offset: number = this.state.moveFrom - event.clientX;

        this.setState(() => {
            return {
                offset: offset,
            };
        });

        this.props.onChangeValue(offset);
    };
}
