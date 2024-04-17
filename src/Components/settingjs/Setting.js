import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Globaldata } from '../../App'
import Admin from './Admin'
import Doctor from './Doctor'
import Nurse from './Nurse'
import Pharmacist from './Pharmacist'

const Settting = () => {
    const navigate = useNavigate()
    const { isUserLogin } = useContext(Globaldata)
    const [page, setPage] = useState(<Admin></Admin>)

    useEffect(() => {
        if (!isUserLogin()) {
            navigate('/')
        }
    }, [])
    return (
        <div>
            {/* <Sidebar /> */}
            {/* <Outerheader /> */}
            <div className='flex ml-[16rem]'>
                <p className='text-xl  text-[#082161] mt-20 font-[700]'>Setting</p>
            </div>
            <div className='flex justify-between ' >
                <div className="container w-[10rem] h-[15rem] ml-72 bg-white-100" >
                    <h5 className='flex flex-col items-center justify-center py-5 text-blue-900'><b>Roles & Permissions</b></h5>
                    <div className='flex flex-col items-left justify-center text-slate-500' >
                        <h5 onClick={() => setPage(<Admin></Admin>)} className='mb-3  hover:text-[#082161]'>Admin</h5>
                        <h5 onClick={() => setPage(<Nurse></Nurse>)} className='mb-3  hover:text-[#082161]'>Nurse</h5>
                        <h5 onClick={() => setPage(<Doctor></Doctor>)} className='mb-3  hover:text-[#082161]'>Doctor</h5>
                        <h5 onClick={() => setPage(<Pharmacist></Pharmacist>)} className='mb-3  hover:text-[#082161]'>Pharmacist</h5>
                    </div>
                </div>
                {page}
            </div>
        </div>
    )
}

export default Settting