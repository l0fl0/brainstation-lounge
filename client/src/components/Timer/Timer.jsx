import { useState } from "react";
import "./Timer.scss";

function Timer() {
	const initialState = {
		time: 0.1,
		hasStarted: false,
		timerID: null,
	};

	const [state, setState] = useState(initialState);

	const setTimer = (event, initialTime) => {
		event.preventDefault();
		let time = initialTime || event.target.time.value || 15;

		console.log(time);
		// setinterval to run every 1s
		const intervalID = setInterval(() => {
			setState((prevState) => {
				if (prevState.time <= 0) {
					clearInterval(intervalID);
					return initialState;
				}
				return {
					...prevState,
					time: prevState.time - 1,
				};
			});
		}, 1000);
		setState({
			time: time * 60,
			hasStarted: true,
			timerID: intervalID,
		});
	};

	const cancelTimer = () => {
		clearInterval(state.timerID);
		setState(initialState);
	};

	if (!state.hasStarted) {
		return (
			<div className="timer">
				<h1 className="timer__title">Timer</h1>
				<form className="timer__form" onSubmit={setTimer}>
					<span className="timer__span">mins</span>
					<input
						className="timer__input"
						type="number"
						name="time"
						min="1"
						placeholder="15"
					/>
					<button className="timer__button" type="submit">
						Set
					</button>
				</form>
				<button
					className="timer__button timer__button--study"
					onClick={(event) => setTimer(event, 25)}
				>
					25 Study
				</button>
				<button
					className="timer__button timer__button--break"
					onClick={(event) => setTimer(event, 5)}
				>
					5 Break
				</button>
			</div>
		);
	}
	let mins = String(Math.floor(state.time / 60)).padStart(2, "0");
	let secs = String(state.time % 60).padStart(2, "0");
	return (
		<div className="timer">
			<h1 className="timer__time">
				{mins}:{secs}
			</h1>
			<button className="timer__button" onClick={cancelTimer}>
				Cancel
			</button>
		</div>
	);
}

export default Timer;
