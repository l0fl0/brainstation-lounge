import Chat from '../components/Frames/Main/Chat/Chat';
import Notes from '../components/Frames/Side/Notes/Notes';
import Radio from '../components/Frames/Information/Radio/Radio';
import Settings from '../components/Frames/Modal/Settings/Settings';
import Stack from '../components/Frames/Information/Stack/Stack';
import Tasks from '../components/Frames/Side/Tasks/Tasks';
import Timer from '../components/Frames/Side/Timer/Timer';

export const items = [
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
		name: 'tasks',
		title: 'Tasks',
		iconClass: 'fas fa-tasks user__icon',
		component: function render(props) {
			return <Tasks {...props} />;
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
		frame: 'Modal',
	},
];
