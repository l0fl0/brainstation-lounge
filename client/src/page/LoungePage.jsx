import { useContext, useEffect, useState } from "react";
import { items } from "../data/items";
import { gifs } from "../data/gifs";

import "./LoungePage.scss";
import HeaderFrame from "../Frames/Header/HeaderFrame";
import InformationFrame from "../Frames/Information/InformationFrame";
import MainFrame from "../Frames/Main/MainFrame";
import SideFrame from "../Frames/Side/SideFrame";
import UserFrame from "../Frames/User/UserFrame";
import ModalFrame from "../Frames/Modal/ModalFrame";
import { SocketContext } from "../context/socket";

export default function LoungePage() {
	const [isShowItems, setShowItems] = useState({});
	const [gifIndex, setGifIndex] = useState(0);
	const socket = useContext(SocketContext);
	const [currentTask, setCurrentTask] = useState();

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
		socket.emit("join-lounge", sessionStorage.getItem("username") || null);
	}, []);

	return (
		<main className="parent-container">
			<img src={gifs[gifIndex]} alt="gifs" className="gifs" />
			<HeaderFrame gifIndex={gifIndex} toggleItems={toggleItems} />
			<MainFrame isShowItems={isShowItems} frames={frames["Main"]} />

			<SideFrame
				isShowItems={isShowItems}
				frames={frames["Side"]}
				toggleItems={toggleItems}
				currentTaskState={{ currentTask, setCurrentTask }}
			/>
			<UserFrame
				setGifIndex={setGifIndex}
				isShowItems={isShowItems}
				frames={frames["User"]}
			/>
			<InformationFrame
				isShowItems={isShowItems}
				frames={frames["Information"]}
			/>
			<ModalFrame
				isShowItems={isShowItems}
				frames={frames["Modal"]}
				toggleItems={toggleItems}
				currentTaskState={{ currentTask, setCurrentTask }}
			/>
		</main>
	);
}
