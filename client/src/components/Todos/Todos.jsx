import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./ToDos.scss";
import ToDoList from "./ToDoList/ToDoList";

export default function ToDos() {
	let [todos, setTodos] = useState([]);
	const [isEditContainer, setIsEditContainer] = useState(false);

	const newTask = (e) => {
		setIsEditContainer(false);
		e.preventDefault();
		const task = {
			id: uuidv4(),
			text: prompt("Please enter task"),
			completed: false,
		};
		setTodos([task, ...todos]);
	};

	const editTasks = (e) => {
		e.preventDefault();
		setIsEditContainer(!isEditContainer);
	};

	useEffect(() => {
		// set up localstorage
		if (!localStorage.getItem("tasks")) {
			localStorage.setItem("tasks", "[]");
		}
		setTodos(JSON.parse(localStorage.getItem("tasks")));

		return () => {
			setIsEditContainer(false);
		};
	}, []);

	//To update storage (componentWillUpdate)
	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(todos));
	}, [todos]);

	return (
		<div className="todos">
			<header className="todos__header">
				<h1 className="todos__heading">Tasks</h1>
				<div className="todos__actions">
					{/* if no todos remove edit button */}
					{todos.length < 1 ? null : (
						<button
							className={
								isEditContainer
									? "todos__action todos__action--active"
									: "todos__action"
							}
							onClick={editTasks}
						>
							<i className="fa-solid fa-pen" title="edit tasks"></i>
						</button>
					)}

					<button className="todos__action" onClick={newTask}>
						<i className="fa-solid fa-plus" title="add tasks"></i>
					</button>
				</div>
			</header>
			<ToDoList
				todos={todos}
				setTodos={setTodos}
				isEditContainer={isEditContainer}
			/>
		</div>
	);
}
