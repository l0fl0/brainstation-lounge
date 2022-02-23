import Chat from '../components/Chat/Chat';
import Notes from '../components/Notes/Notes';
import Radio from '../components/Radio/Radio';
import Settings from '../components/Settings/Settings';
import Stack from '../components/Stack/Stack';
import ToDos from '../components/ToDos/ToDos';
import Timer from '../components/Timer/Timer';
import Users from '../components/Users/Users';
import ModalTemplate from "../components/ModalTemplate/ModalTemplate";

export const items = [
	{
		name: 'chat',
		title: 'Chat',
		iconClass: 'fa-solid fa-comment-dots user__icon',
		component: function render(props) {
			return <Chat {...props} />;
		},
		frame: 'Main',
	},
	{
		name: 'stack',
		title: 'Stack Overflow',
		iconClass: 'fa-solid fa-question user__icon',
		component: function render(props) {
			return <Stack {...props} />;
		},
		frame: 'Information',
	},
	{
		name: 'radio',
		title: 'Radio',
		iconClass: 'fa-solid fa-broadcast-tower user__icon',
		component: function render(props) {
			return <Radio {...props} />;
		},
		frame: 'Information',
	},
	{
		name: 'notes',
		title: 'Notes',
		iconClass: 'fa-solid fa-sticky-note user__icon',
		component: function render(props) {
			return <Notes {...props} />;
		},
		frame: 'Side',
	},
	{
		name: 'timer',
		title: 'Timer',
		iconClass: 'fa-solid fa-clock user__icon',
		component: function render(props) {
			return <Timer {...props} />;
		},
		frame: 'Side',
	},
	{
		name: 'todos',
		title: 'Task\'s',
		iconClass: 'fa-solid fa-tasks user__icon',
		component: function render(props) {
			return <ToDos {...props} />;
		},
		frame: 'Side',
	},
	{
		name: 'settings',
		title: 'Settings',
		iconClass: 'fa-solid fa-user-cog user__icon',
		component: function render(props) {
			return <Settings {...props} />;
		},
		frame: 'User',
	},
	{
		name: 'users',
		title: 'Users',
		iconClass: 'fa-solid fa-users user__icon',
		component: function render(props) {
			return <Users {...props} />;
		},
		frame: 'Side',
	},
	{
		name: 'addedittask',
		title: 'AddEditTask',
		iconClass: 'fa-solid fa-medal user__icon',
		component: function render(props) {
			return <ModalTemplate {...props} />;
		},
		frame: 'Modal',
	},
];
