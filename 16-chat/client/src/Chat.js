import React, { useState } from 'react'

export default function Chat({ socket, userName, room }) {
  const [currentMessage, setCurrentMessage] = useState('')

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes() +
          ":" +
          new Date(Date.now()).getSeconds(),
      }

      await socket.emit('send_message', messageData)
    }
  }

  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type here"
          onChange={(event) => {
            setCurrentMessage(event.target.value)
          }}
        />
        <button onClick={sendMessage}> &#9658 </button>
      </div>
    </div>
  )
}
