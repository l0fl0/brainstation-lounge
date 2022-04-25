import "./MainFrame.scss";

export default function MainFrame({ frames, globalState }) {
	const { isShowItems } = globalState;

	let frameItem = null;

	const props = {
		// To pass props from parent page to component within frame (if you need to pass state between components use redux).
		// chat: { twelveHourFormat },
	};

	for (let app in isShowItems) {
		if (!frames[app]) continue;
		if (isShowItems[app]) {
			frameItem = frames[app].component(props[app]);
		}
	}
	return <div className="MainFrame">{frameItem}</div>;
}
