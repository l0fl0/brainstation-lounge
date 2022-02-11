import { useState } from 'react';

import './HeaderFrame.scss';
import CurrentTime from '../../CurrentTime/CurrentTime';
import UserNav from '../../UserNav/UserNav';

import homer from '../../../assets/gifs/homer.gif';
import cruising from '../../../assets/gifs/cruising.gif';
import google from '../../../assets/gifs/googling.gif';
import photos from '../../../assets/gifs/photos.gif';
import study from '../../../assets/gifs/studying.gif';

export default function HeaderFrame(props) {
	const { toggleItems } = props;
	const gifs = [homer, cruising, google, photos, study];

	const [gifIndex, setGifIndex] = useState(0);

	const nextGif = () => {
		setGifIndex((prevIndex) => {
			return (prevIndex + 1) % gifs.length;
		});
	};

	const prevGif = () => {
		setGifIndex((prevIndex) => {
			if (prevIndex === 0) return gifs.length - 1;
			return (prevIndex - 1) % gifs.length;
		});
	};

	return (
		<header className='HeaderFrame'>
			<img src={gifs[gifIndex]} alt='gifs' className='gifs' />
			<h2 onClick={() => toggleItems('chat')} className='logo__title'>
				Listening: 5
			</h2>
			<div className='banner'>
				<CurrentTime twelveHourFormat={true} />
			</div>
			<UserNav toggleItems={toggleItems} />
		</header>
	);
}
