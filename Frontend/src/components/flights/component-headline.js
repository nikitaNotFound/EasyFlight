import React, {Component} from 'react';

class ComponentHeadline extends Component {
    render () {
        return (
            <h4>{this.props.content}</h4>
        );
    }
}

export default ComponentHeadline;