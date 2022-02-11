import './MainFrame.scss';

export default function MainFrame({ frames, isShowItems }) {
	let frameItem = null;

	for (let bool in isShowItems) {
		if (!frames[bool]) continue;
		if (isShowItems[bool]) {
			frameItem = frames[bool].component(null);
		}
	}
	return <div className='MainFrame'>{frameItem}</div>;
}
