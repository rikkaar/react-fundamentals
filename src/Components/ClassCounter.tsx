import React, {Component} from 'react';

interface Counter {
    count: number
}

class ClassCounter extends Component<{}, Counter> {
    constructor(count: number) {
        super(count);
        this.state = {
            count: 0,
        }
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.componentWillMount = this.componentWillMount.bind(this)
    }

    componentWillMount(): void {
        this.setState({
            count: 0,
        })
    }

    increment(): void {
        this.setState({count: this.state.count + 1})
    }

    decrement(): void {
        this.setState({count: this.state.count - 1})
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.increment}>Increment</button>
                    <button onClick={this.decrement}>Decrement</button>
                </div>
                <h1>{this.state.count}</h1>
            </div>
        );
    }
}

export default ClassCounter;
