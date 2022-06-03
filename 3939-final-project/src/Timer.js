import React, { Component } from 'react';
import './App1.js';
import './App.css';
 

class Timer extends Component {

    constructor(props) {
        super(props);
        
        this.state = { seconds:0};       
        
        
       this.state = {
            seconds: Number(props.start??0),
            timer: setInterval(() => {
                this.setState((oldState)=>{
                    return {seconds: oldState.seconds + 1};});}, 1000)
     };
       
    }

componentWillUnmount()
{

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