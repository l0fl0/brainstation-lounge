import './UserNav.scss';
import { useState } from 'react';
import { items } from '../../data/items';

export default function UserNav(props) {
	const { toggleItems } = props;
	const [isShowTitles, setShowTitles] = useState({});

	const toggleTitle = (item, bool) => {
		const bools = { ...isShowTitles };
		bools[item] = bool;
		setShowTitles(bools);
	};

	return (
		<nav className='user__navigation'>
			{items.map((item, i) => {
				return (
					<div
						key={i}
						className='user__icon-container'
						onClick={() => toggleItems(item.name, item.frame)}
						onMouseEnter={() => toggleTitle(item.name, true)}
						onMouseLeave={() => toggleTitle(item.name, false)}>
						<i className={item.iconClass} />
						{isShowTitles[item.name] ? <p className='user__icon-title'>{item.title}</p> : null}
					</div>
				);
			})}
		</nav>
	);
}
