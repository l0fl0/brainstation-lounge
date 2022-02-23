import './UserFrame.scss';

export default function UserFrame({ frames, isShowItems, setGifIndex }) {
	const frameItems = [];

	const propSettings = {
		settings: { setGifIndex },
	};

	for (let bool in isShowItems) {
		if (!frames[bool]) continue;
		let className = 'UserFrame__Container';
		if (isShowItems[bool]) {
			className += ' UserFrame__Container--Show';
		}
		frameItems.push(<div className={className}>{frames[bool].component(propSettings[bool])}</div>);
	}
	return <div className='UserFrame'>{frameItems}</div>;
}
