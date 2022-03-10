import "./SideFrame.scss";

export default function SideFrame({
	frames,
	isShowItems,
	toggleItems,
	newTask,
	setNewTask,
}) {
	let frameItem = null;

	const propSettings = {};

	for (let bool in isShowItems) {
		if (!frames[bool]) continue;
		if (isShowItems[bool]) {
			frameItem = frames[bool].component({ toggleItems, newTask, setNewTask });
		}
	}
	return <div className="SideFrame">{frameItem}</div>;
}
