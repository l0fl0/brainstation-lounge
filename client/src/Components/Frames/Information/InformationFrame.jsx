import './InformationFrame.scss';

export default function InformationFrame({ frames, isShowItems }) {
	// console.log(frames);

	return (
		<div className='InformationFrame'>
			{isShowItems['radio'] ? frames.radio.component(null) : <></>}
			{isShowItems['stack'] ? frames.stack.component(null) : <></>}
			InformationFrame
		</div>
	);
}
