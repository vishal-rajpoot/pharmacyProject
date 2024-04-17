import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";
import {db} from '../../chatcomponents/firebase'
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"; 

function Resetpasswrd() {
  const navigate = useNavigate();
  const initialValues = { email: "", password: "", confirmpassword: "" }
  const [formValues, setFormValues] = useState(initialValues)
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateEmail = async (e) => {
    e.preventDefault()
    let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/_User?where={"username":"${formValues.email}"}`,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-Parse-Application-Id": process.env.REACT_APP_XPARSE_APPLICATION_ID,
          "X-Parse-REST-API-Key": process.env.REACT_APP_XPARSE_REST_API_KEY,
        }
      }
    );
    result = await result.json();
    let ServerEmail = result.results[0]?.username
    let ServeruserId = result.results[0]?.objectId
    setUserId(ServeruserId)
    if(ServerEmail === formValues.email){
      setShow(true)
      setError(false)
    }
    else{
      setError('Email not found please enter valid email')
    }
  };


  const resetPassword = async (event) => {
    event.preventDefault();
    if (!formValues.password && !formValues.confirmpassword) {
      setError("Password is Required")
    } else if (formValues.password.length < 8) {
      setError("Password can not be less than 8 characters")
    } else if (formValues.password !== formValues.confirmpassword) {
      setError("Password Mismatch")
    }
    else {
      setError(false)
      try{
        const docRef = doc(db, 'users', 'update-users')
        await setDoc(docRef, {
        userid: userId,
        password: formValues.password,
        timestamp: serverTimestamp()
        });
        alert('password update successfull')
        navigate("/");
      }
      catch(err){
        console.log(err)
        alert('reset password failed')
      }
    }
  };  

  return (
    <>
      <Header />
      <section>
        <div className="px-6 h-full text-white-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://lmsimages.sgp1.digitaloceanspaces.com/forgot-password.png"
                className="w-[40rem]"
                alt="Forget Password"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <div className="flex flex-row items-center justify-center lg:justify-start"></div>

              <div className="flex items-center my-4">
                <p className="text-center font-semibold mx-[3rem] my-[-5rem] mb-0 text-[#082161] text-[2rem]">
                  Reset Your Password
                </p>
              </div>

              <div className="flex items-center">
                <p className="text-center font-semibold mt-[-2rem] text-slate-400 ml-[3rem] mb-0 ">
                  Enter the email register with your account
                </p>
              </div>

              {show ? (
                <>
                  <form onSubmit={resetPassword}>
                    <div className="flex items-center my-1">
                      <p className="text-center font-semibold mx-[1rem] text-gray-500 mt-[1rem] mb-0 ">
                        Password *
                      </p>
                    </div>
                    <div className="mb-6">
                      <input
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                        className="form-control block px-4  w-[30rem] py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none drop-shadow-md"
                      />
                      <p className="text-red-400 text-xs">
                      {error}
                      </p> 
                    </div> 
                 
                    <div className="flex items-center my-1">
                      <label className="text-center font-semibold mx-[1rem] text-gray-500  mb-0 ">
                        Confirm Password *
                      </label>
                    </div>
                    <div className="mb-6">
                      <input
                        type="password"
                        name="confirmpassword"
                        value={formValues.confirmpassword}
                        onChange={handleChange}
                        className="form-control block px-4  w-[30rem] py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none drop-shadow-md"
                      />
                      <p className="text-red-400 text-xs">
                        {error}
                      </p>
                    </div>

                    <div className="text-center lg:text-left">
                      <button
                        type="submit"
                        className="inline-block w-[30rem] px-7 py-3 bg-[#082161] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-[1rem]"
                      >
                        Reset Password
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <form>
                    <div className="flex items-center mt-[2rem]">
                      <label className="text-center font-semibold mx-[1rem] text-gray-500  mb-0 ">
                        Email *
                      </label>
                    </div>
                    <div className="mb-6 mt-[0.5rem]">
                      <input
                        type="email"
                        name="email"
                        value={formValues.email}
                        required
                        onChange={handleChange}
                        className="form-control inline-block px-4 mx-20px w-[30rem] py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none drop-shadow-md "
                        placeholder="Enter Email"
                      />
                      <p className="text-red-400 text-xs">
                        {error}
                      </p>
                    </div>
                    <div className="text-center lg:text-left">
                      <button onClick={validateEmail} className="inline-block w-[30rem] px-7 py-3 bg-[#082161] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-[1rem]">
                        Continue
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Resetpasswrd;
