const MessageSetItem = ({ message }) => {

    let date = message.message_timestamp.replace(/[-]/g, '/');
    date = date.split(/[T]/);
    let dateToShow = date[0]


    return (
        <>
            <ul className="message-ul" key={message.message_text}>
                <span className="message-with-tag">
                    <div className="message-by">{message.message_user_name}</div>
                    {message.message_text}
                </span>
                <span className="time-stamp">{dateToShow}</span>
            </ul>
        </>
    )



}
export default MessageSetItem