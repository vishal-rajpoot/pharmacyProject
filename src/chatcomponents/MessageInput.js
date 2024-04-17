import React,{useContext,useEffect,useState} from 'react';
import { sendMessage } from './firebase';
import '../style.css';

function MessageInput({ roomId }) {
    const [value, setValue] = React.useState('');
    const [user, setUser] = useState()
    const getDataFromLocalStorage = () => {
        let localuser = localStorage.getItem('user')
        localuser = JSON.parse(localuser)
        setUser(localuser)
      }
      useEffect(() => {
        getDataFromLocalStorage()
      }, [])

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(roomId, user, value);
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit} className="message-input-container">
            <input
                type="text"
                placeholder="Enter a message"
                value={value}
                onChange={handleChange}
                className="message-input"
                required
                minLength={1}
            />
            <button type="submit" disabled={value < 1} className="send-message">
                Send
            </button>
        </form>
    );
}

export { MessageInput };
