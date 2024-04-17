import React, { useState } from "react";
import AddOrder from "../addorder/AddOrder";
// import Outerheader from "../outerheader/Outerheader";
import Sidebar from "../sidebar/Sidebar";

const Oldchat = () => {
  return (
    <div>
      {/* <Outerheader /> */}
      {/* <Sidebar /> */}
      <div className="full pt-20">
        <div className="main flex mr-10 ml-10">
          {/* <div className="relative w-full">  */}
          <div className="online box-content ml-[10rem] w-[20rem]  h-[560px]  overflow-auto">
            <div className="flex flex-row mx-5 justify-around  sticky top-0 bg-slate-100 h-12">
              <h5 className="mt-3">
                <b>Patient</b>
              </h5>
              <form className="flex items-center ">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-8"
                    placeholder="Search"
                    required=""
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center my-5 mx-5 justify-center space-x-7 ">
              <img src="/image/image.svg" />
              <div className="flex flex-col">
                <strong>Andrew Alfred</strong>
                <span>Technical advisor</span>
              </div>
            </div>
            <div className="flex items-center my-5 mx-5 justify-center space-x-7 ">
              <img src="/image/image.svg" />
              <div className="flex flex-col">
                <strong>Andrew Alfred</strong>
                <span>Technical advisor</span>
              </div>
            </div>
            <div className="flex items-center my-5 mx-5 justify-center space-x-7 ">
              <img src="/image/image.svg" />
              <div className="flex flex-col">
                <strong>Andrew Alfred</strong>
                <span>Technical advisor</span>
              </div>
            </div>
            <div className="flex items-center my-5 mx-5 justify-center space-x-7 ">
              <img src="/image/image.svg" />
              <div className="flex flex-col">
                <strong>Andrew Alfred</strong>
                <span>Technical advisor</span>
              </div>
            </div>
            <div className="flex items-center my-5 mx-5 justify-center space-x-7 ">
              <img src="/image/image.svg" />
              <div className="flex flex-col">
                <strong>Andrew Alfred</strong>
                <span>Technical advisor</span>
              </div>
            </div>
            <div className="flex items-center my-5 mx-5 justify-center space-x-7 ">
              <img src="/image/image.svg" />
              <div className="flex flex-col">
                <strong>Andrew Alfred</strong>
                <span>Technical advisor</span>
              </div>
            </div>
            <div className="flex items-center my-5 mx-5 justify-center space-x-7 ">
              <img src="/image/image.svg" />
              <div className="flex flex-col">
                <strong>Andrew Alfred</strong>
                <span>Technical advisor</span>
              </div>
            </div>
            <div className="flex items-center my-5 mx-5 justify-center space-x-7 ">
              <img src="/image/image.svg" />
              <div className="flex flex-col">
                <strong>Andrew Alfred</strong>
                <span>Technical advisor</span>
              </div>
            </div>
            <div className="flex items-center my-5 mx-5 justify-center space-x-7 ">
              <img src="/image/image.svg" />
              <div className="flex flex-col">
                <strong>Andrew Alfred</strong>
                <span>Technical advisor</span>
              </div>
            </div>
            <div className="flex items-center my-5 mx-5 justify-center space-x-7">
              <img src="/image/image.svg" />
              <div className="flex flex-col">
                <strong>Andrew Alfred</strong>
                <span>Technical advisor</span>
              </div>
            </div>
          </div>
          {/* </div> */}

          {/* Chat Header */}
          

          <div className="ml-[1rem] w-[36rem] h-[560px] border rounded-lg shadow-lg relative">
            <div className="flex items-center justify-left space-x-7 shadow-xl rounded-t-lg relative">
              <img className="ml-5" src="/image/image.svg" />
              <div className="flex flex-col">
                <strong>Andrew Alfred</strong>
                <span>Technical advisor</span>
              </div>
              <b>
                <i className="absolute right-5 top-3 ri-more-2-fill"></i>
              </b>
            </div>
            <div className="mt-[24rem]">
              <div className="flex justify-between border-gray-300 ">
                <button
                  type="button"
                  className="h-8 w-40 bg-[#082161] text-white m-5 rounded-lg"
                >
                  Transfer
                </button>
                <button
                  type="button"
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 w-40 h-8 m-5"
                >
                  End Session
                </button>
              </div>
              <div className="rounded-b-lg flex items-center justify-between w-full p-3 py-2">
                <button
                  type="submit"
                  className="w-10 h-10 items-center justify-center flex rounded-md"
                >
                  <img src="/image/select.svg" />
                </button>
                <input
                  type="text"
                  placeholder="Type Message..."
                  className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  name="message"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#082161] w-10 h-10 items-center justify-center flex rounded-md"
                >
                  <img src="/image/sent.svg" />
                </button>
              </div>
            </div>
          </div>     

          {/* Book Appointment and Place Order*/}
          <AddOrder/>
        </div>
      </div>
    </div>
  );
};

export default Oldchat;