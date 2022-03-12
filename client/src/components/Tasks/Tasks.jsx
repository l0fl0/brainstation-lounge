import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Tasks.scss";
import ToDoList from "./TaskList/TaskList";

export default function Tasks({ toggleItems, currentTask, setCurrentTask }) {
	let [todos, setTodos] = useState([]);
	const [isEditContainer, setIsEditContainer] = useState(false);

	const createTask = () => {
		setIsEditContainer(false);
		const newTask = {
			id: uuidv4(),
			text: currentTask.text,
			completed: false,
		};

		setTodos([newTask, ...todos]);
		setCurrentTask(null);
	};

	const editTask = () => {
		setIsEditContainer(false);
		setTodos([currentTask, ...todos]);
		setCurrentTask(null);
	};

	const openEditOptions = (e) => {
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

	//! BUG FIX THIS FUNCTION
	useEffect(() => {
		if (currentTask) {
			if (!currentTask.id) createTask();
			if (currentTask.edited) editTask();
		}
	}, [currentTask]);

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
							onClick={openEditOptions}
						>
							<i className="fa-solid fa-pen" title="edit tasks"></i>
						</button>
					)}

					<button className="todos__action" onClick={promptModal}>
						<i className="fa-solid fa-plus" title="add tasks"></i>
					</button>
				</div>
			</header>
			{todos.length <= 0 ? (
				<div className="todos__info">
					<h3>You have no saved Tasks</h3>
					<p>To add a new task click the button in the top right corner.</p>
					<p>To complete a Task simply click on the task.</p>
				</div>
			) : (
				<ToDoList
					todos={todos}
					setTodos={setTodos}
					isEditContainer={isEditContainer}
					setCurrentTask={setCurrentTask}
					toggleItems={toggleItems}
				/>
			)}
		</div>
	);
}
