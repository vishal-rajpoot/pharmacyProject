import React from 'react';
import Header from '../header/Header';
import './Entercode.css';
import Forgotlogo from '../forgotlogo/Forgotlogo';
import {Link} from 'react-router-dom'
function Entercode() {
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
                  <p className="text-center font-semibold mx-[3rem] my-[-5rem] mb-0 text-[#082161] text-[2rem]">Reset Your Password</p>
                </div>

                <div
                  className="flex items-center "
                >
                  <p className="text-center font-semibold mt-[-2rem] text-slate-400 ml-[3rem] mb-0 ">Enter the verification code we just sent to your</p>
                </div>
                <div
                  className="flex items-center "
                >
                  <p className="text-center font-semibold  text-slate-400 ml-[3rem] mb-0 ">email address</p>
                </div>

                <div
                  className="flex items-center mt-[2rem] ml-[3rem]"
                >
                  <p className="text-center font-semibold mx-[1rem] text-gray-500  mb-0 ">Enter Verification Code</p>
                </div>
                <div className='mb-6 mt-[0.5rem] ml-[3rem]'>
                  <input
                    type="password"
                    className="form-control block px-4  w-[28rem] py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none drop-shadow-md"
                
                  
                  />
                </div>

                <div className="text-center ml-[3rem] lg:text-left">
                <Link to = "/Newpassword">
                  <button

                    className="inline-block w-[28rem] px-7 py-3 bg-[#3F51B5] text-white font-medium text-sm leading-snug  rounded shadow-md hover:bg-[#3F51B5] hover:shadow-lg focus:bg-[#3F51B5] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#3F51B5] active:shadow-lg transition duration-150 ease-in-out mt-[1rem]"
                
                  >
                   Submit
                  </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      </>
    )
}
export default Entercode;