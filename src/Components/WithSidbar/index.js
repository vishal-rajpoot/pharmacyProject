import React,{ useState} from 'react'
import Sidebar from '../sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default ({isOpen}) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(isOpen)
    const styles = {
        marginLeft: isSideBarOpen ? "inherit" : "-150px",
        transition: "margin-left .5s",
    }

    function onToggleHandler() {
        setIsSideBarOpen(!isSideBarOpen)
    }

    return (
        <>
            <Sidebar onToggle={onToggleHandler} isOpen={isSideBarOpen}/>
            <div className='sideContent' style={styles}>
            <Outlet />
            </div>
            </>
            );
};