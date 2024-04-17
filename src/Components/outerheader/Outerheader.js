import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import Logo from "./Logo.svg";
import { useRooms } from "../../chatcomponents/useRooms";
import NotificationSound from './Notification sound 2.wav';
import { Globaldata } from '../../App';

function Outerheader({ currentchatroom }) {
    const { getNotificationSatus } = useContext(Globaldata)
    const audioPlayer = useRef(null);
    // console.log(NotificationSound)
    // console.log(currentchatroom)
    const navigate = useNavigate()
    const [isThereAnyUnreadMsg, setisThereAnyUnreadMsg] = useState(false)
    let chatRooms = useRooms();

    useEffect(() => {
        for (let i = 0; i < chatRooms.length; i++) {
            if (currentchatroom == null) {
                if (chatRooms[i].unread == true) {
                    setisThereAnyUnreadMsg(true)
                    playAudio()
                    break
                }
            } else {
                if (chatRooms[i].unread == true && chatRooms[i].roomId !== currentchatroom.roomId) {
                    setisThereAnyUnreadMsg(true)
                    playAudio()
                    break
                }
            }
            setisThereAnyUnreadMsg(false)
        }
    }, [chatRooms])


    const logOut = () => {
        reactLocalStorage.remove("sessionToken");
        navigate("/");
    }

    const userObject = localStorage.getItem("user")
    const userObjectCurrent = {}
    userObjectCurrent.displayName = userObject ? JSON.parse(userObject).displayName : "user"

    // function for notification sound when new message will come
    function playAudio() {
        // console.log('sound execute')
        audioPlayer.current.play();
    }

    useEffect(() => {
        getNotificationSatus(isThereAnyUnreadMsg)
    }, [isThereAnyUnreadMsg])

    return (
        <div>
            <div className="fixed navbar bg-base-100 h-[3rem]">
                <div className="flex-1">
                    <img src={Logo} width={60} className="ml-[50px] mt-3" />
                    <h3 className='text-[#082161] text-xl'><b>Quantifine Pharmacy</b></h3>
                    <audio ref={audioPlayer} src={NotificationSound} />
                </div>
                <div>
                    <input type='text' placeholder="search here....." className="mt-3 searchhere absolute top-2 left-[30rem]" />
                </div>

                <div className="flex-none gap-2">
                    <div>
                        <img src="/image/chatIcon.svg" alt="" />
                    </div>
                    <div className="indicator mx-3">
                        <svg width="22" height="22" viewBox="0 0 20 17" fill={isThereAnyUnreadMsg ? '#D22429' : 'white'} xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 7C16 5.4087 15.3679 3.88258 14.2426 2.75736C13.1174 1.63214 11.5913 1 10 1C8.4087 1 6.88258 1.63214 5.75736 2.75736C4.63214 3.88258 4 5.4087 4 7C4 14 1 16 1 16H19C19 16 16 14 16 7Z" stroke="#082161" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="w-8 rounded-full">
                        <img src="/image/admin.svg" />
                    </div>
                    <div className='my-0 mx-3'>
                        <p><b>{userObjectCurrent.displayName}</b></p>
                        <p>Admin</p>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex="0" className='mr-5'>
                            <img src="/image/adminDropdown.svg" style={{ height: '20px', width: '20px' }} />
                        </label>
                        <ul tabIndex="0" id='tabindex' className=" mr-5 p-2 shadow menu menu-compact dropdown-content rounded-box w-52 bg-slate-200">
                            <li><i className="hover:bg-[#082161] hover:text-white ri-file-user-fill ">My Profile</i></li>
                            <li><i className="hover:bg-[#082161] hover:text-white ri-lock-fill">Change Password</i></li>
                            <li><i className="hover:bg-[#082161] hover:text-white ri-settings-fill">Settings</i></li>
                            <li onClick={logOut}><i className='text-red-700 hover:bg-[#082161] hover:text-white ri-logout-box-r-fill'>Logout</i></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Outerheader;