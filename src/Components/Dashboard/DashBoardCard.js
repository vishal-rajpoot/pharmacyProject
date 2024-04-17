import React,{ useState,useEffect } from 'react'
// import Outerheader from '../outerheader/Outerheader'
import Sidebar from '../sidebar/Sidebar'
import appointSVG from "./appointment.svg"
import dashboardSVG from "./dashboard.svg"
import newPatients from './newPatients.svg'

const DashBoardCard = ({appointmentCount,orderCount,NewPatientCount}) => {

    
    return (
        <div>
            {/* <Outerheader /> */}

            {/* TODO : Move this sidebar component to Dashboard Component. It is kept as interim solution. */}
            {/* <Sidebar /> */}
            <div className=" ml-48 py-0 pt-16 pb-0 ">
                <h5 className='flex justify-start mx-16 mb-5'><b>Dashboard</b></h5>
                <div className='relative flex justify-start gap-[5.65rem] mx-14 -z-10'>
                    <div className=" ml-2 flex justify-between flex-row h-[6rem] w-48 bg-white relative border-x-2 border-gray-200">
                        <div className='ml-1 mt-2'>
                            <img alt='dashboard' src={dashboardSVG} />
                        </div>
                        <div className='mr-1 mt-2'>
                            <p>Appointments</p>
                            <p className='ml-5'>{appointmentCount}</p>
                        </div>
                        <div className='absolute  bottom-0 mt-30 w-full h-5 bg-violet-500'></div>
                    </div>
                    <div className="flex justify-between flex-row h-[6rem] w-48 bg-white relative border-x-2 border-gray-200">
                        <div className='ml-1 mt-2'>
                            <img alt='appointment' src={appointSVG} />
                        </div>
                        <div className='mr-1 mt-2'>
                            <p>Revenue</p>
                            <p className='ml-5'>$ 6750</p>
                        </div>
                        <div className='absolute  bottom-0 mt-30 w-full h-5 bg-[#FD7E14]'></div>
                    </div>
                    <div className="flex justify-between flex-row h-[6rem] w-48 bg-white relative border-x-2 border-gray-200">
                        <div className='ml-1 mt-2'>
                            <img alt='New Patients' src={newPatients} />
                        </div>
                        <div className='mr-1 mt-2'>
                            <p>New Patients</p>
                                <p className='ml-5'>{NewPatientCount}</p>
                        </div>
                        <div className='absolute  bottom-0 mt-30 w-full h-5 bg-[#198754]'></div>
                    </div>
                    <div className="flex justify-between flex-row h-[6rem] w-48 bg-white relative border-x-2 border-gray-200">
                        <div className='ml-1 mt-2'>
                            <svg width="50" height="50" viewBox="0 0 80 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_0_1)">
                                    <rect x="10" y="6" width="60" height="48" rx="8" fill="#0D6EFD" />
                                </g>
                                <path d="M32.1657 36.1663H29.6166C29.2486 36.1674 28.8865 36.0733 28.5656 35.8932C28.2447 35.7132 27.9757 35.4532 27.7849 35.1385C27.6016 34.8225 27.5047 34.4638 27.5039 34.0985C27.5031 33.7331 27.5984 33.374 27.7802 33.0572L32.3944 25.083" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M36.834 36.1665H46.4041C46.7704 36.1637 47.1297 36.0666 47.4477 35.8848C47.7656 35.703 48.0314 35.4424 48.2195 35.1282C48.4002 34.813 48.4953 34.456 48.4953 34.0927C48.4953 33.7294 48.4002 33.3725 48.2195 33.0573L46.7892 30.584" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M40.334 32.667L36.834 36.167L40.334 39.667" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M33.6757 29.8617L32.3959 25.083L27.6172 26.364" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M34.9004 20.7795L36.1756 18.5722C36.3587 18.253 36.6212 17.9865 36.9376 17.7987C37.254 17.6108 37.6136 17.5079 37.9816 17.5C38.3467 17.4993 38.7055 17.5947 39.0221 17.7765C39.3387 17.9584 39.6019 18.2203 39.7852 18.536L44.3854 26.5195" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M39.6074 25.2389L44.3861 26.5199L45.6659 21.7412" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <defs>
                                    <filter id="filter0_d_0_1" x="0" y="0" width="80" height="68" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="4" />
                                        <feGaussianBlur stdDeviation="5" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                        <div className='mr-1 mt-2'>
                            <p>orders</p>
                            <p className='ml-5'>{orderCount}</p>
                        </div>
                        <div className='absolute  bottom-0 mt-30 w-full h-5 bg-[#0D6EFD]'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoardCard
