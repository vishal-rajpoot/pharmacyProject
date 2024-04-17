import React from 'react'
// import Outerheader from '../outerheader/Outerheader'

const AddDetails = () => {
    return (
        <div>
            {/* <Outerheader /> */}
            <div className="h-[51px] w-full bg-slate-500">   </div>
            <div className="left-0 w-[15%] bg-slate-800 h-full fixed"> </div>
            <div>
                <div className='w-[60vw] max-h-full mt-12 mx-[500px] relative'>
                    <h4 className=' text-blue-900 mx-5 py-2'><b>Add Details</b></h4>
                    <div className='w-32 h-10 flex justify-around mb-5' >
                        <img src="/image/admin.svg" className='w-10 h-10 mb-3 mx-5' />
                        <img src="/image/change.svg" className='w-10 h-10 mb-3 mx-5' />
                        
                    </div>


                    <form class="w-full max-w-lg mx-8">
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3">
                                <label class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2" for="grid-last-name">
                                    First Name
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9" id="grid-last-name" type="text" />
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                                <label class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2" for="grid-last-name">
                                    Last Name
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9" id="grid-last-name" type="text" />
                            </div>
                        </div>

                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3">
                                <label class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2" for="grid-state">
                                    Gender
                                </label>
                                <div class="relative">
                                    <select class="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-600 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9" id="grid-state">
                                        <option>Select</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                                <label class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2" for="grid-last-name">
                                    Mobile No
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9" id="grid-last-name" type="text" placeholder='+63' />
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3">
                                <label class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2" for="grid-last-name">
                                    Date of Birth
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9" id="grid-last-name" type="text" placeholder='dd/mm/yy'/>
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                                <label class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2" for="grid-last-name">
                                    Email
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9" id="grid-last-name" type="text" />
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2" for="grid-password">
                                    Address
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9" id="grid-password" type="text" />
                            </div>
                        </div>
                        <button type="button" className='h-8 w-40 bg-blue-800 text-white rounded-lg mb-10'>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddDetails