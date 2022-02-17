import "./Todos.scss";
import TodoTaskList from "./TodoTaskList/TodoTaskList";

export default function Todos() {
	return (
		<div className="todos">
			<h1 className="todos__header">Tasks</h1>
			<TodoTaskList />
		</div>
	);
}
