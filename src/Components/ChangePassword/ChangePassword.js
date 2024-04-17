import React from 'react'
// import Outerheader from '../outerheader/Outerheader'
import Sidebar from '../sidebar/Sidebar'

const ChangePassword = () => {
    return (
        <div>
            {/* <Outerheader /> */}
            {/* <Sidebar /> */}
            <div className='flex justify-center pt-20 pl-40'>
                <div class="overflow-x-auto w-[60rem] ">
                    <table class="table w-full">

                        <thead>
                            <tr className='text-center'>
                                <th className='text-lg'>Name</th>
                                <th className='text-lg'>Role</th>
                                <th className='text-lg'>Mobile</th>
                                <th className='text-lg'>Email</th>
                                <th className='text-lg'>Change Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='text-center'>
                                <td>
                                    <div className='flex justify-center'>
                                        <div class="flex items-center space-x-3">
                                            <div class="w-8 rounded-full">
                                                <img src="./image/admin.svg" />
                                            </div>
                                            <div>
                                                <div class="font-bold">Dr. John Doe</div>
                                                <div class="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>Dentist</td>
                                <td>999558754</td>
                                <td>xyz@example.com</td>
                                <td>
                                    <label for="my-modal" className='flex justify-center'>
                                        <div class="modal-action">
                                            <label for="my-modal" class="-mt-5 btn mx-3 h-8 w-40 btn-sm hover:bg-[#082161] text-white rounded-lg'">
                                                Change Password
                                            </label>
                                        </div>
                                    </label>
                                </td>


                                <input type="checkbox" id="my-modal" class="modal-toggle" />
                                <div class="modal">
                                    <div class="modal-box">
                                        <h3 class="font-bold text-lg">Do you want to Change Password</h3>
                                        <div class="mb-4 mt-4">
                                            <label class="block text-gray-700 text-md text-left font-bold mb-2" >
                                                Old Password
                                            </label>
                                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Old Password" />
                                        </div>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 text-md text-left font-bold mb-2" >
                                                New Password
                                            </label>
                                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="New Password" />
                                        </div>
                                        <p class="py-4"></p>
                                        <div class="modal-action">
                                            <label for="my-modal" class="btn bg-gray-600 btn-sm hover:bg-[#082161]">Cancel</label>
                                            <label for="my-modal" class="btn bg-gray-600 btn-sm hover:bg-[#082161]">Update</label>
                                        </div>
                                    </div>
                                </div>

                            </tr>

                            <tr className='text-center'>
                                <td>
                                    <div className='flex justify-center'>
                                        <div class="flex items-center space-x-3">
                                            <div class="w-8 rounded-full">
                                                <img src="./image/admin.svg" />
                                            </div>
                                            <div>
                                                <div class="font-bold">Dr. John Doe</div>
                                                <div class="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>Dentist</td>
                                <td>999558754</td>
                                <td>xyz@example.com</td>
                                <td>
                                    <label for="my-modal" className='flex justify-center'>
                                        <div class="modal-action">
                                            <label for="my-modal" class="-mt-5 btn mx-3 h-8 w-40 btn-sm hover:bg-[#082161] text-white rounded-lg'">
                                                Change Password
                                            </label>
                                        </div>
                                    </label>
                                </td>
                                <input type="checkbox" id="my-modal" class="modal-toggle" />
                                <div class="modal">
                                    <div class="modal-box">
                                        <h3 class="font-bold text-lg">Do you want to Change Password</h3>
                                        <p class="py-4"></p>
                                        <div class="modal-action">
                                            <label for="my-modal" class="btn bg-gray-600 hover:bg-[#082161]">Cancel</label>
                                            <label for="my-modal" class="btn bg-gray-600 hover:bg-[#082161]">Update</label>
                                        </div>
                                    </div>
                                </div>
                            </tr>

                            <tr className='text-center'>

                                <td>
                                    <div className='flex justify-center'>
                                        <div class="flex items-center space-x-3">
                                            <div class="w-8 rounded-full">
                                                <img src="./image/admin.svg" />
                                            </div>
                                            <div>
                                                <div class="font-bold">Dr. John Doe</div>
                                                <div class="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>Dentist</td>
                                <td>999558754</td>
                                <td>xyz@example.com</td>

                                <td>
                                    <label for="my-modal" className='flex justify-center'>
                                        <div class="modal-action">
                                            <label for="my-modal" class="-mt-5 btn mx-3 h-8 w-40 btn-sm hover:bg-[#082161] text-white rounded-lg'">
                                                Change Password
                                            </label>
                                        </div>
                                    </label>
                                </td>
                                <input type="checkbox" id="my-modal" class="modal-toggle" />
                                <div class="modal">
                                    <div class="modal-box">
                                        <h3 class="font-bold text-lg">Do you want to Change Password</h3>
                                        <p class="py-4"></p>
                                        <div class="modal-action">
                                            <label for="my-modal" class="btn bg-gray-600 hover:bg-[#082161]">Cancel</label>
                                            <label for="my-modal" class="btn bg-gray-600 hover:bg-[#082161]">Update</label>
                                        </div>
                                    </div>
                                </div>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword