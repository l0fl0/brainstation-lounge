import "./Todos.scss";
import TodoTaskList from "./TodoTaskList/TodoTaskList";

export default function Todos() {
	const newTask = (e) => {
		e.preventDefault();
		alert("new task", "Louis");
	};
	const editTasks = (e) => {
		e.preventDefault();
		alert("edit Tasks");
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
			<TodoTaskList />
		</div>
	);
}
