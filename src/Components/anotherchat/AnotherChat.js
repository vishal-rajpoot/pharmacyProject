import React from 'react'

const ChatAnoter = () => {
    return (
        <div>
            <div>
                <div className="full my-16 mx-16">
                    <div className='main flex mr-40'>
                        <div className="relative w-full">
                            <div className='online box-content w-80 h-[560px] overflow-scroll'>
                                <div className='flex flex-row mx-5 justify-around sticky top-0 bg-slate-100 h-12'>
                                    <h5 className='mt-3' ><b>Patient</b></h5>
                                    <form className="flex items-center ">
                                        <label for="simple-search" className="sr-only">Search</label>
                                        <div className="relative w-full">
                                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                            </div>
                                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-8 w-40" placeholder="Search" required="" />
                                        </div>
                                    </form>
                                </div>
                                <div className="flex items-center my-5 mx-5 justify-center space-x-7 ">
                                    <img src="/image/image.svg" />
                                    <div className='flex flex-col'>
                                        <strong>Andrew Alfred</strong>
                                        <span>Technical advisor</span>
                                    </div>
                                </div>
                                <div className="flex items-center my-5 mx-5 justify-center space-x-7 ">
                                    <img src="/image/image.svg" />
                                    <div className='flex flex-col'>
                                        <strong>Andrew Alfred</strong>
                                        <span>Technical advisor</span>
                                    </div>
                                </div>
                                <div className="flex items-center my-5 mx-5 justify-center space-x-7 ">
                                    <img src="/image/image.svg" />
                                    <div className='flex flex-col'>

                                        <strong>Andrew Alfred</strong>
                                        <span>Technical advisor</span>
                                    </div>
                                </div>
                                <div className="flex items-center my-5 mx-5 justify-center space-x-7 ">
                                    <img src="/image/image.svg" />
                                    <div className='flex flex-col'>
                                        <strong>Andrew Alfred</strong>
                                        <span>Technical advisor</span>
                                    </div>

                                </div>
                                <div className="flex items-center my-5 mx-5 justify-center space-x-7 ">
                                    <img src="/image/image.svg" />
                                    <div className='flex flex-col'>
                                        <strong>Andrew Alfred</strong>
                                        <span>Technical advisor</span>
                                    </div>
                                </div>
                                <div className="flex items-center my-5 mx-5 justify-center space-x-7 ">
                                    <img src="/image/image.svg" />
                                    <div className='flex flex-col'>
                                        <strong>Andrew Alfred</strong>
                                        <span>Technical advisor</span>
                                    </div>
                                </div>
                                <div className="flex items-center my-5 mx-5 justify-center space-x-7">
                                    <img src="/image/image.svg" />
                                    <div className='flex flex-col'>
                                        <strong>Andrew Alfred</strong>
                                        <span>Technical advisor</span>
                                    </div>
                                </div>
                                <div className="flex items-center my-5 mx-5 justify-center space-x-7">
                                    <img src="/image/image.svg" />
                                    <div className='flex flex-col'>
                                        <strong>Andrew Alfred</strong>
                                        <span>Technical advisor</span>
                                    </div>
                                </div>
                                <div className="flex items-center my-5 mx-5 justify-center space-x-7">
                                    <img src="/image/image.svg" />
                                    <div className='flex flex-col'>
                                        <strong>Andrew Alfred</strong>
                                        <span>Technical advisor</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chat Header */}

                        <div className=' relative w-[800px] h-[560px] border rounded-lg shadow-lg'>
                            <div className="flex items-center justify-left space-x-7 shadow-xl rounded-t-lg relative">
                                <img className='ml-5' src="/image/image.svg" />
                                <div className='flex flex-col'>
                                    <strong>Andrew Alfred</strong>
                                    <span>Technical advisor</span>
                                </div>
                                <b><i className="absolute right-5 top-3 ri-more-2-fill"></i></b>
                            </div>

                            {/* Chat Box Footer */}

                            <div className=" my-[460px] rounded-b-lg flex items-center justify-between w-full p-3 py-2">
                                <button type="submit" className="w-10 h-10 items-center justify-center flex rounded-md" >
                                    <img src="/image/select.svg" />
                                </button>
                                <input type="text" placeholder="Type Message..."
                                    className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                                    name="message" required />
                                <button type="submit" className="bg-blue-800 w-10 h-10 items-center justify-center flex rounded-md" >
                                    <img src="/image/sent.svg" />
                                </button>
                            </div>
                        </div>


                        {/* Book Appointment */}

                        <div className=' w-[300px] h-[560px] ml-20 border rounded-lg shadow-lg relative left-[200px] bg-slate-600'>
                            <div className='flex h-12 justify-around rounded-t-lg shadow-lg w-full'>
                                <h4 className='mt-3 ml-5' ><b>Book Appointment</b></h4>
                                <img className='w-6 ml-5' src="/image/cross.svg" />
                            </div>
                            <h5 className='m-5'>Appointment</h5>
                            <div className="m-5">
                                <input type="radio" id="html" name="fav_language" value="HTML" />
                                <label className='m-3'>Appointment</label>
                                <input type="radio" id="css" name="fav_language" value="CSS" />
                                <label className='m-3'>Walk In</label>
                            </div>
                            <div className='patient Details m-5'>
                                <h6 className='mb-2'><b>Patient Name:</b> Christain Kelly</h6>
                                <h6><b>Patient ID:</b> dd411773-5e7d-4efd</h6>
                            </div>
                            <div className="flex items-center justify-center m-5">
                                <div className="datepicker relative form-floating xl:w-96">
                                    <label for="floatingInput" className="text-gray-700">Notes</label>
                                    <input type="text"
                                        className="form-control h-12 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <label for="floatingInput" className="text-gray-700 m-5">Medicine Recommendatioin <i classname="ri-add-circle-line"></i></label>
                            <div className='rounded-md ml-5 h-32 w-64 p-4 border border-slate-300'>
                                <div className='flex justify-around'>
                                    <input type="text" className='w-20 h-9 border border-slate-400 pl-[5px]' placeholder="Madicine" />
                                    <input type="text" className='w-20 h-9 border border-slate-400 pl-[5px]' placeholder="Quantity" />
                                </div>
                                <input type="text" className=' ml-4 my-5 w-48 h-9  border border-slate-400 pl-[10px]' placeholder="Notes" />

                            </div>

                            <div className='relative mx-24 bg-slate-500'>
                                <button type="button" className='absolute top-0 left-0 h-8 w-40 bg-blue-800 text-white m-5 rounded-lg'>Add Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatAnoter