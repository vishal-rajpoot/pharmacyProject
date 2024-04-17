import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globaldata } from '../../App';
// import Outerheader from '../outerheader/Outerheader';
import Sidebar from '../sidebar/Sidebar';


function Revenue() {
    const navigate = useNavigate()
    const { isUserLogin } = useContext(Globaldata)

    useEffect(() => {
        if (!isUserLogin()) {
            navigate('/')
        }
    }, [])
    return (
        <>
            {/* <Outerheader /> */}
            {/* <Sidebar /> */}
            <div className='ml-[220px]'>
                <div className='flex'>
                    <p className='text-[#082161] font-[700] text-xl mt-20'>Revenue</p>
                </div>
            </div>
            <div className='flex justify-around mt-4 mb-8'>
                <div className='flex flex-col ml-[120px]'>
                    <label className='text-[black] ml-[7rem] text-bold'>Category</label>
                    {/* <select className='bg-[#FFFFFF]  w-[180px] h-[40px] ml-[100px] rounded-md p-[5px] text-[#00000070] border-[#2D2AAF]'> */}
                    <select className=" block ml-[100px] px-4 h-[2rem] w-[13rem] mt-[0.5rem]  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none drop-shadow-md">
                        <option>Select</option>
                        <option>Tablet</option>
                        <option>Syrup</option>
                        <option>Tablet</option>
                        <option>Syrup</option>
                    </select>
                </div>
                <div className='flex flex-col '>
                    <label className='text-[black] ml-[7rem] text-bold'>Purchase By</label>
                    <input type="text" className="form-control block ml-[95px] px-4 h-[2rem]  w-[13rem] mt-[0.5rem] py-2  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none drop-shadow-md" />
                </div>
                <div className='flex flex-col '>
                    <label className='text-[black] ml-[7rem] text-bold'>Purchase Date</label>
                    <input type="date" className=" ml-[100px] px-4 h-[2rem]  w-[14rem] mt-[0.5rem] py-2  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none drop-shadow-md" />
                </div>
                <div>
                    <button type='button' className='bg-[#082161] w-[8rem] h-[40px] text-[#ffffff] mt-[30px] p-[5px] rounded-md'>Search</button>
                </div>
            </div>


            <div>

                <div className='flex ml-[16rem] mt-[1rem]'>
                    <table className="table-auto  w-[72rem] h-[22rem]">

                        <thead className='bg-[#66666614]'>
                            <tr className='text-center'>
                                <th>Order No.</th>
                                <th>Category</th>
                                <th>Generic Name</th>
                                <th>Brand Name</th>
                                <th>Purchase By</th>
                                <th>Purchase Date</th>
                                <th>Base Price</th>
                                <th>Selling Price</th>
                                <th>Difference</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='text-center'>
                                <td>#53665845</td>
                                <td>Tablet</td>
                                <td>alendronate tablet</td>
                                <td>Fosamax</td>
                                <td>Loren Gatlin</td>
                                <td>24 Jul 2018</td>
                                <td>3250</td>
                                <td>4000</td>
                                <td>750</td>
                            </tr>
                            <tr className='text-center'>
                                <td>#53665845</td>
                                <td>Tablet</td>
                                <td>acyclovir tablet</td>
                                <td>Zovirax</td>
                                <td>Loren Gatlin</td>
                                <td>24 Jul 2018</td>
                                <td>3250</td>
                                <td>4000</td>
                                <td>750</td>
                            </tr>
                            <tr className='text-center'>
                                <td>#53665845</td>
                                <td>Tablet</td>
                                <td>alendronate tablet</td>
                                <td>Fosamax</td>
                                <td>Loren Gatlin</td>
                                <td>24 Jul 2018</td>
                                <td>3250</td>
                                <td>4000</td>
                                <td>750</td>
                            </tr>
                            <tr className='text-center'>
                                <td>#53665845</td>
                                <td>Tablet</td>
                                <td>acyclovir tablet</td>
                                <td>Zovirax</td>
                                <td>Loren Gatlin</td>
                                <td>24 Jul 2018</td>
                                <td>3250</td>
                                <td>4000</td>
                                <td>750</td>
                            </tr>
                            <tr className='text-center'>
                                <td>#53665845</td>
                                <td>Tablet</td>
                                <td>alendronate tablet</td>
                                <td>Fosamax</td>
                                <td>Loren Gatlin</td>
                                <td>24 Jul 2018</td>
                                <td>3250</td>
                                <td>4000</td>
                                <td>750</td>
                            </tr>
                            <tr className='text-center'>
                                <td>#53665845</td>
                                <td>Tablet</td>
                                <td>alendronate tablet</td>
                                <td>Fosamax</td>
                                <td>Loren Gatlin</td>
                                <td>24 Jul 2018</td>
                                <td>3250</td>
                                <td>4000</td>
                                <td>750</td>
                            </tr>
                            <tr className='text-center'>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className='text-[#082161] text-xl text-[700]'>Total</td>
                                <td><b>29250</b></td>
                                <td><b>36000</b></td>
                                <td><b>6750</b></td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <div className='flex justify-end mr-12 mt-5'>
                    <button className="btn btn-outline btn-sm capitalize mr-[0.5rem]">Previous</button>
                    <button className="btn btn-outline bg-[#082161] text-white btn-sm mr-[0.5rem]">1</button>
                    <button className="btn btn-outline btn-sm mr-[0.5rem]">2</button>
                    <button className="btn btn-outline text-[#082161] capitalize btn-sm mr-[0.5rem]">Next</button>
                </div>
            </div>

        </>
    )
}
export default Revenue;