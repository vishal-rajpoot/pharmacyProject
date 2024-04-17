import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
// import Outerheader from '../outerheader/Outerheader';
import Sidebar from '../sidebar/Sidebar';
import { ClientContext } from 'graphql-hooks';
import { useQuery } from 'graphql-hooks';
import dateFormat from "dateformat";
import { useNavigate, useLocation } from 'react-router-dom';
import { ADD_PATIENT_MEMBER } from "../AddPatientsForm/Patientsform"

const GET_PATIENT_QUERY = `
query GET_PATIENT_QUERY {
    users {
      edges {
        node {
          full_name
          joining_date
          username
          mobile
          address
          createdAt
        }
      }
    }
  }
`;

function Addpatients() {

    const client = useContext(ClientContext);
    const navigate = useNavigate();
    const location = useLocation()

    const { loading, error, data, refetch, cacheHit } = useQuery(GET_PATIENT_QUERY, {
        useCache: true,
        skipCache: location?.state?.from === "addPatients" ? true : false,
        refetchAfterMutations: ADD_PATIENT_MEMBER
    })

    if (loading) return 'Loading...'
    if (error) return 'Something Bad Happened'

    console.log("Cache hit Status : " + cacheHit);

    const addPatientHandler = () => {
        navigate("/Patientsform");
    }

    console.log(location.state);

    return (
        <>
            {/* <Outerheader /> */}
            {/* <Sidebar /> */}
            <div className='flex justify-between ml-[15rem]'>

                <p className='text-xl  text-[#082161]  mt-20 font-[700]'>Patients</p>
                {/* <Link to="/Patientsform"> */}
                    <button type='button' className=' bg-[#082161] w-[10vw]  mt-20 mr-10 text-[#ffffff] h-[6vh] rounded-md' onClick={addPatientHandler}>+ Add Patients</button>
                    {/* <button className="btn mr-[10rem] bg-[#082161] text-[#ffffff]">+ Add Staff</button> */}
                {/* </Link> */}
            </div>
            <div className='flex'>
                <p className='text text-xl  ml-[19rem] mb-[500px] text-[#082161] font-[500]'>All Patients</p>
                <input type='text' className="form-control ml-[2rem] block px-4 h-[2.5rem] w-[12rem] p-1 mt-[-.3rem]  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none drop-shadow-md" placeholder='search here...' />
            </div>
            <div>
                <div className='flex   ml-[15rem] mt-[-30rem]'>
                    <table className="table-auto  w-[68rem]">
                        <thead className='bg-[#D9D9D9]'>
                            <tr className='h-[2.5rem] text-center'>
                                <th><input type="checkbox" /></th>
                                <th>Patient Name</th>
                                <th>Age</th>
                                <th>Registration Date</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.users?.edges.map(({ node }) => {
                                    const { full_name, joining_date, username, mobile, address } = node;
                                    return (
                                        <tr className='text-center'>
                                            <td><input type="checkbox" /></td>
                                            <td ><span className='flex ml-1'><img src='https://lmsimages.sgp1.digitaloceanspaces.com/user_img.png' /></span>
                                                <span className='flex -mt-6 ml-8'>{full_name}</span></td>
                                            <td>26</td>
                                            <td>{dateFormat(joining_date, "mediumDate")}</td>
                                            <td>{username}</td>
                                            <td>{mobile}</td>
                                            <td>{address}</td>
                                            <td className='relative'>
                                                <span><svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg" className=' absolute -mx-1 mt-2'>
                                                    <path d="M11.3335 17.4168H12.7502C13.1043 17.4168 13.4585 17.2585 13.7418 16.9418C14.0252 16.6252 14.1668 16.2293 14.1668 15.8335V5.93766L10.271 1.5835H4.25016C3.896 1.5835 3.54183 1.74183 3.2585 2.0585C2.97516 2.37516 2.8335 2.771 2.8335 3.16683V5.54183" stroke="#3F51B5" stroke-opacity="0.78" stroke-width="2" strokeLinecap="round" stroke-linejoin="round" />
                                                    <path d="M9.9165 1.5835V6.3335H14.1665" stroke="#3F51B5" stroke-opacity="0.78" stroke-width="2" strokeLinecap="round" stroke-linejoin="round" />
                                                    <path d="M5.6665 17.4165C8.01371 17.4165 9.9165 15.2899 9.9165 12.6665C9.9165 10.0432 8.01371 7.9165 5.6665 7.9165C3.31929 7.9165 1.4165 10.0432 1.4165 12.6665C1.4165 15.2899 3.31929 17.4165 5.6665 17.4165Z" stroke="#3F51B5" stroke-opacity="0.78" stroke-width="2" strokeLinecap="round" stroke-linejoin="round" />
                                                    <path d="M6.729 13.8543L5.6665 12.8647V11.0835" stroke="#3F51B5" stroke-opacity="0.78" stroke-width="2" strokeLinecap="round" stroke-linejoin="round" />
                                                </svg>
                                                </span>
                                                <div className='flex justify-center mt-2'>
                                                    <Link to="/Editpatients">
                                                        <div class="tooltip" data-tip="Edit">
                                                            <svg className='ml-4' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0 16.327C0.4726 14.7052 0.9435 13.0835 1.4161 11.4617C1.4535 11.3325 1.4926 11.2033 1.5266 11.0741C1.581 10.8786 1.683 10.7205 1.8394 10.5896C1.9856 10.4689 2.1148 10.3244 2.2491 10.1901C4.4642 7.99536 6.6793 5.80067 8.8927 3.60427C8.9437 3.55328 8.9879 3.49548 9.0236 3.45128C9.3245 3.75387 9.6067 4.03777 9.9212 4.35397C9.8872 4.37777 9.8209 4.41177 9.7699 4.46277C7.4749 6.75267 5.1816 9.04256 2.8917 11.3376C2.8101 11.4209 2.7421 11.5348 2.7098 11.647C2.4344 12.5565 2.1726 13.471 1.9006 14.3839C1.8666 14.4978 1.8836 14.5692 1.9703 14.6474C2.1114 14.7749 2.2355 14.9211 2.3783 15.0469C2.4276 15.0894 2.5211 15.1217 2.5806 15.1064C3.4952 14.8446 4.4081 14.5777 5.3193 14.3023C5.3975 14.2785 5.4706 14.2122 5.5318 14.1493C7.8591 11.8289 10.183 9.50496 12.5069 7.18277C12.5511 7.13857 12.5885 7.08927 12.614 7.06037C12.9438 7.39017 13.2634 7.70976 13.6136 8.05996C13.5983 8.07016 13.5371 8.09566 13.4946 8.13816C11.203 10.4077 8.908 12.6721 6.6283 14.9534C6.3104 15.273 5.9653 15.4702 5.5386 15.5909C4.0256 16.0193 2.5194 16.4715 1.0098 16.9152C0.9095 16.9441 0.8075 16.9713 0.7072 17.0002H0.5712C0.4981 16.9679 0.4233 16.939 0.3502 16.905C0.1462 16.8098 0.0765 16.616 0 16.4273V16.327ZM4.5713 13.5102C4.5271 13.228 4.4795 12.9696 4.4489 12.7112C4.4336 12.5888 4.3843 12.5395 4.2653 12.5174C3.9746 12.4613 3.6873 12.3882 3.4187 12.3287C5.8293 9.91296 8.2399 7.49557 10.6352 5.09347C11.0177 5.47597 11.4172 5.87377 11.8031 6.25797C9.4163 8.65156 7.0074 11.0673 4.5713 13.5102ZM11.5141 1.08998C11.7317 0.877482 11.9493 0.651382 12.1822 0.440583C12.8503 -0.161216 13.7207 -0.147616 14.3718 0.488183C15.0909 1.18858 15.7998 1.89748 16.5002 2.61658C17.1632 3.29488 17.153 4.20267 16.4917 4.87927C16.2928 5.08327 16.0871 5.28217 15.8967 5.46917C14.4415 4.01567 12.988 2.56388 11.5141 1.08998V1.08998ZM9.741 2.69478C10.0708 2.38538 10.4091 2.06748 10.7304 1.76488C12.2536 3.28808 13.7683 4.80447 15.2966 6.33277C14.9787 6.63027 14.637 6.95157 14.3072 7.26097L9.741 2.69478Z" fill="#80ECB8" />
                                                            </svg>
                                                        </div>
                                                    </Link>
                                                    <div class="tooltip ml-5" data-tip="Delete">
                                                        <label for="my-modal">
                                                            <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M2.25948 14.2201C2.27648 14.6213 2.60628 14.9375 3.00748 14.9375H9.99618C10.3974 14.9375 10.7289 14.6213 10.7442 14.2201L11.244 3.6835H1.75968L2.25948 14.2201ZM8.08198 6.3015C8.08198 6.1332 8.21798 5.9972 8.38628 5.9972H8.87248C9.04078 5.9972 9.17678 6.1349 9.17678 6.3015V12.3212C9.17678 12.4895 9.03908 12.6255 8.87248 12.6255H8.38628C8.21798 12.6255 8.08198 12.4895 8.08198 12.3212V6.3015ZM5.95528 6.3015C5.95528 6.1332 6.09128 5.9972 6.25958 5.9972H6.74578C6.91408 5.9972 7.05009 6.1349 7.05009 6.3015V12.3212C7.05009 12.4895 6.91408 12.6255 6.74578 12.6255H6.25958C6.09128 12.6255 5.95528 12.4895 5.95528 12.3212V6.3015ZM3.82688 6.3015C3.82688 6.1332 3.96288 5.9972 4.12948 5.9972H4.61568C4.78398 5.9972 4.91998 6.1349 4.91998 6.3015V12.3212C4.91998 12.4895 4.78228 12.6255 4.61568 12.6255H4.12948C3.96118 12.6255 3.82688 12.4895 3.82688 12.3212V6.3015ZM11.5755 0.8292H8.35228V0.2189C8.35228 0.1322 8.28258 0.0625 8.19588 0.0625H4.80948C4.72278 0.0625 4.65308 0.1322 4.65308 0.2189V0.8292H1.42818C1.16978 0.8292 0.958984 1.0383 0.958984 1.2984V2.774H12.0447V1.2984C12.0447 1.04 11.8356 0.8292 11.5755 0.8292Z" fill="#FF6760" />
                                                            </svg>
                                                        </label>
                                                        <input type="checkbox" id="my-modal" class="modal-toggle" />
                                                        <div class="modal">
                                                            <div class="modal-box">
                                                                <h3 class="font-bold text-lg">Do you want to delete</h3>
                                                                <p class="py-4"></p>
                                                                <div class="modal-action">
                                                                    <label for="my-modal" class="btn bg-red-500 hover:bg-red-500">Delete</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>


                <div className='flex justify-end mr-8 mt-5'>
                    <button class="btn btn-outline btn-sm capitalize mr-[0.5rem]">Previous</button>
                    <button class="btn btn-outline bg-[#082161] text-white btn-sm mr-[0.5rem]">1</button>
                    <button class="btn btn-outline btn-sm mr-[0.5rem]">2</button>
                    <button class="btn btn-outline text-[#082161] capitalize btn-sm mr-[0.5rem]">Next</button>
                </div>
            </div>
        </>
    )
}

export default Addpatients;