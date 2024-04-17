import React from 'react'
import './Newpassword.css'
import Header from '../header/Header';
import Forgotlogo from '../forgotlogo/Forgotlogo';
import {BiLockAlt} from "react-icons/bi";

function Newpassword() {
    return(
      <>
      <Header />
        <section>
        <div className="px-6 h-full text-white-800">
          <div
            className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
          >
            <div
              className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
            >
              <img
                src="https://lmsimages.sgp1.digitaloceanspaces.com/forgot-password.png"
                className="w-[40rem]"
                alt="Sample image"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form>
                <div className="flex flex-row items-center justify-center lg:justify-start">
                </div>

                <div
                  className="flex items-center my-4"
                >
                  <p className="text-center font-semibold mx-[0rem] mt-[-7rem] mb-0 text-[#082161] text-[2rem]">Create New Password</p>
                </div>

               
                <div
                  className="flex items-center "
                >
                  <p className="text-center font-semibold mt-[-2rem] text-slate-400 ml-[0rem] mb-0 ">Enter the email associated with your account and we'll send a</p>
                </div>
                <div
                  className="flex items-center "
                >
                  <p className="text-center font-semibold  text-slate-400 ml-[0rem] mb-0 ">Verification code to reset your password</p>
                </div>

                <div
                  className="flex items-center my-1"
                >
                  <p className="text-center font-semibold mx-[1rem] text-gray-500 mt-[1rem] mb-0 ">Password *</p>
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block px-4  w-[30rem] py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none drop-shadow-md"
                    
                  />
                </div>

                <div
                  className="flex items-center my-1"
                >
                  <p className="text-center font-semibold mx-[1rem] text-gray-500  mb-0 ">Confirm Password *</p>
                </div>
                <div className='mb-6'>
                  <input
                    type="password"
                    className="form-control block px-4  w-[30rem] py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none drop-shadow-md"
                 
                  />
                </div>

                <div className="text-center lg:text-left">
          
                  <button

                    className="inline-block w-[30rem] px-7 py-3 bg-[#3F51B5] text-white font-medium text-sm leading-snug  rounded shadow-md hover:bg-[#3F51B5] hover:shadow-lg focus:bg-[#3F51B5] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#3F51B5] active:shadow-lg transition duration-150 ease-in-out mt-[1rem]"
                   
                  >
                    Reset Password
                  </button>
               
                
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      </>
    )
}

export default Newpassword