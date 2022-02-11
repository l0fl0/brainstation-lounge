import { useState } from 'react';
import { items } from '../data/items';
import { gifs } from '../data/gifs';

import './LoungePage.scss';
import HeaderFrame from '../components/Frames/Header/HeaderFrame';
import InformationFrame from '../components/Frames/Information/InformationFrame';
import Settings from '../components/Settings/Settings';

export default function LoungePage() {
	const [isShowItems, setShowItems] = useState({});
	const [gifIndex, setGifIndex] = useState(0);

	const frames = {};
	items.forEach((item) => {
		if (!frames[item.frame]) frames[item.frame] = {};
		frames[item.frame][item.name] = item;
	});

	const toggleItems = (item, frame) => {
		const bools = { ...isShowItems };
		for (let frameItem in frames[frame]) {
			bools[frameItem] = false;
		}
		if (!bools[item]) bools[item] = true;
		else bools[item] = !bools[item];
		setShowItems(bools);
	};

	return (
		<main className='parent-container'>
			<img src={gifs[gifIndex]} alt='gifs' className='gifs' />
			<HeaderFrame gifIndex={gifIndex} toggleItems={toggleItems} />
			{/* <MainFrame frames={frames['Main']} /> */}
			{/* <SideFrame frames={frames['Side']/> */}
			{/* <UserFrame frames={frames['User']/> */}
			<InformationFrame isShowItems={isShowItems} frames={frames['Information']} />
			{/* <ModalFrame frames={frames['Modal']/> */}

			<section className='settings-container'>{isShowItems['settings'] ? <Settings setGifIndex={setGifIndex} /> : <></>}</section>
		</main>
	);
}
