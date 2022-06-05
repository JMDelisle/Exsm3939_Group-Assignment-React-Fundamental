import React, { Component } from 'react';
import './App1.js';
import './App.css';


class Timer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: props.active,
            mounted: false,
            seconds: Number(props.start ?? 0),
            timer: setInterval(() => {
                if (this.state.mounted && this.props.active) {
                    this.setState((oldState) => {
                        return { seconds: oldState.seconds + 1 };
                    });
                }
            }, 1000)

        };
    }

    componentDidMount() {
        this.setState({
            mounted: true
        });
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                {this.state.seconds}
            </div>

        );
    }
}

export default Timer;