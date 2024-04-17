import React from 'react'
// import Outerheader from '../outerheader/Outerheader'

const MyProfile = () => {
    return (
        <div>
            {/* <Outerheader /> */}
            <div className="h-[51px] w-full bg-slate-500">   </div>
            <div className="left-0 w-[15%] bg-slate-800 h-full fixed"> </div>
            <div>
                <h4 className='mx-60 my-10 text-blue-900'><b>My Profile</b></h4>

                <div className='w-[700px] h-[400px] mx-60 relative '>
                    <div className='flex justify-between items-center mx-5 py-12'>
                        <div className="card card-compact w-60 h-80">
                            <div className='flex flex-col items-center justify-center my-8' >
                                <img src="/image/admin.svg" className='w-20 h-20 mb-3' />
                                <p><b>Admin</b></p>
                            </div>
                            <div className="card-body">
                                <h2 className="card-title">Description</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </div>
                        <div className="card card-compact w-80 h-80">
                            <div className='mx-10 my-2 mb-5' >
                                <p><b>Contect Information</b></p>
                            </div>
                            <div className="flex justify-start mx-10">
                                <i className="ri-phone-fill mr-5"></i>
                                <p>9895835356</p>
                            </div>
                            <div className="flex justify-start mx-10">
                                <i className="ri-map-pin-line mr-5"></i>
                                <p> Lorem Ipsum </p>
                            </div>
                            <div className="flex justify-start mx-10">
                                <i className="ri-mail-line mr-5"></i>
                                <p>admin@example.com</p>
                            </div>
                        </div>
                    </div>
                    <button type="button" className='absolute -top-20 -right-40 h-8 w-40 bg-blue-800 text-white m-5 rounded-lg'>+ Edit Profile</button>
                </div>
            </div>

        </div>
    )
}

export default MyProfile