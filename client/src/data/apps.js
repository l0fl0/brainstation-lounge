import Chat from '../components/Chat/Chat';
import DMs from '../components/DMs/DMs';
import Notes from '../components/Notes/Notes';
import Radio from '../components/Radio/Radio';
import Settings from '../components/Settings/Settings';
import Stack from '../components/Stack/Stack';
import Tasks from '../components/Tasks/Tasks';
import Timer from '../components/Timer/Timer';
import Users from '../components/Users/Users';
import AddEditTask from "../components/Tasks/AddEditTask/AddEditTask";


export const apps = [
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
		name: 'tasks',
		title: 'Task\'s',
		iconClass: 'fa-solid fa-tasks user__icon',
		component: function render(props) {
			return <Tasks {...props} />;
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
		iconClass: null,
		component: function render(props) {
			return <AddEditTask {...props} />;
		},
		frame: 'Modal',
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
