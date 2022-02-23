import React from "react";
import "./ModalTemplate.scss";
export default function ModalTemplate() {
	return (
		<form className="modal__task-form">
			<label className="modal__task-label" htmlFor="task">
				New Task
			</label>
			<textarea
				className="modal__task-input"
				name="task"
				id="task"
				placeholder="please enter new task"
			></textarea>
			<button className="modal__task-button">Done</button>
		</form>
	);
}
