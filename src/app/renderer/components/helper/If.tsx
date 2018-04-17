import * as React from 'react';

interface Props {
    cond: boolean | undefined;
}

export class If extends React.PureComponent<Props, {}> {

    render() {
        if (this.props.cond) {
            return (this.props.children as any);
        }

        return null;
    }
}
