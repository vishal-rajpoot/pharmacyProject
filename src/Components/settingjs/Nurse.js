import React from 'react'

const Nurse = () => {
    return (
        <div>
            <div className="overflow-x-auto ">
                <table className="table-auto w-[45rem] h-[25rem] mt-3 mr-24">
                    <tr >
                        <div className='flex justify-start'>
                            <th>Module permission Nurse</th>
                        </div>
                        <th>Read</th>
                        <th>Write</th>
                        <th>Create</th>
                        <th>Delete</th>
                        <th>Import</th>
                        <th>Export</th>
                    </tr>
                    <tr style={{ textAlign: 'center' }}>
                        <td className='flex justify-start'>Appointment</td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                    </tr>
                    <tr style={{ textAlign: 'center' }}>
                        <td className='flex justify-start'>Staff</td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                    </tr>

                    <tr style={{ textAlign: 'center' }}>
                        <td className='flex justify-start'>Medicine orders</td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                    </tr>
                    <tr style={{ textAlign: 'center' }}>
                        <td className='flex justify-start'>Chat</td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                    </tr>
                    <tr style={{ textAlign: 'center' }}>
                        <td className='flex justify-start'>Patients</td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                    </tr>
                    <tr style={{ textAlign: 'center' }}>
                        <td className='flex justify-start'>Inventory</td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                    </tr>
                    <tr style={{ textAlign: 'center' }}>
                        <td className='flex justify-start'>Department</td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                    </tr>
                    <tr style={{ textAlign: 'center' }}>
                        <td className='flex justify-start'>Settings</td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                        <td><input type='checkbox' /></td>
                    </tr>
                </table>
            </div>
            <div className='flex justify-end mr-20'>
                <button type='button' className='bg-[#082161] w-[120px] h-[40px] text-[#ffffff] mt-[30px] p-[5px] rounded-md'>Save</button>
            </div>
        </div>
    )
}

export default Nurse