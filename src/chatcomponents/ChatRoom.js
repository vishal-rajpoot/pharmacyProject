import { useParams } from 'react-router-dom'
// import { chatRooms } from '../../data/chatRooms';
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'
import '../style.css'
import { useState, useEffect, useContext } from 'react'
import AddOrder from '../Components/addorder/AddOrder'

function ChatRoom(props) {
  // console.log(props.data)
  const params = useParams()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState('Loading..')
  const [renderPage, setRenderPage] = useState('appointment')

  const getDataFromLocalStorage = () => {
    let localuser = localStorage.getItem('user')
    localuser = JSON.parse(localuser)
    setUser(localuser)
  }
  useEffect(() => {
    getDataFromLocalStorage()
  }, [])
  // console.log(user)

  let room = props.data;

  if (!room) {
    // TODO: 404
  }
  // console.log(room) 
  if (room) {

    return (
      <>
        <div className='container'>
          <div className='chat-header-title'>
            {room?.roomTitle.slice(7)}
            <label className="chat-header-appointment-btn modal-button" htmlFor="my-modal-3">
              Appointment/Walkin
            </label>
          </div>
          <div className="messages-container">
            <MessageList roomId={room?.roomId} />
            <MessageInput roomId={room?.roomId} />
          </div>
        </div>

        {/* model box code for order processing and book appointment */}
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box w-11/12 max-w-5xl order-process-model">
            <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <div className="text-lg model-body">
              <AddOrder></AddOrder>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export { ChatRoom }
