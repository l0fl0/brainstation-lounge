import React from "react";
import "./AddEditTask.scss";

export default function AddEditTask({
	currentTask,
	setCurrentTask,
	toggleItems,
}) {
	const handleSubmit = (e) => {
		e.preventDefault();

		if (currentTask) {
			const { id, completed, edited } = currentTask;
			const editedTask = {
				id,
				text: e.target[0].value,
				completed,
				edited,
			};
			setCurrentTask(editedTask);
			toggleItems("addedittask", "Modal");
		}

		if (!currentTask) {
			setCurrentTask({
				text: e.target[0].value,
			});
			toggleItems("addedittask", "Modal");
		}
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
				placeholder="please enter task"
				autoFocus
				defaultValue={currentTask ? currentTask.text : null}
			></textarea>
			<button className="modal__task-button">Done</button>
		</form>
	);
}
