import './HeaderFrame.scss';
import CurrentTime from '../../CurrentTime/CurrentTime';
import UserNav from '../../UserNav/UserNav';

export default function HeaderFrame(props) {
	const { toggleItems } = props;

	return (
		<header className='HeaderFrame'>
			<h2 onClick={() => toggleItems('chat')} className='logo__title'>
				Listening: 5
			</h2>
			<div className='banner'>
				<CurrentTime twelveHourFormat={true} />
			</div>
			<UserNav toggleItems={toggleItems} />
		</header>
	);
}
