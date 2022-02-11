import './Settings.scss';
import { gifLength } from '../../data/gifs';

export default function Settings({ setGifIndex, setTwelveHourFormat }) {
	const nextGif = () => {
		setGifIndex((prevIndex) => {
			return (prevIndex + 1) % gifLength;
		});
	};

	const prevGif = () => {
		setGifIndex((prevIndex) => {
			if (prevIndex === 0) return gifLength - 1;
			return (prevIndex - 1) % gifLength;
		});
	};

	return (
		<div className='settings-wrapper'>
			<div className='time-button'>
				24 hour format
				<button
					onClick={() => {
						setTwelveHourFormat(false);
					}}>
					Yes
				</button>
			</div>
			<section className='bg-selector'>
				<i onClick={prevGif} className='fas fa-arrow-left bg-selector__icon'></i>
				{' change your vibe '}
				<i onClick={nextGif} className='fas fa-arrow-right bg-selector__icon'></i>
			</section>
			<div>Sign Out</div>
		</div>
	);
}
