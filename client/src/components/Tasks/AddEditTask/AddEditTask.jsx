import React from "react";
import "./AddEditTask.scss";

export default function AddEditTask({ setNewTask, toggleItems }) {
	const handleSubmit = (e) => {
		e.preventDefault();
		setNewTask(e.target[0].value);
		toggleItems("addedittask", "Modal");
	};
	return (
		<form className="modal__task-form" onSubmit={handleSubmit}>
			<label className="modal__task-label" htmlFor="task">
				New Task
			</label>
			<textarea
				className="modal__task-input"
				name="task"
				id="task"
				placeholder="please enter new task"
				autoFocus
			></textarea>
			<button className="modal__task-button">Done</button>
		</form>
	);
}
