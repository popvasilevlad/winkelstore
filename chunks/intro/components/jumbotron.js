import React, { PureComponent } from 'react';

export default class Jumotron extends PureComponent {
    constructor(props) {
        super()
        this.state = props
    }

    render() {
        return (
            <div className="jumbotron-content">
                <h1>Let us be your inventory assistant</h1>
                <h2>Keep track of inward and outward flow of stocks along with reason and other details.</h2>
            </div>
        )
    }
}
