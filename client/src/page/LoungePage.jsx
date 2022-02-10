import { useState } from 'react';

import './LoungePage.scss';

import homer from '../assets/gifs/homer.gif';
import cruising from '../assets/gifs/cruising.gif';
import google from '../assets/gifs/googling.gif';
import photos from '../assets/gifs/photos.gif';
import study from '../assets/gifs/studying.gif';

import Timer from '../components/Timer/Timer';
import Radio from '../components/Radio/Radio';
import Stack from '../components/Stack/Stack';
import Chat from '../components/Chat/Chat';
import Notes from '../components/Notes/Notes';
import Tasks from '../components/Tasks/Tasks';
import Settings from '../components/Settings/Settings';
import HeaderFrame from '../components/Frames/Header/HeaderFrame';

export default function LoungePage() {
	const [isShowItems, setShowItems] = useState({});

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

	const toggleItems = (item) => {
		const bools = { ...isShowItems };
		if (!bools[item]) bools[item] = true;
		else bools[item] = !bools[item];
		setShowItems(bools);
	};

	return (
		<main className='parent-container'>
			<section className='gifs'>
				<img src={gifs[gifIndex]} alt='gifs' className='background-gif' />
			</section>
			<HeaderFrame toggleItems={toggleItems} />

			<section className='timer-container'>{isShowItems['timer'] ? <Timer /> : <></>}</section>
			<section className='radio-container'>{isShowItems['radio'] ? <Radio /> : <></>}</section>
			<section className='stack-container'>{isShowItems['stack'] ? <Stack /> : <></>}</section>
			<section className='chat-container'>{isShowItems['chat'] ? <Chat /> : <></>}</section>
			<section className='notes-container'>{isShowItems['notes'] ? <Notes /> : <></>}</section>
			<section className='tasks-container'>{isShowItems['tasks'] ? <Tasks /> : <></>}</section>
			<section className='settings-container'>{isShowItems['settings'] ? <Settings prevGif={prevGif} nextGif={nextGif} /> : <></>}</section>
		</main>
	);
}
