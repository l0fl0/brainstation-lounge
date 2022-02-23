import './UserFrame.scss';

export default function UserFrame({ frames, isShowItems, setGifIndex }) {
	const frameItems = [];

	const propSettings = {
		settings: { setGifIndex },
	};

	for (let app in isShowItems) {
		if (!frames[app]) continue;
		let className = 'UserFrame__Container';
		if (isShowItems[app]) {
			className += ' UserFrame__Container--Show';
		}
		frameItems.push(
			<div key={app} className={className}>
				{frames[app].component(propSettings[app])}
			</div>
		);
	}
	return <div className='UserFrame'>{frameItems}</div>;
}
