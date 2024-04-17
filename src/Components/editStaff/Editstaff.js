import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Outerheader from "../outerheader/Outerheader";
import Sidebar from "../sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { ClientContext, useMutation } from "graphql-hooks";
import { useQuery } from "graphql-hooks";
import dateFormat from "dateformat";
import { reactLocalStorage } from "reactjs-localstorage";
import '../../App.css'

const GET_SINGLE_USER = `
query GetSingleUser($objectId : ID!) {
    user(id: $objectId ) {
        objectId
        first_name
        last_name
        full_name
        gender
        username
        email
        dateOfJoining
        dateOfBirth
        createdAt
        role
        mobile
        address
    }
  }
  `;

const UPDATE_USER = `mutation UpdateStaffMutation( 
        $id: ID!
        $first_name: String!
        $last_name: String!
        $dateOfBirth: String!
        $gender: String!
        $username: String!
        $role: String!
        $mobile: String!
        $address: String!
        $password: String!
        $dateOfJoining: String!
        ) 
        { updateUser
            ( input: 
                { id:$id 
                    fields: { 
                      first_name: $first_name
                      last_name: $last_name
                      dateOfBirth: $dateOfBirth
                      gender: $gender
                      username: $username
                      role: $role
                      mobile: $mobile
                      address: $address
                      password: $password
                      dateOfJoining: $dateOfJoining
                      is_actiive: true
                    } 
                } 
            ) { user 
            { 
                objectId 
                first_name
                last_name
                dateOfBirth
                gender
                username
                role
                mobile
                address
                is_actiive
                dateOfJoining         
            } 
        } 
    }`;

