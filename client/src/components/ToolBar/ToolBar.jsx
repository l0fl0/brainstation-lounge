import "./ToolBar.scss";
import { useState } from "react";
import { apps } from "../../data/apps";

export default function ToolBar(props) {
	const { toggleItems } = props;
	const [isShowTitles, setShowTitles] = useState({});

	const toggleTitle = (item, bool) => {
		const bools = { ...isShowTitles };
		bools[item] = bool;
		setShowTitles(bools);
	};

	return (
		<nav className="user__navigation">
			{apps.map((app, i) => {
				if (app.iconClass) {
					return (
						<div
							key={i}
							className="user__icon-container"
							onClick={() => {
								toggleItems(app.name, app.frame);
							}}
							onMouseEnter={() => toggleTitle(app.name, true)}
							onMouseLeave={() => setShowTitles({})}
						>
							<i className={app.iconClass} />
							{isShowTitles[app.name] ? (
								<p className="user__icon-title">{app.title}</p>
							) : null}
						</div>
					);
				}
			})}
		</nav>
	);
}
