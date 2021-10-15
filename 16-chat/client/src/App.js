import io from 'socket.io-client'
import { useState } from 'react'
import JoinChat from './JoinChat'

const socket = io.connect('http://localhost:3001')

function App() {
  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setChat] = useState(false)

  const joinRoom = () => {
    if (userName !== '' && room !== '') {
      socket.emit('join_room', room)
      setChat(true)
    }
  }

  return (
    <div className="App">
      <JoinChat userName={userName} room={room} showChat={showChat}/>
    </div>
  )
}

export default App