function Editstaff() {
  const { id } = useParams();
  let objectId = id;
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState()
  const [address, setAddress] = useState("");
  const [genderSelected, setGenderSelected] = useState("");
  const [roleSelected, setRoleSelected] = useState("");
  const [mobile, setMobile] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const client = useContext(ClientContext);

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    address: "",
    genderSelected: "",
    roleSelected: "",
    mobile: "",
    joiningDate: "",
    dateOfBirth: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);


  const { loading, error, data, refetch, cacheHit } = useQuery(
    GET_SINGLE_USER,
    {
      variables: {
        objectId: objectId,
      },
    }
  );

  // console.log(data);
  useEffect(() => {
    if (data?.user) {
      console.log(data.user);
      setFirstName(data.user.first_name || "");
      setLastName(data.user.last_name || "");
      setFullName(data.user.full_name || "");
      setMobile(data.user.mobile || "");
      // let dateOfBirth = data.user.dateOfBirth.slice(0, 10);
      setDateOfBirth(data.user.dateOfBirth || "");
      setRoleSelected(data.user.role || "");
      setEmail(data.user.username || "");
      setJoiningDate(data.user.dateOfJoining || "");
      setAddress(data.user.address || "");
      setGenderSelected(data.user.gender || "");
      setPassword(data.user.password || "");
    }
  }, [loading]);

  const [UpdateStaffMutation] = useMutation(UPDATE_USER);

  const validate = () => {
    const errors = {};
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    let date = new Date();
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    const currentDate = `${y}-0${m}-0${d}`;

    if (!firstName) {
      errors.firstName = "First Name is Requried";
    } else if (firstName.length < 3) {
      errors.firstName = "First Name should be greter then 3 character";
    }
    if (lastName && lastName.length < 3) {
      errors.lastName = "Last Name should be greter then 3 character";
    }
    if (!genderSelected) {
      errors.genderSelected = "Gender is Requried";
    }
    if (!dateOfBirth) {
      errors.dateOfBirth = "Date Of Birth is Requried";
    } else if (dateOfBirth > currentDate) {
      errors.dateOfBirth = "Date Of Birth can not greater then current date";
    }
    if (!roleSelected) {
      errors.roleSelected = "Role is Requried";
    }
    if (!email) {
      errors.email = "Email must be Requried";
    } else if (!emailRegex.test(email)) {
      errors.email = "This is not valid email formet";
    }
    if (!mobile) {
      errors.mobile = "Contact No is Requried";
    } else if (!mobileRegex.test(mobile)) {
      errors.mobile = "Enter valid 10 digit contact number ";
    }
    if (!address) {
      errors.address = "Address is Requried";
    }

    if (!password) {
      errors.password = "Password must be Requried";
    } else if (password.length < 8 || password.length > 8) {
      errors.password = "Password can not be less or greter then 8 character";
    }

    // if (!joiningDate) {
    //   errors.joiningDate = "Joining date is requried";
    // } else if (joiningDate != currentDate) {
    //   errors.joiningDate = "Joining date should be current date";
    // }
    return errors;
  };

  // console.log(formErrors);

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    setIsSubmit(true);
  };

  const submitUpdateStaff = async () => {
    const response = await UpdateStaffMutation({
      variables: {
        id: objectId,
        first_name: firstName,
        last_name: lastName,
        password: password,
        dateOfJoining: joiningDate,
        dateOfBirth: dateOfBirth,
        gender: genderSelected,
        username: email,
        role: roleSelected,
        mobile: mobile,
        address: address,
      },
    });
    // console.log(response);
    navigate("/Staff", { state: { from: "addStaff" } });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      submitUpdateStaff();
    }
  }, [formErrors]);

  client.setHeader(
    "X-Parse-Session-Token",
    reactLocalStorage.get("sessionToken")
  );


  
  return (
    <>
      {/* <Outerheader /> */}
      {/* <Sidebar /> */}
      <div className="">
        <div className="">
          <p className="text-[#082161] font-medium">Staff</p>
          <svg
            width="7"
            height="10"
            viewBox="0 0 7 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-[8px] ml-[12px]"
          >
            <path
              d="M6.63554 4.5832C6.63554 4.74748 6.56027 4.91175 6.41004 5.037L1.68024 8.97846C1.37937 9.22919 0.891551 9.22919 0.590798 8.97846C0.290046 8.72783 0.290046 8.3214 0.590798 8.07065L4.77599 4.5832L0.590945 1.09572C0.290193 0.844994 0.290193 0.438603 0.590945 0.187997C0.891697 -0.0628534 1.37951 -0.0628534 1.68039 0.187997L6.41018 4.12939C6.56044 4.25471 6.63554 4.41897 6.63554 4.5832Z"
              fill="#082161"
            />
          </svg>
          <p className="ml-[12px] text-[#666666] font-medium">Edit Staff</p>
        </div>
      </div>
      <div>
        <p className="text-[#082161] font-medium mr-[650px] flex justify-center ml-[28rem] mt-[3rem]">
          Edit Staff Details
        </p>
      </div>
      <div className="flex justify-center ml-[11rem] mt-[1rem]">
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block mr-[10rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Full Name
              </label>
              <input
                className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={firstName || ""}
                onChange={(e) => setFullName(e.target.value)}
              />
              <p className="text-red-400 text-xs">{formErrors.firstName}</p>
            </div>
            <div className="w-full md:w-1/2 px-3 ">
              <label
                className="mr-[11rem] block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Gender
              </label>
              <div className="border-input relative">
                <select
                  value={genderSelected}
                  onChange={(e) => setGenderSelected(e.target.value)}
                  className="block appearance-none w-full bg-[#ffffff] border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <p className="text-red-400 text-xs">{formErrors.gender}</p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block mr-[8.5rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Mobile Number
              </label>
              <input
                className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <p className="text-red-400 text-xs">{formErrors.mobile}</p>
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-[1rem]">
              <label
                className="block mr-[9rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Date of Birth
              </label>
              <input
                className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              <p className="text-red-400 text-xs">{formErrors.dateOfBirth}</p>
            </div>

            <div className="w-full md:w-1/2 px-3 mt-[1rem]">
              <label
                className="block mr-[12rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Email
              </label>
              <input
                className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-red-400 text-xs">{formErrors.email}</p>
            </div>

            <div className="w-full md:w-1/2 px-3 ">
              <label
                className="mr-[12rem] block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Role
              </label>
              <div className="relative ">
                <select
                  defaultValue={roleSelected}
                  value={roleSelected}
                  onChange={(e) => setRoleSelected(e.target.value)}
                  className="border-input block appearance-none w-full bg-[#ffffff] border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option value="">Select</option>
                  {/* <option value="admin">Admin</option> */}
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                  {/* <option value="pharmacist">Pharmacist</option> */}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <p className="text-red-400 mt-1 text-xs">{formErrors.roleSelected}</p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block mr-[12rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Password
              </label>
              <input
                value={password}
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="password"
              />
              <p className="text-red-400 text-xs">{formErrors.password}</p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">
                Address
              </label>
              <input
                value={address}
                name="address"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              <p className="text-red-400 text-xs">{formErrors.address}</p>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0 ">
              <label
                className="block mr-[8rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Date of Joining
              </label>
              <input
                className="border-inputappearance-none block w-full bg-[#ffffff] text-gray-700 border rounded py-3 px-2 mb-1  leading-tight focus:outline-none focus:bg-white"
                type="date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
              />
              <p className="text-red-400 text-xs">{formErrors.joiningDate}</p>
            </div>
            <div className="text-center  md:w-1/2 px-3">
              <div className="flex justify-center align-middle mx-auto">
                <svg
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-11"
                >
                  <circle cx="21" cy="21" r="21" fill="#D9D9D9" />
                  <path
                    d="M28 31V27.6667C28 25.8986 27.5786 24.2029 26.8284 22.9526C26.0783 21.7024 25.0609 21 24 21H18C16.9391 21 15.9217 21.7024 15.1716 22.9526C14.4214 24.2029 14 25.8986 14 27.6667V31"
                    fill="#082161"
                  />
                  <path
                    d="M28 31V27.6667C28 25.8986 27.5786 24.2029 26.8284 22.9526C26.0783 21.7024 25.0609 21 24 21H18C16.9391 21 15.9217 21.7024 15.1716 22.9526C14.4214 24.2029 14 25.8986 14 27.6667V31"
                    stroke="#082161"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 17C23.2091 17 25 15.2091 25 13C25 10.7909 23.2091 9 21 9C18.7909 9 17 10.7909 17 13C17 15.2091 18.7909 17 21 17Z"
                    fill="#082161"
                    stroke="#082161"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  className="appearance-none block w-full h-[3rem] mt-[2.5rem] bg-[#ffffff] ml-[0.5rem] text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="file"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={(e) => handleSubmitClick(e)}
              className="btn btn-outline text-white capitalize btn-md mr-[1rem] hover:#082161 bg-[#082161]"
            >
              Update
            </button>
            <button
              onClick={(e) => navigate("/Staff")}
              className="btn btn-outline text-[#082161] capitalize btn-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Editstaff;
