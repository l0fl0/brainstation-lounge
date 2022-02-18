import { useState } from "react";
import "./Todos.scss";
import TodoTaskList from "./TodoTaskList/TodoTaskList";

export default function Todos() {
	const [isEditContainer, setIsEditContainer] = useState(false);
	let [todos, setTodos] = useState([
		{
			id: 1,
			text: "Talk to rep from BS to become a developer",
			completed: false,
		},
		{
			id: 0,
			text: "Talk to rep from BS to become a developer",
			completed: true,
		},
	]);

	const newTask = (e) => {
		e.preventDefault();
		const task = {
			id: 2,
			text: "Test",
			completed: false,
		};
		setTodos([task, ...todos]);
	};

	const editTasks = (e) => {
		e.preventDefault();
		setIsEditContainer(!isEditContainer);
	};
	return (
		<div className="todos">
			<header className="todos__header">
				<h1 className="todos__heading">Tasks</h1>
				<div className="todos__actions">
					<button className="todos__action" onClick={newTask}>
						<i className="fa-solid fa-plus" title="add tasks"></i>
					</button>
					<button className="todos__action" onClick={editTasks}>
						<i className="fa-solid fa-pen" title="edit tasks"></i>
					</button>
				</div>
			</header>
			<TodoTaskList
				todos={todos}
				setTodos={setTodos}
				isEditContainer={isEditContainer}
			/>
		</div>
	);
}
