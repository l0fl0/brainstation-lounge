import React, { useState } from "react";
import "./TodoTaskList.scss";

export default function TodoTaskList() {
	let [todos, setTodos] = useState([
		{
			id: 0,
			task: "Talk to rep from BS to become a developer",
			selected: false,
		},
		{
			id: 1,
			task: "Talk to rep from BS to become a developer",
			selected: true,
		},
	]);

	const strikeTask = (id) => {
		// strike the todo that is cheked
		todos[id].selected = !todos[id].selected;
	};

	return (
		<ul className="task-list">
			{todos.map((task) => (
				<li className="task">
					<span
						className={task.selected ? "task__text--done" : "task__text"}
						onClick={() => strikeTask(task.id)}
					>
						{task.text}
					</span>

					<div className="task__actions-container">
						<i className="fas fa-solid fa-pen task__action"></i>
						<i className="far fa-trash-alt task__action"></i>
					</div>
				</li>
			))}
		</ul>
	);
}
