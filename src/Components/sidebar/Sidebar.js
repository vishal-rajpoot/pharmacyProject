import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import './Sidebar.css';
import { useLocation } from 'react-router-dom'
import { useSideBarContext } from '../../contexts/SideBarContext'
import { Globaldata } from '../../App';

function Sidebar({onToggle,isOpen}) {
    const location = useLocation();
    const [active] = useState(location.pathname)
    const [isSideBarOpen, setIsSideBarOpen]= useState(isOpen)    
    const [dash, setDash] = useState(true);
    const {getSidebarStatus, bellNotificationStatus} = useContext(Globaldata)

    function openSideBar () {
        setIsSideBarOpen(true)
        onToggle()
    }
    function closeSideBar () {
        setIsSideBarOpen(false)
        onToggle()
    }

    useEffect(() => {
        getSidebarStatus(isSideBarOpen)
    }, [isSideBarOpen])

    return (
        <div>           
            <div className="left-0 w-[15%] p-10 pl-10 text-white fixed mt-12">
                
                <div className={!isSideBarOpen ? "noDisplaySpan" : ""}>
                    <div className={isSideBarOpen ? "noDisplaySvg" : ""}>
                        <svg
                            className="h-8 w-8 text-gray-600 relative"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            onClick={openSideBar}
                        >
                            <line x1="2" y1="4" x2="16" y2="4" />
                            <line x1="2" y1="8" x2="16" y2="8" />
                            <line x1="2" y1="12" x2="16" y2="12" />
                        </svg>
                    </div>
                    <div className={!isSideBarOpen ? "noDisplaySvg" : ""}>
                        <svg
                            className="h-8 w-8 text-gray-600 relative"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            onClick={closeSideBar}
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </div>
                    
                    <div className='relative mt-[2rem]'>
                        <Link to="/Home" className={location.pathname === "/Home" ? 'text-[#082161] font-bold' : "text-slate-500"}>
                            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute mt-[-5px] ml-[1px]'>
                                <path d="M9 1L9.49388 0.435568C9.21111 0.188144 8.7889 0.188144 8.50613 0.435567L9 1ZM1 8L0.506122 7.43557C0.34336 7.57798 0.25 7.78373 0.25 8L1 8ZM17 8L17.75 8C17.75 7.78373 17.6566 7.57798 17.4939 7.43557L17 8ZM17 18V18.75C17.1989 18.75 17.3897 18.671 17.5303 18.5303C17.671 18.3897 17.75 18.1989 17.75 18H17ZM12 18H11.25C11.25 18.4142 11.5858 18.75 12 18.75V18ZM11.1213 11.8787L11.6517 11.3483L11.6517 11.3483L11.1213 11.8787ZM6 18V18.75C6.41422 18.75 6.75 18.4142 6.75 18H6ZM1 18H0.250004C0.250005 18.4142 0.585791 18.75 1 18.75V18ZM8.50613 0.435567L0.506122 7.43557L1.49388 8.56443L9.49388 1.56443L8.50613 0.435567ZM17.4939 7.43557L9.49388 0.435568L8.50613 1.56443L16.5061 8.56443L17.4939 7.43557ZM16.25 8L16.25 18H17.75L17.75 8L16.25 8ZM17 17.25H12V18.75H17V17.25ZM12.75 18V14H11.25V18H12.75ZM12.75 14C12.75 13.0054 12.3549 12.0516 11.6517 11.3483L10.591 12.409C11.013 12.831 11.25 13.4033 11.25 14H12.75ZM11.6517 11.3483C10.9484 10.6451 9.99457 10.25 9 10.25V11.75C9.59674 11.75 10.169 11.9871 10.591 12.409L11.6517 11.3483ZM9 10.25C8.00544 10.25 7.05162 10.6451 6.34835 11.3483L7.40901 12.409C7.83097 11.9871 8.40327 11.75 9 11.75V10.25ZM6.34835 11.3483C5.64509 12.0516 5.25 13.0054 5.25 14H6.75C6.75 13.4033 6.98706 12.831 7.40901 12.409L6.34835 11.3483ZM5.25 14V18H6.75V14H5.25ZM6 17.25H1V18.75H6V17.25ZM1.75 18L1.75 8L0.25 8L0.250004 18H1.75Z" fill="#666666" />
                            </svg>
                            <span className="mt-[-5px] left-7 absolute">Dashboard</span>
                        </Link>
                    </div>

                    <div className='relative mt-[3rem]'>
                        <Link to="/Appointment" className={location.pathname === "/Appointment" ? 'text-[#082161] font-bold' : "text-slate-500"}>
                            <svg width="22" height="18" viewBox="0 0 22 19" fill="none"
                                xmlns="http://www.w3.org/2000/svg" className='absolute mt-[30px]'>
                                <path d="M18.5833 1.5H3.41667C2.22005 1.5 1.25 2.2835 1.25 3.25V15.5C1.25 16.4665 2.22005 17.25 3.41667 17.25H18.5833C19.78 17.25 20.75 16.4665 20.75 15.5V3.25C20.75 2.2835 19.78 1.5 18.5833 1.5Z" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1.25 6.75H20.75" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className='absolute left-7 mt-[27px]'>Appointment</span>
                        </Link>
                    </div>

                    <div className='relative mt-[3.5rem]'>
                        <Link to="/Staff" className={location.pathname === "/Staff" ? "text-[#082161] font-bold" : "text-slate-500"}>
                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute mt-[70px]'>
                                <path d="M15 19V17C15 15.9391 14.5786 14.9217 13.8284 14.1716C13.0783 13.4214 12.0609 13 11 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="#082161" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 9C10.2091 9 12 7.20914 12 5C12 2.79086 10.2091 1 8 1C5.79086 1 4 2.79086 4 5C4 7.20914 5.79086 9 8 9Z" stroke="#082161" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 18.9999V16.9999C20.9993 16.1136 20.7044 15.2527 20.1614 14.5522C19.6184 13.8517 18.8581 13.3515 18 13.1299" stroke="#082161" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15 1.12988C15.8604 1.35018 16.623 1.85058 17.1676 2.55219C17.7122 3.2538 18.0078 4.11671 18.0078 5.00488C18.0078 5.89305 17.7122 6.75596 17.1676 7.45757C16.623 8.15918 15.8604 8.65958 15 8.87988" stroke="#082161" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className='absolute left-7 mt-[70px]'>Staff</span>
                        </Link>
                    </div>
                    <div className='relative mt-[4rem]'>
                        <Link to="/Order" className={location.pathname === "/Order" ? 'text-[#082161] font-bold' : "text-slate-500"}>
                            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute mt-[110px]'>
                                <path d="M17 3H3C1.89543 3 1 3.89543 1 5V19C1 20.1046 1.89543 21 3 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3Z" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 1V5" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 1V5" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1 9H19" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7 15L9 17L13 13" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className='absolute left-7 mt-[110px]'>Orders</span>
                        </Link>
                    </div>

                    <div className='relative mt-[4.5rem]'>
                        <Link to='/chat' className={location.pathname === "/chat" ? 'text-[#082161] font-bold' : "text-slate-500"}>
                            <svg width="23" height="24" viewBox="0 0 23 24" fill={bellNotificationStatus ? "cyan" : "white"} xmlns="http://www.w3.org/2000/svg" className='absolute mt-[150px]' onClick={isSideBarOpen && closeSideBar }>
                                <path d="M20.1199 17.2032V20.0832C20.121 20.3505 20.0663 20.6152 19.9591 20.8601C19.852 21.1051 19.6949 21.325 19.4979 21.5058C19.3009 21.6865 19.0683 21.8241 18.8151 21.9098C18.5618 21.9954 18.2934 22.0272 18.0271 22.0032C15.0731 21.6822 12.2355 20.6728 9.74234 19.056C7.42281 17.5821 5.45626 15.6155 3.98234 13.296C2.35991 10.7915 1.35025 7.94013 1.03514 4.97278C1.01115 4.7073 1.0427 4.43975 1.12778 4.18714C1.21286 3.93452 1.3496 3.7024 1.52931 3.50553C1.70902 3.30867 1.92775 3.15138 2.17158 3.04368C2.4154 2.93598 2.67898 2.88023 2.94554 2.87998H5.82554C6.29143 2.87539 6.7431 3.04037 7.09635 3.34417C7.4496 3.64796 7.68033 4.06984 7.74554 4.53118C7.86709 5.45284 8.09253 6.35779 8.41754 7.22878C8.5467 7.57238 8.57465 7.94581 8.49809 8.30482C8.42152 8.66383 8.24364 8.99336 7.98554 9.25438L6.76634 10.4736C8.13295 12.877 10.1229 14.867 12.5263 16.2336L13.7455 15.0144C14.0065 14.7563 14.3361 14.5784 14.6951 14.5018C15.0541 14.4253 15.4275 14.4532 15.7711 14.5824C16.6421 14.9074 17.5471 15.1328 18.4687 15.2544C18.9351 15.3202 19.361 15.5551 19.6654 15.9144C19.9699 16.2737 20.1316 16.7324 20.1199 17.2032Z" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21.4391 7.79957C21.4391 8.0754 21.3295 8.33992 21.1345 8.53496C20.9395 8.73 20.6749 8.83957 20.3991 8.83957H14.1591L12.0791 10.9196V2.59957C12.0791 2.32375 12.1887 2.05922 12.3837 1.86418C12.5787 1.66914 12.8433 1.55957 13.1191 1.55957H20.3991C20.6749 1.55957 20.9395 1.66914 21.1345 1.86418C21.3295 2.05922 21.4391 2.32375 21.4391 2.59957V7.79957Z" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className='absolute left-7 mt-[150px]' onClick={isSideBarOpen ? closeSideBar : openSideBar} >Chat</span>
                        </Link>
                    </div>

                    <div className='relative mt-[5rem]'>
                        <Link to="/Patients" className={location.pathname === "/Addpatients" ? 'text-[#082161] font-bold' : "text-slate-500"} >
                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute mt-[190px]'>
                                <path d="M15 19V17C15 15.9391 14.5786 14.9217 13.8284 14.1716C13.0783 13.4214 12.0609 13 11 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 9C10.2091 9 12 7.20914 12 5C12 2.79086 10.2091 1 8 1C5.79086 1 4 2.79086 4 5C4 7.20914 5.79086 9 8 9Z" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15 9L17 11L21 7" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className='absolute left-7 mt-[190px]'>Patients</span>
                        </Link>
                    </div>

                    <div className='relative mt-[5.5rem]'>
                        <Link to='/Inventory' className={location.pathname === "/Inventory" ? 'text-[#082161] font-bold' : "text-slate-500"}>
                            <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute mt-[230px]'>
                                <path d="M11.5 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V6.5L11.5 1Z" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13 16H5" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className='absolute left-7 mt-[230px]'>Inventory</span>
                        </Link>
                    </div>

                    <div className='relative mt-[6rem]'>
                        <Link to="/Revenue" className={location.pathname === "/Revenue" ? 'text-[#082161] font-bold' : "text-slate-500"}>
                            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute mt-[270px]'>
                                <path d="M1 21H19" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4 17V10" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 17V10" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 17V10" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 17V10" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10 1L18 6H2L10 1Z" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className='absolute left-7 mt-[270px]'>Revenue</span>
                        </Link>
                    </div>

                    <div className='relative mt-[6.5rem]'>
                        <Link to="/Setting" className={location.pathname === "/Setting" ? 'text-[#082161] font-bold' : "text-slate-500"}>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute mt-[310px]'>
                                <path d="M11.22 1H10.78C10.2496 1 9.74086 1.21071 9.36579 1.58579C8.99072 1.96086 8.78 2.46957 8.78 3V3.18C8.77964 3.53073 8.68706 3.87519 8.51154 4.17884C8.33602 4.48248 8.08374 4.73464 7.78 4.91L7.35 5.16C7.04596 5.33554 6.70108 5.42795 6.35 5.42795C5.99893 5.42795 5.65404 5.33554 5.35 5.16L5.2 5.08C4.74107 4.81526 4.19584 4.74344 3.684 4.88031C3.17217 5.01717 2.73555 5.35154 2.47 5.81L2.25 6.19C1.98526 6.64893 1.91345 7.19416 2.05031 7.706C2.18717 8.21783 2.52154 8.65445 2.98 8.92L3.13 9.02C3.43228 9.19451 3.68362 9.44509 3.85905 9.74683C4.03448 10.0486 4.1279 10.391 4.13 10.74V11.25C4.1314 11.6024 4.03965 11.949 3.86405 12.2545C3.68844 12.5601 3.43521 12.8138 3.13 12.99L2.98 13.08C2.52154 13.3456 2.18717 13.7822 2.05031 14.294C1.91345 14.8058 1.98526 15.3511 2.25 15.81L2.47 16.19C2.73555 16.6485 3.17217 16.9828 3.684 17.1197C4.19584 17.2566 4.74107 17.1847 5.2 16.92L5.35 16.84C5.65404 16.6645 5.99893 16.5721 6.35 16.5721C6.70108 16.5721 7.04596 16.6645 7.35 16.84L7.78 17.09C8.08374 17.2654 8.33602 17.5175 8.51154 17.8212C8.68706 18.1248 8.77964 18.4693 8.78 18.82V19C8.78 19.5304 8.99072 20.0391 9.36579 20.4142C9.74086 20.7893 10.2496 21 10.78 21H11.22C11.7504 21 12.2591 20.7893 12.6342 20.4142C13.0093 20.0391 13.22 19.5304 13.22 19V18.82C13.2204 18.4693 13.3129 18.1248 13.4885 17.8212C13.664 17.5175 13.9163 17.2654 14.22 17.09L14.65 16.84C14.954 16.6645 15.2989 16.5721 15.65 16.5721C16.0011 16.5721 16.346 16.6645 16.65 16.84L16.8 16.92C17.2589 17.1847 17.8042 17.2566 18.316 17.1197C18.8278 16.9828 19.2645 16.6485 19.53 16.19L19.75 15.8C20.0147 15.3411 20.0866 14.7958 19.9497 14.284C19.8128 13.7722 19.4785 13.3356 19.02 13.07L18.87 12.99C18.5648 12.8138 18.3116 12.5601 18.136 12.2545C17.9604 11.949 17.8686 11.6024 17.87 11.25V10.75C17.8686 10.3976 17.9604 10.051 18.136 9.74549C18.3116 9.43994 18.5648 9.18621 18.87 9.01L19.02 8.92C19.4785 8.65445 19.8128 8.21783 19.9497 7.706C20.0866 7.19416 20.0147 6.64893 19.75 6.19L19.53 5.81C19.2645 5.35154 18.8278 5.01717 18.316 4.88031C17.8042 4.74344 17.2589 4.81526 16.8 5.08L16.65 5.16C16.346 5.33554 16.0011 5.42795 15.65 5.42795C15.2989 5.42795 14.954 5.33554 14.65 5.16L14.22 4.91C13.9163 4.73464 13.664 4.48248 13.4885 4.17884C13.3129 3.87519 13.2204 3.53073 13.22 3.18V3C13.22 2.46957 13.0093 1.96086 12.6342 1.58579C12.2591 1.21071 11.7504 1 11.22 1V1Z" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span href="#Setting" className='absolute left-7 mt-[310px]'>Settings</span>
                        </Link>
                    </div>
                </div>
          
            </div>  
        </div>
    )
}
export default Sidebar;