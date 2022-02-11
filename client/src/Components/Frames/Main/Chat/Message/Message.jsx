import './Message.scss'

export default function Message({ message, isSelf }) {
    const {user, text, timestamp} = message;
    return (
        <div className={isSelf ? "message message--self": "message"}>
            <p className="message__user">{user}</p>
            <p className="message__text">{text}</p>
            <p className="message__time">{timestamp}</p>
        </div>
    )
}
