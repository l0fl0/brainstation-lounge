import { useContext, useEffect, useState } from 'react';
import { items } from '../data/items';
import { gifs } from '../data/gifs';

import './LoungePage.scss';
import HeaderFrame from '../Frames/Header/HeaderFrame';
import InformationFrame from '../Frames/Information/InformationFrame';
import MainFrame from '../Frames/Main/MainFrame';
import SideFrame from '../Frames/Side/SideFrame';
import UserFrame from '../Frames/User/UserFrame';
import { SocketContext } from '../context/socket';

export default function LoungePage() {
	const [isShowItems, setShowItems] = useState({});
	const [gifIndex, setGifIndex] = useState(0);
	const socket = useContext(SocketContext);

	const frames = {};
	items.forEach((item) => {
		if (!frames[item.frame]) frames[item.frame] = {};
		frames[item.frame][item.name] = item;
	});

	const toggleItems = (item, frame) => {
		const bools = { ...isShowItems };
		for (let frameItem in frames[frame]) {
			if (frameItem === item) continue;
			bools[frameItem] = false;
		}
		if (!bools[item]) bools[item] = true;
		else bools[item] = !bools[item];
		setShowItems(bools);
	};

	useEffect(() => {
		let token = localStorage.getItem('token');

		if (!token) {
			const username = prompt('What is your name?');
			socket.emit('join-lounge', { username });
		} else {
			socket.emit('join-lounge', { token });
		}
	}, []);

	useEffect(() => {
		socket.on('joined', (token) => {
			localStorage.setItem('token', token);
		});
	}, [socket]);

	return (
		<main className='parent-container'>
			<img src={gifs[gifIndex]} alt='gifs' className='gifs' />
			<HeaderFrame gifIndex={gifIndex} toggleItems={toggleItems} />
			<MainFrame isShowItems={isShowItems} frames={frames['Main']} />
			<SideFrame isShowItems={isShowItems} frames={frames['Side']} />
			<UserFrame setGifIndex={setGifIndex} isShowItems={isShowItems} frames={frames['User']} />
			<InformationFrame isShowItems={isShowItems} frames={frames['Information']} />
			{/* <ModalFrame frames={frames['Modal']/> */}
		</main>
	);
}
