import { useState } from 'react/cjs/react.development'
import './Chat.scss';
import formatTime from '../../utils/formatDate';
import Message from '../Message/Message';

export default function Chat() {
    const [msgs, setMsgs] = useState([{
        user: 'Louis',
        currentUser: false,
        text: 'This is a test message',
        timestamp: formatTime(Date())
    }]);

    const addMessage = (event) => {
        event.preventDefault();
        setMsgs(prevMsgs => {
            const newMsgs = [...prevMsgs];
            newMsgs.push({
                user: 'Daniel',
                currentUser: true,
                text: event.target.chatText.value,
                timestamp: formatTime(Date())
            })
            event.target.reset();
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
                    <input name="chatText" className="chat__input-field" type="text" />
                    <button type="submit" className="button button-chat">send</button>
                </form>
            </div>
        </div>
    )
}
