import React from "react";
import "./TaskList.scss";

// TODO: add modal popup for delete confirmation
// TODO: add edit modal for new tasks
export default function TodoTaskList({ todos, setTodos, isEditContainer }) {
	const strikeTask = (id) => {
		// change the strike then rerender
		const task = todos.find((obj) => obj.id === id);
		task.selected = !task.selected;

		setTodos([...todos]);
	};

	const deleteTask = (id) => {
		// delete the task then rerender list
		const filteredTasks = todos.filter((obj) => obj.id !== id);
		setTodos([...filteredTasks]);
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
						{/* <div onClick={() => editTask(task.id)}>
							<i className="fas fa-solid fa-pen task__action"></i>
						</div> */}

						<div onClick={() => deleteTask(task.id)}>
							<i className="far fa-trash-alt task__action"></i>
						</div>
					</div>
				</li>
			))}
		</ul>
	);
}
