import { useState, useEffect } from 'react/cjs/react.development'
import './Chat.scss';
import formatTime from '../../utils/formatDate';
import Message from '../Message/Message';

export default function Chat() {
    const randomMessages = [{
        user: 'Jeff',
        text: 'This is rad'
    },{
        user: 'Elliot',
        text: 'Great Vibes'
    },{
        user: 'Ginger',
        text: 'lofi homer is my favorit homer'
    },{
        user: 'Bridget',
        text: 'One more Pomodoro break anyone?'
    },{
        user: 'Bella',
        text: 'I\'m stoked for Node.js'
    },{
        user: 'Kimberly',
        text: 'the aesthetic is R e A l'
    },{
        user: 'Max',
        text: 'We need more radio stations'
    },{
        user: 'Bart',
        text: 'I will not useState I will not useState I will not useState'
    }]

    const [msgs, setMsgs] = useState([{
        user: 'Daniel',
        currentUser: false,
        text: 'Welcome to BrainStation Lounge',
        timestamp: formatTime(Date())
    }]);

    const [msgInput, setMsgInput] = useState();

    const updateInput = (event) => {
        setMsgInput(event.target.value)
    }

    useEffect(() => {
        const randomTime = (Math.floor(Math.random() * 5) + 6) * 1000;
        const id = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * randomMessages.length); 
            const {user, text} = randomMessages[randomIndex]
            setMsgs(prevMsgs => {
                const newMsgs = [...prevMsgs];
                newMsgs.unshift({
                    user: user,
                    currentUser: false,
                    text: text,
                    timestamp: formatTime(Date())
                })
                return newMsgs;
            })
            randomTime = (Math.floor(Math.random() * 5) + 6) * 1000;
        }, randomTime)
    }, [])

    const addMessage = (event) => {
        event.preventDefault();
        const message = msgInput;
        if (!message) return;

        setMsgs(prevMsgs => {
            const newMsgs = [...prevMsgs];
            newMsgs.unshift({
                user: 'Daniel',
                currentUser: true,
                text: message,
                timestamp: formatTime(Date())
            })
            event.target.chatText.value = '';
            setMsgInput('');
            return newMsgs;
        })
    }

    const messageBuilder = (msgs) => {
        const messageList = msgs.map((message, i) => {
            return (<Message key={i} message={message} isSelf={message.currentUser}/>)
        })
        return messageList;
    }

    return (
        <div className="chat">
            <div className="chat__text">
                {messageBuilder(msgs)}
            </div>
            <div className="chat__input">
                <i className="fas fa-user" />
                <form 
                    onSubmit={addMessage} 
                    className="chat__form"
                    autoComplete="off"
                >
                    <input onChange={updateInput} name="chatText" className="chat__input-field" type="text" />
                    <button type="submit" className="button button-chat">send</button>
                </form>
            </div>
        </div>
    )
}
