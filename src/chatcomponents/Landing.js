import { Link } from 'react-router-dom'
import '../style.css'
import { useState } from 'react'
import { useEffect, useLayoutEffect } from 'react'
import Sidebar from '../Components/sidebar/Sidebar'
import Outerheader from '../Components/outerheader/Outerheader'
import AddOrder from '../Components/addorder/AddOrder'
import { ChatRoom } from './ChatRoom'
import getChatUser from '../Components/addorder/AddOrder'
import { useContext } from 'react'
import { Globaldata } from '../App'
import { useRooms } from "./useRooms";
import { FaRegComment } from 'react-icons/fa'
import { getFirestore, collection, addDoc, doc, setDoc, serverTimestamp, onSnapshot, query, orderBy, updateDoc, } from 'firebase/firestore';
import { db } from './firebase'
import { async } from '@firebase/util'

// {objectId: "FUkDF79QPp", roomId: "doctor-dSDv76FT9L", roomTitle: "doctor-jalam",…}

function Landing(props) {
  const { getChatUser, getLiveChatUserRoom } = useContext(Globaldata);
  const [currentRoomId, setCurrentRoomId] = useState("");

  let chatRooms = useRooms();
  // console.log(chatRooms)

  const getSingleRoom = (props.data)

  const [user, setUser] = useState()
  const getDataFromLocalStorage = () => {
    let localuser = localStorage.getItem('user')
    localuser = JSON.parse(localuser)
    setUser(localuser)
  }
  useEffect(() => {
    getDataFromLocalStorage()
  }, [])


  const RemoveNewMsgIndicatorFromLiveChatUser = (userroom) => {
    setCurrentRoomId(userroom.roomId);
    getLiveChatUserRoom(userroom)
    //updateUserDoc(userroom)
  }
  useEffect(() => {
    return () => {
      getLiveChatUserRoom(null)
    }
  }, [])


  const changeUreadMsgStatus = async (userroom) => {
    try {
      const docRef = doc(db, 'chat-rooms', userroom.roomId)
      await setDoc(docRef, {
        roomId: userroom.roomId,
        senderid: userroom.senderid,
        roomTitle: userroom.roomTitle,
        text: "",
        unread: false,
        // timestamp: serverTimestamp()
      },{merge:true})
    } catch (error) {
      console.error(error)
    }
  }


  if (user) {
    if (user?.uid == 'YG3aYgItIe') {
      return (
        <>
          <div className='container'>
            <ul className="chat-room-list doctor-chat-room">
              {chatRooms?.map((room) => (
                <li key={room?.roomId}>
                  <img src="/image/image.svg" className='chatroom-img' />
                  <button onClick={() => {
                    getSingleRoom(room),
                      getChatUser(room),
                      changeUreadMsgStatus(room),
                      RemoveNewMsgIndicatorFromLiveChatUser(room)
                  }}
                    className='user-btn'>{room?.roomTitle?.replace("doctor-", "")}</button>
                  {room?.unread && currentRoomId !== room?.roomId ? <span className='unreadmsg-span'>New</span> : ''}
                </li>
              ))}
            </ul>
          </div>
        </>
      )
    } else {
      const room = chatRooms.filter((room, id) => {
        return room.roomId == `${user.roomid}`
      })
      return (
        <>
          <div className='container'>
            <ul className="chat-room-list doctor-chat-room">
              {room?.map((room) => (
                <li key={room?.roomId}>
                  <img src="/image/image.svg" className='chatroom-img' />
                  <button onClick={() => getSingleRoom(room)}>{room.roomTitle}</button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )
    }
  }
}

export { Landing }