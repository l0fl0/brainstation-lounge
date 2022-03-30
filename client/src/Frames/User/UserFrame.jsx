import "./UserFrame.scss";

export default function UserFrame({ frames, globalState }) {
	let {
		isShowItems,
		twelveHourFormat,
		setTwelveHourFormat,
		gifIndex,
		setGifIndex,
	} = globalState;

	const props = {
		settings: { twelveHourFormat, setTwelveHourFormat, gifIndex, setGifIndex },
	};

	const frameItems = [];

	for (let app in isShowItems) {
		if (!frames[app]) continue;
		let className = "UserFrame__Container";
		if (isShowItems[app]) {
			className += " UserFrame__Container--Show";
		}
		frameItems.push(
			<div key={app} className={className}>
				{frames[app].component(props[app])}
			</div>
		);
	}
	return <div className="UserFrame">{frameItems}</div>;
}
