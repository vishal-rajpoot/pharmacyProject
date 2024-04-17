import { useState, useContext, useRef, useEffect } from "react";
import "./Login.css";
import { FaRegEnvelope } from "react-icons/fa";
import { BiLockAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ClientContext } from "graphql-hooks";
import Loginimage from "../logo/Loginimage";
import { useQuery, useMutation } from "graphql-hooks";
import { reactLocalStorage } from "reactjs-localstorage";
import Header from "../header/Header";
import { auth, signInAnonymously } from '../../chatcomponents/firebase'
import { Globaldata } from "../../App";


const LOGIN_MUTATION = `
mutation Login($username: String!, $password: String!) {
   logIn(input: {
      username: $username,
      password:$password,
    }){
      viewer {
        sessionToken
        user{
          objectId
          full_name
          email
        }
      }
    }
}`;

function Login() {
  const navigate = useNavigate();
  const { isUserLogin } = useContext(Globaldata)
  const client = useContext(ClientContext);
  const emailInputRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [authErr, setAuthErr] = useState("");
  const [isFormValid, setFormValid] = useState(true);
  const [isHideEmailErrorMsg, setHideEmailErrorMsg] = useState(true);
  const [isHidePassowrdErrorMsg, setHidePassowrdErrorMsg] = useState(true);

  useEffect(() => {
    if (isUserLogin()) {
      navigate('/Home')
    }
  }, [])

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  const isEmailValid = (email) => {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegex);
  };


  let headersList =
  {
    "Accept": "application/json",
    "X-Parse-Application-Id": process.env.REACT_APP_XPARSE_APPLICATION_ID,
    "X-Parse-REST-API-Key": process.env.REACT_APP_XPARSE_REST_API_KEY,
    "Content-Type": "application/json"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !isEmailValid(email)) {
      setEmailErr("Please enter Valid Email Address");
      setHideEmailErrorMsg(false);
    }

    if (!password) {
      setHidePassowrdErrorMsg(false);
      setFormValid(false);
    }

    if (email && password && isFormValid) {
      //Making API Call using GrqphQL
      const response = await loginMutation({
        variables: { username: email.trim(), password: password.trim() },
      });
      const sessionToken = response?.data?.logIn?.viewer?.sessionToken;
      if (sessionToken) {
        signInAnonymously(auth)
        client.setHeader("X-Parse-Session-Token", sessionToken);
        reactLocalStorage.set("sessionToken", sessionToken);
        // console.log(response?.data?.logIn?.viewer?.user)
        const userObj = {
          uid: response?.data?.logIn?.viewer?.user?.objectId,
          displayName: response?.data?.logIn?.viewer?.user?.full_name,
          email: response?.data?.logIn?.viewer?.user?.email,
          roomid: `doctor-${response?.data?.logIn?.viewer?.user?.objectId}`,
        }
        // console.log(userObj);
        localStorage.setItem('user', JSON.stringify(userObj))
        navigate("/Home");
      } else {
        setAuthErr("Invalid Login Credentials");
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
                src="/image/pageLogo.png"
                className="w-[40rem]"
                alt="Login image"
              />
            </div>
            <div className="xl:ml-20 xl:w-4/12 lg:w-4/12 md:w-8/12 mb-12 md:mb-0 ">
              <form className="pl-5" onSubmit={(e) => handleSubmit(e)}>
                <div className="flex flex-row items-center justify-center lg:justify-start"></div>

                <div className="flex flex-col items-center my-4">
                  <p className="text-center font-semibold mx-[4rem] mt-[-7rem] mb-0 text-[#082161] text-[2rem]">
                    Log In To Your Account
                  </p>
                  <p
                    hidden={!!!authErr}
                    className="text-center font-medium mb-0 text-red-500 text-[1.5rem]"
                  >
                    {authErr}
                  </p>
                </div>

                <div className="flex items-center my-1">
                  <p className="text-center font-semibold mx-[1rem] text-gray-500 mt-[1rem] mb-0 ">
                    Email *
                  </p>
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block px-4  w-[30rem] py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none drop-shadow-md"
                    placeholder="Enter Email"
                    ref={emailInputRef}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setHideEmailErrorMsg(true);
                      setEmailErr("");
                    }}
                  />
                  <div
                    hidden={isHideEmailErrorMsg}
                    className="text-red-500 text-center "
                  >
                    {emailErr}
                  </div>
                </div>

                <div className="flex items-center my-1">
                  <p className="text-center font-semibold mx-[1rem] text-gray-500  mb-0 ">
                    Password *
                  </p>
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block px-4  w-[30rem] py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none drop-shadow-md"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setHidePassowrdErrorMsg(true);
                    }}
                  />
                  <div
                    hidden={isHidePassowrdErrorMsg}
                    className="text-red-500 text-center "
                  >
                    Please enter the Password
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <button
                    className="inline-block w-[30rem] px-7 py-3 bg-[#082161] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-[1rem]"
                    type="submit"
                  >
                    Login
                  </button>
                  <p className="text-right mt-[1rem]">
                    <Link to="/Resetpasswrd">Forgot Password ?</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Login;
