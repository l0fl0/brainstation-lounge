import "./SideFrame.scss";

export default function SideFrame({
	frames,
	isShowItems,
	toggleItems,
	currentTaskState,
}) {
	let frameItem = null;
	const { currentTask, setCurrentTask } = currentTaskState;
	const propSettings = {};

	for (let bool in isShowItems) {
		if (!frames[bool]) continue;
		if (isShowItems[bool]) {
			frameItem = frames[bool].component({
				toggleItems,
				currentTask,
				setCurrentTask,
			});
		}
	}
	return <div className="SideFrame">{frameItem}</div>;
}
