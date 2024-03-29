import './HeaderFrame.scss';
import CurrentTime from '../../components/CurrentTime/CurrentTime';
import ToolBar from '../../components/ToolBar/ToolBar';

export default function HeaderFrame({ toggleItems }) {
	return (
		<header className='HeaderFrame'>
			<h2 onClick={() => toggleItems('chat')} className='logo__title'>
				Listening: 5
			</h2>
			<div className='banner'>
				<CurrentTime />
			</div>
			<ToolBar toggleItems={toggleItems} />
		</header>
	);
}
