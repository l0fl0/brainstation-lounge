import React from "react";
import "./TaskList.scss";

// TODO: add modal popup for delete confirmation
// TODO: add edit modal for new tasks
export default function TodoTaskList({
	todos,
	setTodos,
	isEditContainer,
	toggleItems,
	setCurrentTask,
}) {
	const strikeTask = (id) => {
		// change the strike then rerender
		const task = todos.find((obj) => obj.id === id);
		task.completed = !task.completed;

		setTodos([...todos]);
	};

	const deleteTask = (id) => {
		// delete the task then rerender list
		const filteredTasks = todos.filter((obj) => obj.id !== id);
		setTodos([...filteredTasks]);
	};

	const editTask = (task) => {
		task.edited = true;
		setCurrentTask(task);
		toggleItems("addedittask", "Modal");
	};

	return (
		<ul className="task-list">
			{todos.map((task) => (
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
						<div onClick={() => editTask(task)}>
							<i className="fa-solid fa-pen task__action task__action--edit"></i>
						</div>

						<div onClick={() => deleteTask(task.id)}>
							<i className="fa-solid fa-trash task__action"></i>
						</div>
					</div>
				</li>
			))}
		</ul>
	);
}
