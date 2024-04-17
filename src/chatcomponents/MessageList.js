import React, { useState, useEffect, useContext } from 'react'
import { useMessages } from './useMessages'
import '../style.css'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase'
import { handleShowMore } from './firebase'

function MessageList({ roomId }) {
  // let user = { uid: '7t9KlOljdBYB69eG4A2gi5lKlFL2', displayName: 'Jalam Dangi' }
  const [user, setUser] = useState()

  const getDataFromLocalStorage = () => {
    let localuser = localStorage.getItem('user')
    localuser = JSON.parse(localuser)
    setUser(localuser)
  }

  useEffect(() => {
    getDataFromLocalStorage()
  }, [])

  // console.log(user);
  const containerRef = React.useRef(null)
  const messages = useMessages(roomId);

  // console.log(messages)

  const updateUserDoc = async () => {
    try {
      const docRef = doc(db, 'chat-rooms', roomId)
      await setDoc(docRef, {
        unread: false,
        // timestamp: serverTimestamp()
      }, {merge:true})
    } catch (error) {
      console.error(error)
    }
  }

  React.useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
    return () => updateUserDoc();
  })

  return (
    <div className="message-list-container" ref={containerRef}>
      {/* <p className='show-more-msg-btn'>Show More</p> */}
      <ul className="message-list">
        {messages.map((x) => {
          return (
            <Message key={x.id} message={x} isOwnMessage={x.user._id === user.email} />
          )
        }
        )}
      </ul>
    </div>
  )
}

function Message({ message, isOwnMessage }) {
  const { displayName, text } = message

  return (
    <li className={['message', isOwnMessage && 'own-message'].join(' ')}>
      <h4 className="sender">{isOwnMessage ? 'You' : displayName}</h4>
      <div>{text}</div>
    </li>
  )
}

export { MessageList }