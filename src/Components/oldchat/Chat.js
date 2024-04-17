import React, { useState, useEffect, useContext } from "react";
import AddOrder from "../addorder/AddOrder";
import { Landing } from "../../chatcomponents/Landing";
import { ChatRoom } from "../../chatcomponents/ChatRoom";
import { useNavigate } from "react-router-dom";
import '../../style.css'
import { Globaldata } from "../../App";
import { db } from '../../chatcomponents/firebase';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

const Chat = () => {
  const navigate = useNavigate()
  const {isUserLogin} = useContext(Globaldata)
  const [chat, setChat] = useState('Click on patient and start chat..')
  const [roomdata, setroomdata] = useState()

  const getSingleRoom = (parameter) => {
    setroomdata(parameter)
  }

  useEffect(() => {
    if (!isUserLogin()) {
      navigate('/')
    }
  }, [])

  return (
    <div>
      <div className="full pt-20">
        <div className="main flex mr-10 ml-10">
          <div className="online box-content ml-[15rem] h-[560px]  overflow-auto">
            <div className="flex flex-row mx-5 justify-around  sticky top-0 bg-slate-100 h-12">
              <h5 className="mt-3">
                <b>Patient</b>
              </h5>
              <form className="flex items-center ">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-8"
                    placeholder="Search"
                    required=""
                  />
                </div>
              </form>
            </div>
            <Landing data={getSingleRoom}></Landing>
          </div>

          <div className="h-[560px] border rounded-lg shadow-lg relative" style={{width:'60%'}}>
            <ChatRoom data={roomdata}></ChatRoom>
          </div>

          {/* Book Appointment and Place Order*/}
          {/* <AddOrder /> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;