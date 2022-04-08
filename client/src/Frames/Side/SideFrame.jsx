import "./SideFrame.scss";

export default function SideFrame({ frames, toggleItems, globalState }) {
	let frameItem = null;

	const { isShowItems, twelveHourFormat, currentTask, setCurrentTask } =
		globalState;

	const props = {
		tasks: { toggleItems, currentTask, setCurrentTask },
		notes: { twelveHourFormat },
	};

	for (let app in isShowItems) {
		if (!frames[app]) continue;
		if (isShowItems[app]) {
			frameItem = frames[app].component(props[app]);
		}
	}
	return <div className="SideFrame">{frameItem}</div>;
}
