import './InformationFrame.scss';

export default function InformationFrame({ frames, isShowItems }) {
	let frameItem = null;

	for (let bool in isShowItems) {
		if (!frames[bool]) continue;
		if (isShowItems[bool]) {
			frameItem = frames[bool].component(null);
		}
	}
	return <div className='InformationFrame'>{frameItem}</div>;
}
