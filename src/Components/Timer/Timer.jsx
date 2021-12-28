import { useState, useEffect } from 'react'
import './Timer.scss'

function Timer() {
    const initialState = {
        time: 0.1,
        hasStarted: false,
        timerID: null
    }

    const [ state, setState ] = useState(initialState)

    const setTimer = (event, initialTime) => {
        event.preventDefault();
        let time = initialTime || event.target.time.value;
        
        console.log(time)
        // setinterval to run every 1s
        const intervalID = setInterval(() => {
            setState(prevState => {
                if (prevState.time <= 0) {
                clearInterval(intervalID);
                return initialState;
            }
                return {
                    ...prevState,
                    time: prevState.time - 1,
                }
            })
            
        }, 1000)
        setState({
            time: time * 60,
            hasStarted: true,
            timerID: intervalID
        })
    }

    const cancelTimer = () => {
        clearInterval(state.timerID);
        setState(initialState)
    }

    if (!state.hasStarted) {
        return (
                <div className='timer'>
                    <h1>Timer</h1>
                    <form onSubmit={setTimer}>
                        <input className='timer__input' type="number" name="time" placeholder='5'/>
                        <button type="submit">Set Timer</button>
                    </form>
                    <button onClick={(event) => setTimer(event, 25)}>25 Min Study</button>
                    <button onClick={(event) => setTimer(event, 5)}>5 Min Break</button>
                </div>
        )
    }
    return (
        <div className="timer">
            <h1>{Math.floor(state.time / 60)}:{state.time % 60}</h1>
            <button onClick={cancelTimer}>Cancel Timer</button>
        </div>
    )

    
}

export default Timer;
