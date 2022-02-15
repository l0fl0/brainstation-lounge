import './SideFrame.scss';

export default function SideFrame({ frames, isShowItems }) {
	let frameItem = null;

	for (let bool in isShowItems) {
		if (!frames[bool]) continue;
		if (isShowItems[bool]) {
			frameItem = frames[bool].component(null);
		}
	}
	return <div className='SideFrame'>{frameItem}</div>;
}
