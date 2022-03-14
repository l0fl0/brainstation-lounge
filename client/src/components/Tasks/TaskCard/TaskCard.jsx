import "./TaskCard.scss";
import React from "react";

// TODO: add modal popup for delete confirmation
export default function TaskCard({
	strikeTask,
	deleteTask,
	openEditor,
	isEditContainer,
	task,
}) {
	return (
		<li className="task" key={task.id}>
			<span
				className={
					task.completed ? "task__text task__text--done" : "task__text"
				}
				onClick={() => strikeTask(task.id)}
			>
				{task.text}
			</span>

			<div
				className={
					isEditContainer
						? "task__actions-container task__actions-container--show"
						: "task__actions-container"
				}
			>
				<div onClick={() => openEditor(task)}>
					<i className="fa-solid fa-pen task__action task__action--edit"></i>
				</div>

				<div onClick={() => deleteTask(task.id)}>
					<i className="fa-solid fa-trash task__action"></i>
				</div>
			</div>
		</li>
	);
}
