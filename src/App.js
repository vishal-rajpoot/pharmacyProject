
import Login from './Components/login/Login'
import Header from './Components/header/Header';
import Resetpasswrd from './Components/resetpasswrd/Resetpasswrd';
import Entercode from './Components/enterverificationcode/Entercode'
import Newpassword from './Components/createnewpassword/Newpassword';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import Sidebar from './Components/sidebar/Sidebar';
import Appointment from './Components/appointment/Appointments';
import Dashboard from './Components/Dashboard/Dashboard';
import 'remixicon/fonts/remixicon.css'
import './index.css'
import Staff from './Components/staff/Staff';
import Addstaff from './Components/addStaff/Addstaff';
import Editstaff from './Components/editStaff/Editstaff';
import Order from './Components/order/Order';
import Patients from './Components/patients/Patients';
import Patientsform from './Components/AddPatientsForm/Patientsform'
import Editpatientsform from './Components/editPatientsform/Editpatientsform';
import Revenue from './Components/revenue/Revenue';
import Inventory from './Components/inventory/Inventory'
import Addinventory from './Components/addinventory/Addinventory'
import Editinventory from './Components/editinventory/Editinventory'
import Medicineorder from './Components/medicineorder/Medicineorder';
import Chat from './Components/oldchat/Chat';
import Oldchat from './Components/oldchat/Oldchat'
import Setting from './Components/settingjs/Setting'
import Outerheader from './Components/outerheader/Outerheader';
import Myprofile from './Components/myprofile/Myprofile';
import Modal from './Components/modal/Modal'
import ChangePassword from './Components/ChangePassword/ChangePassword';
import EditAppointment from './Components/editappointment/EditAppointment'
import './index.css'
import { reactLocalStorage } from 'reactjs-localstorage';
import AddOrder from './Components/addorder/AddOrder';
import { Landing } from './chatcomponents/Landing'
import { ChatRoom } from './chatcomponents/ChatRoom'
import SideBarContextProvider from './contexts/SideBarContext';
import { useSideBarContext } from './contexts/SideBarContext';
import WithOutsideBar from './Components/WithOutSideBar';
import WithSidbar from './Components/WithSidbar';

import './style.css'
import React, { useState, useEffect } from 'react';
import { createContext, useReducer } from 'react';
import { reducer } from './context/reducer'

export const Globaldata = createContext()

const headers = {
  'Content-Type': 'application/json',
  "X-Parse-Application-Id": process.env.REACT_APP_XPARSE_APPLICATION_ID,
  "X-Parse-REST-API-key": process.env.REACT_APP_XPARSE_REST_API_KEY,
};
const client = new GraphQLClient({
  //cache: memCache({ size: 10, ttl: 3600000 }),
  url: process.env.REACT_APP_GRAPHQL_URL,
  headers
})

let chatuser;
const initialState = {
  chatuser,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [chatRooms, setChatRooms] = useState()
  const [chat_room_ids, set_chat_room_ids] = useState('')
  const [userCurrentChatroom, setuserCurrentChatroom] = useState('')
  const [sidebarStatus, setSidebarStatus] = useState()
  const [bellNotificationStatus, setBellNotificationStatus] = useState()

  const getDataFromLocalStorage = () => {
    let localchatrooms = localStorage.getItem('chatrooms')
    localchatrooms = JSON.parse(localchatrooms)
    setChatRooms(localchatrooms)
  }
  useEffect(() => {
    getDataFromLocalStorage()
  }, [])
  // console.log(chatRooms)

  if (reactLocalStorage.get('sessionToken')) {
    client.setHeader("X-Parse-Session-Token", reactLocalStorage.get('sessionToken'));
  }
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const styles = {
    marginLeft: isSideBarOpen ? "inherit" : "-150px",
    transition: "margin-left .5s",
  }

  const getChatUser = (chatuser) => {
    return dispatch({
      type: "GET_CHAT_USER",
      payload: chatuser,
    });
  };

  const getLiveChatUserRoom = (userroom) => {
    setuserCurrentChatroom(userroom)
  }

  const getSidebarStatus = (sidebarstatus) => {
    setSidebarStatus(sidebarstatus)
  }

  const getNotificationSatus = (status) => {
    setBellNotificationStatus(status)
  }


  const isUserLogin = () => {
    let sessionToken = localStorage.getItem('sessionToken')
    if (sessionToken) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className="App">
      <Globaldata.Provider
        value={{
          state,
          getChatUser,
          getLiveChatUserRoom,
          isUserLogin,
          getSidebarStatus,
          getNotificationSatus,
          sidebarStatus,
          userCurrentChatroom,
          bellNotificationStatus
        }}>
        <ClientContext.Provider value={client}>
          <Router>
            <Outerheader currentchatroom={userCurrentChatroom} />
            {/* <Header /> */}
            {/* <AddOrder/> */}

            <Routes>
              <Route element={<WithOutsideBar />}>
                <Route path="/" element={<Login />} />
                <Route path="/Resetpasswrd" element={<Resetpasswrd />} />
                <Route path="/Entercode" element={<Entercode />} />

                <Route path="/Newpassword" element={<Newpassword />} />
              </Route>
              {/* <div className='sideContent' style={styles}>           */}
              <Route element={<WithSidbar isOpen={true} currentchatroom={userCurrentChatroom} />}>
                <Route path="/Home" element={<Dashboard />} />
                <Route path="/Staff" element={<Staff />} />
                <Route path="/Staff/page=:pageNumber" element={<Staff />} />
                <Route path="/Addstaff" element={<Addstaff />} />
                <Route path="/Editstaff/:id" element={<Editstaff />} />
                <Route path="/oldchat" element={<Oldchat />} />

                {/* chat routing start-------------------------------------------------------- */}
                <Route path="/chathome" element={<Landing />} />
                {/* chat routing end------------------------------------------------------------ */}

                <Route path="/Order" element={<Medicineorder />} />
                <Route path="/Order/page=:pageNumber" element={<Medicineorder />} />
                <Route path="/Patients" element={<Patients />} />
                <Route path="/Patients/page=:pageNumber" element={<Patients />} />
                <Route path="/Patientsform" element={<Patientsform />} />
                <Route path="/Editpatients/:id" element={<Editpatientsform />} />
                <Route path="/Revenue" element={<Revenue />} />
                <Route path="/Inventory" element={<Inventory sidebarstatus={sidebarStatus}></Inventory>} />
                <Route path="/Inventory/page=:pageNumber" element={<Inventory sidebarstatus={sidebarStatus} />} />
                <Route path="/AddInventory" element={<Addinventory />} />
                <Route path="/Editinventory/:id" element={<Editinventory />} />
                <Route path="/Setting" element={<Setting />} />
                <Route path="/Modal" element={<Modal />} />
                <Route path="/MyProfile" element={<Myprofile />} />

                <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="/Appointment" element={<Appointment />} />
                <Route path="/editappointment/:id" element={<EditAppointment />} />
              </Route>
              <Route element={<WithSidbar isOpen={false} />}>
                <Route path="/chat" element={<Chat />} />
              </Route>

            </Routes>

          </Router>
        </ClientContext.Provider>
      </Globaldata.Provider>

    </div>
  );
}

export default App;

