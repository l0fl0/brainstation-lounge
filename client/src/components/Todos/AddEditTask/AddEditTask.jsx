import React from "react";
import "./AddEditTask.scss";
export default function AddEditTask({ createNewTask }) {
	return (
		<form
			className="modal__task-form"
			onSubmit={(e) => createNewTask(e.target[0].value)}
		>
			<label className="modal__task-label" htmlFor="task">
				New Task
			</label>
			<textarea
				className="modal__task-input"
				name="task"
				id="task"
				placeholder="please enter new task"
				// onChange={textChangeHandler}
				autoFocus
			></textarea>
			<button className="modal__task-button">Done</button>
		</form>
	);
}
