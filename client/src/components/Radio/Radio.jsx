import { useState } from "react";
import "./Radio.scss";

export default function Radio() {
	const [autoplay, setAutoPlay] = useState(0);
	const [station, setStation] = useState(0);

	const stations = [
		{
			url: "https://www.youtube.com/embed/MCkTebktHVc?controls=0&autoplay=",
			title: "24/7 lofi hip hop radio",
		},
		{
			url: "https://www.youtube.com/embed/36YnV9STBqc?controls=0&autoplay=",
			title: "The Good Life Radio",
		},
		{
			url: "https://www.youtube.com/embed/5qap5aO4i9A?controls=0&autoplay=",
			title: "lofi beats to relax/study to",
		},
	];

	const prevStation = () => {
		playStation();
		setStation((prevStation) => {
			if (prevStation === 0) return stations.length - 1;
			return (prevStation - 1) % stations.length;
		});
	};

	const playStation = () => {
		setAutoPlay(1);
	};

	const pauseStation = () => {
		setAutoPlay(0);
	};

	const nextStation = () => {
		playStation();
		setStation((prevStation) => (prevStation + 1) % stations.length);
	};

	return (
		<div className="radio">
			<iframe
				className="radio__player"
				title="Brain Station Radio"
				width="100"
				height="100"
				src={stations[station].url + autoplay}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			></iframe>
			<h1 className="radio__title">{stations[station].title}</h1>
			<div>
				<button className="radio__button" onClick={prevStation}>
					<i className="fa-solid fa-backward"></i>
				</button>
				{autoplay === 1 ? (
					<button className="radio__button" onClick={pauseStation}>
						<i className="fa-solid fa-pause"></i>
					</button>
				) : (
					<></>
				)}
				{autoplay === 0 ? (
					<button className="radio__button" onClick={playStation}>
						<i className="fa-solid fa-play"></i>
					</button>
				) : (
					<></>
				)}
				<button className="radio__button" onClick={nextStation}>
					<i className="fa-solid fa-forward"></i>
				</button>
			</div>
		</div>
	);
}
