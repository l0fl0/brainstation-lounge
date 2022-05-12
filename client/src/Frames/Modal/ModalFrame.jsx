import "./ModalFrame.scss";

export default function ModalFrame({
	frames,
	isShowItems,
	toggleItems,
	currentTaskState,
}) {
	const { currentTask, setCurrentTask } = currentTaskState;

	let frameItem = null;

	const props = {
		tasks: { toggleItems, currentTask, setCurrentTask },
	};

	for (let bool in isShowItems) {
		if (!frames[bool]) continue;
		if (isShowItems[bool]) {
			frameItem = frames[bool].component({
				toggleItems,
				currentTask,
				setCurrentTask,
			});
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
