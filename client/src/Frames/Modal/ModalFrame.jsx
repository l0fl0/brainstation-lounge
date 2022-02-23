import { useState } from "react";
import "./ModalFrame.scss";

export default function ModalFrame({ frames, isShowItems, toggleItems }) {
	let frameItem = null;

	for (let bool in isShowItems) {
		if (!frames[bool]) continue;
		if (isShowItems[bool]) {
			frameItem = frames[bool].component(null);
		}
	}

	const closeModal = (e) => {
		e.preventDefault();
		toggleItems(null, "Modal");
	};

	return (
		<>
			{frameItem ? (
				<div className="modal-frame">
					<div className="modal-frame__modal">
						{frameItem}
						<button className="modal-frame__close" onClick={closeModal}>
							<i className="fa-solid fa-times"></i>
						</button>
					</div>
				</div>
			) : null}
		</>
	);
}
