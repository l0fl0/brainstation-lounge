import "./MainFrame.scss";

export default function MainFrame({ frames, globalState }) {
	let frameItem = null;

	const { isShowItems, twelveHourFormat } = globalState;

	const props = {
		chat: { twelveHourFormat },
	};

	for (let app in isShowItems) {
		if (!frames[app]) continue;
		if (isShowItems[app]) {
			frameItem = frames[app].component(props[app]);
		}
	}
	return <div className="MainFrame">{frameItem}</div>;
}
