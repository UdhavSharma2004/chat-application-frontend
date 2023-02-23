import './App.css';
import { useEffect, useState } from 'react';

import io from 'socket.io-client';
// import { nanoid } from 'nanoid';

const URL = 'https://chat-application-backend-wh4w.onrender.com';

const socket = io.connect(URL);

const App = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    
    socket.emit('chat', { message });
    
    setMessage('');
  }

  useEffect(() => {
    socket.on('chat', (payload) => {
      setChat([...chat, payload]);
    })
  });


  return (
    <div className="App">
      <p>Chat Application</p>
      <hr />
      <div className="chat">
        <div className="chat__messages">
          {chat.map((payload, index) => {
            return (
              <p key={index}>{payload.message}</p>
            )
          })}
        </div>
      </div>
      <form className='chat_input' onSubmit={sendMessage}>
        <input type="text"
          placeholder='Enter message'
          name="chat"
          className='message_input'
          value={message}
          autoComplete='off'
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit' className='message_button'>Send</button>
      </form>
    </div>
  );
}

export default App;
