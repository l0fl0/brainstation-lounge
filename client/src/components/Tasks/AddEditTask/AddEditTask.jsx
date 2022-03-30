import React from "react";
import "./AddEditTask.scss";

export default function AddEditTask({
	currentTask,
	setCurrentTask,
	toggleItems,
}) {
	const handleSubmit = (e) => {
		e.preventDefault();

		// handle on keydown enter or on sumbit
		let taskValue;
		if (e.target.id === "taskForm") taskValue = e.target[0].value;
		if (e.target.id === "taskInput") taskValue = e.target.value;

		// for editing task
		if (currentTask) {
			const editedTask = {
				id: currentTask.id,
				text: taskValue,
				edited: true,
			};
			setCurrentTask(editedTask);
			toggleItems("addedittask");
		}

		// for creating new task
		if (!currentTask) {
			setCurrentTask({
				text: taskValue,
			});
			toggleItems("addedittask");
		}
	};

	const onEnter = (e) => {
		if (e.key === "Enter") {
			e.stopPropagation();
			handleSubmit(e);
		}
	};

	return (
		<form id="taskForm" className="modal__task-form" onSubmit={handleSubmit}>
			<label className="modal__task-label" htmlFor="taskInput">
				{currentTask ? "Edit" : "New"} Task
			</label>
			<textarea
				className="modal__task-input"
				name="taskInput"
				id="taskInput"
				placeholder="please enter task"
				autoFocus
				defaultValue={currentTask ? currentTask.text : null}
				onKeyDown={onEnter}
			></textarea>
			<button className="modal__task-button">Done</button>
		</form>
	);
}
