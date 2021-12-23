import { Component } from 'react'
import './TimerInput.scss'

class TimerInput extends Component {
    state = {
        time: 0,
        hasStarted: false
    }

    setTimer = (event) => {
        event.preventDefault();
        
        this.setState({
            time: event.target.time.value * 60,
            hasStarted: true
        })
        
        // setinterval to run every 1s
        const intervalID = setInterval(() => {
            let newTime = this.state.time - 1;
            this.setState({
                time: newTime
            })
            if (this.state.time < 0) {
                this.setState({
                    time: 0,
                    hasStarted: false
                })
                clearInterval(intervalID);
            }
        }, 1000)

        this.setState({
            timerID: intervalID
        })
        
    }

    cancelTimer = () => {
        clearInterval(this.state.timerID)
        this.setState({
            time: 0,
            hasStarted: false
        })
    }

    render() {
        if (!this.state.hasStarted) {
            return (
                    <div className='TimerInput'>
                        <h1>Timer</h1>
                        <form onSubmit={this.setTimer}>
                            <input type="number" name="time" placeholder='5 mins'/>
                            <button type="submit">Test</button>
                        </form>
                    </div>
            )
        }
        return (
            <div className="timer">
                <h1>{Math.floor(this.state.time / 60)}:{this.state.time % 60}</h1>
                <button onClick={this.cancelTimer}>Cancel Timer</button>
            </div>
        )

    }
}

export default TimerInput;
