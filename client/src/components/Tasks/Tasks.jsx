import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Tasks.scss";
import ToDoList from "./TaskList/TaskList";

export default function Tasks({ toggleItems, newTask, setNewTask }) {
	let [todos, setTodos] = useState([]);
	const [isEditContainer, setIsEditContainer] = useState(false);

	const createTask = () => {
		setIsEditContainer(false);
		const task = {
			id: uuidv4(),
			text: newTask,
			completed: false,
		};
		setTodos([task, ...todos]);
		setNewTask(null);
	};

	const editTasks = (e) => {
		e.preventDefault();
		setIsEditContainer(!isEditContainer);
	};

	const promptModal = () => {
		toggleItems("addedittask", "Modal");
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

	//toDo items by creating new task watching for change in props
	useEffect(() => {
		if (newTask) {
			createTask();
		}
	}, [newTask]);

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

					<button className="todos__action" onClick={promptModal}>
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
