import React, { useState } from "react";
import "./TodoTaskList.scss";

export default function TodoTaskList({ todos, setTodos, isEditContainer }) {
	const strikeTask = (id) => {
		// change the strike then rerender
		console.log("Selected id: ", id);
		const task = todos.find((obj) => obj.id === id);
		task.selected = !task.selected;

		setTodos([...todos]);
	};

	return (
		<ul className="task-list">
			{todos.map((task) => (
				<li className="task" key={task.id}>
					<span
						className={
							task.selected ? "task__text task__text--done" : "task__text"
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
						<i className="fas fa-solid fa-pen task__action"></i>
						<i className="far fa-trash-alt task__action"></i>
					</div>
				</li>
			))}
		</ul>
	);
}
