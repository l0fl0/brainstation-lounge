import "./Tasks.scss";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskCard from "./TaskCard/TaskCard";

export default function Tasks({ toggleItems, currentTask, setCurrentTask }) {
	const [todos, setTodos] = useState([]);
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
		// find, edit, then rerender
		let editedTask = todos.find((task) => task.id === currentTask.id);
		editedTask.text = currentTask.text;
		setTodos([...todos]);
		setCurrentTask(null);
	};

	const deleteTask = (id) => {
		// delete the task then rerender list
		const filteredTasks = todos.filter((obj) => obj.id !== id);
		setTodos([...filteredTasks]);
		setCurrentTask(null);
	};

	const strikeTask = (id) => {
		// flip the boolean then rerender
		const task = todos.find((obj) => obj.id === id);
		task.completed = !task.completed;
		setTodos([...todos]);
	};

	const openEditor = (task) => {
		// sets state on loungePage to pass to modal frame
		setCurrentTask(task);
		toggleItems("addedittask");
	};

	const toggleEditOptions = (e) => {
		e.preventDefault();
		setIsEditContainer(!isEditContainer);
	};

	const promptModal = () => {
		toggleItems("addedittask");
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

	useEffect(() => {
		//To update storage
		localStorage.setItem("tasks", JSON.stringify(todos));
	}, [todos]);

	useEffect(() => {
		// If currentTask is updated
		if (currentTask) {
			if (!currentTask.text) deleteTask(currentTask.id);
			if (!currentTask.id && currentTask.text) createTask();
			if (currentTask.edited && currentTask.text) editTask();
		}
	}, [currentTask]);

	return (
		<div className="todos">
			<header className="todos__header">
				<h2 className="todos__heading">Tasks</h2>
				<div className="todos__actions">
					{/* if no todos remove edit button */}
					{todos.length < 1 ? null : (
						<button
							className={
								isEditContainer
									? "todos__action todos__action--active"
									: "todos__action"
							}
							onClick={toggleEditOptions}
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
				<ul className="task-list">
					{todos.map((task) => (
						<TaskCard
							key={task.id}
							strikeTask={strikeTask}
							deleteTask={deleteTask}
							openEditor={openEditor}
							isEditContainer={isEditContainer}
							task={task}
						/>
					))}
				</ul>
			)}
		</div>
	);
}
