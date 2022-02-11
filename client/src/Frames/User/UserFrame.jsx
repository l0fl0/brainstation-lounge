import './UserFrame.scss';

export default function UserFrame({ frames, isShowItems, setGifIndex }) {
	let frameItem = null;

	const propSettings = {
		settings: { setGifIndex },
	};

	for (let bool in isShowItems) {
		if (!frames[bool]) continue;
		if (isShowItems[bool]) {
			frameItem = frames[bool].component(propSettings[bool]);
		}
	}
	return <div className='UserFrame'>{frameItem}</div>;
}
