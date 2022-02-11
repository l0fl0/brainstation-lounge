import { useState } from 'react';
import { items } from '../data/items';

import './LoungePage.scss';
import HeaderFrame from '../components/Frames/Header/HeaderFrame';

export default function LoungePage() {
	const [isShowItems, setShowItems] = useState({});

	const toggleItems = (item) => {
		const bools = { ...isShowItems };
		if (!bools[item]) bools[item] = true;
		else bools[item] = !bools[item];
		setShowItems(bools);
	};

	return (
		<main className='parent-container'>
			<HeaderFrame toggleItems={toggleItems} />

			{items.map((item, i) => {
				return <section className={`${item.name}-container`}>{isShowItems[item.name] ? item.component : <></>}</section>;
			})}
		</main>
	);
}
