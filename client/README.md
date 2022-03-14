# BrainStation Lounge App Platform

BrainStation Lounge is more than just a place for students to hangout, chat, take notes, etc. It's a platform for students to get experience working on collaborative projects, getting code reviews, and working in an open source environment. It's our intention that anyone can build anything they want for the Lounge. This could be a game, productivity app, or just some cool CSS they want to show off.

The Lounge is built using React, React Hooks, and Socket.io.

## Terminology

### **Frame**

The key concept is that every app will get rendered inside a "frame" within the Lounge. This is a way to keep apps organized, give different options for views, and have a platform where we can add an endless amount of apps. Right now you have the option to choose between 4 different Frames:

-   **Main**: This will be the larget section of the Lounge. Good examples include: chat, video players, games, long form note taking, etc.
-   **Side**: This is a vertical section used to contain smaller apps that display notes, Users in the lounge, todo items, etc. Best for displaying information along side the Main Frame.
-   **User**: This is a small square that can be used for even smaller apps. Toggling settings, radio players, DMs, etc. Anything that doesn't need to be in focus.
-   **Information**: This is a good place to put reference items. Want to build a "Tip of the Day" app? That would be a great thing here.

### **App**

Your app can be anything you want: games, a calendar widget, a YouTube player, etc - anything you think would be useful and cool for a student lounge.

This will live inside your own Component folder and can have it's own state. The idea is that this should "live" on its own as much as possible without needing to interact or rely on state from other components outside the ones you create.

Don't worry though, if you want access to certain triggers or props, we have built a way for you to do that. You can even use to Socket.io context to make your app interactive with other Users in the Lounge.

### **Socket.io**

Socket.io is a great tool for building real-time collaborative web apps. We have some event listeners you can use already or feel free to write your own. Read more about the documention here.

## Creating New Apps

### Step 1: Adding your component to the Components folder

Add a folder called `client/src/components/MY_APP_NAME` where your app will live. You are free to organize this folder how ever you want. Make sure the name is unique and doesn't contain spaces.

We are using Sass and React to build components. Most current apps use hooks but you are free to use class components if you prefer.

### Step 2: Adding your app to the app.js array

Inside `client/src/data/apps.js` you can add the settings for your app. Make sure to import it using the following convention as well:

```
import MY_APP_NAME from '../components/MY_APP_NAME/MY_APP_NAME
```

Your settings should match the same format as the other ones:

```
{
    name: 'my_app_name', // unique name of your app
    title: 'My App Name', // title of app
    iconClass: 'fas fa-FONT_AWESOME_ICON user__icon', // Free Font-Awesome icon
    component: function render(props) { // This allows you to pass down props if needed
        return <My_APP_NAME {...props} />;
    },
    frame: 'Main', // choose which frame it will be rendered inside
	},
```

Your app icon should now appear in the tool bar at the top and when clicked will hide any other app rendered and show yours.

### Step 3 (Optional): Passing down state from LoungePage.jsx

If you want to pass down shared state between apps, you can use the following pattern.

1. It's best to keep shared state inside LoungePage. This will give you access to other.

```
const [mySharedState, setMySharedState] = useState(null);
```

2. Pass the state and/or setState handler down to the frame it's needed.

```
<Frame mySharedState={mySharedState} setMySharedState={setMySharedState} />
```

3. Add this to the propsSetting object so it get's passed down into your component.

```
const propSettings = {
		my_app_name: { mySharedState, setMySharedState },
	};
```

### Step 4 (Optional): Adding Event Listeners to Socket.io inside your app

For using Socket.io eventlisteners, you can follow this patter inside your main component:

```
// Initial call after app renders, similar to componentDidMount()
useEffect(() => {
		socket.emit('get-users'); // ask server for current users
        socket.emit('my-custom-emit-event'); // sends this to the server
	}, []);

// Event listeners for sockets, similar to componentDidUpdate()
useEffect(() => {
    // keep track of User information
    socket.on('send-users', (users) => {
        setUserState(users);
    });
    // custom event listener that your app will use, see server implementation details
    socket.on('my-custom-listen-event', (msg) => {
        console.log(msg);
    });
    // make sure to add your event listener here socket.io will remove once your app unmounts, similar to componentWillUnmount()
    return () => {
        socket.off('my-custom-listen-event');
        socket.off('send-users');
    };
}, [socket]);
```
