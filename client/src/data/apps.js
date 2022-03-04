import Chat from '../components/Chat/Chat';
import DMs from '../components/DMs/DMs';
import Notes from '../components/Notes/Notes';
import Radio from '../components/Radio/Radio';
import Settings from '../components/Settings/Settings';
import Stack from '../components/Stack/Stack';
import Todos from '../components/Todos/Todos';
import Timer from '../components/Timer/Timer';
import Users from '../components/Users/Users';

export const apps = [
	{
		name: 'chat',
		title: 'Chat',
		iconClass: 'fas fa-comment-dots user__icon',
		component: function render(props) {
			return <Chat {...props} />;
		},
		frame: 'Main',
	},
	{
		name: 'stack',
		title: 'Stack Overflow',
		iconClass: 'fas fa-question user__icon',
		component: function render(props) {
			return <Stack {...props} />;
		},
		frame: 'Information',
	},
	{
		name: 'radio',
		title: 'Radio',
		iconClass: 'fas fa-broadcast-tower user__icon',
		component: function render(props) {
			return <Radio {...props} />;
		},
		frame: 'Information',
	},
	{
		name: 'notes',
		title: 'Notes',
		iconClass: 'far fa-sticky-note user__icon',
		component: function render(props) {
			return <Notes {...props} />;
		},
		frame: 'Side',
	},
	{
		name: 'timer',
		title: 'Timer',
		iconClass: 'far fa-clock user__icon',
		component: function render(props) {
			return <Timer {...props} />;
		},
		frame: 'Side',
	},
	{
		name: 'todos',
		title: 'Todos',
		iconClass: 'fas fa-tasks user__icon',
		component: function render(props) {
			return <Todos {...props} />;
		},
		frame: 'Side',
	},
	{
		name: 'settings',
		title: 'Settings',
		iconClass: 'fas fa-user-cog user__icon',
		component: function render(props) {
			return <Settings {...props} />;
		},
		frame: 'User',
	},
	{
		name: 'users',
		title: 'Users',
		iconClass: 'fas fa-users user__icon',
		component: function render(props) {
			return <Users {...props} />;
		},
		frame: 'Side',
	},
	{
		name: 'dms',
		title: 'Messages',
		iconClass: 'fas fa-message user__icon',
		component: function render(props) {
			return <DMs {...props} />;
		},
		frame: 'User',
	},
];