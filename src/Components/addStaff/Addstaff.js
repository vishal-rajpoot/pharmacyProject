import React, { useState, useContext, useEffect } from "react";
// import Outerheader from "../outerheader/Outerheader";
import Sidebar from "../sidebar/Sidebar";
import { useMutation } from "graphql-hooks";
import { ClientContext } from "graphql-hooks";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import '../../App.css'

export const ADD_STAFF_MEMBER = `
mutation AddStaffMutation(
    $first_name: String!
    $last_name: String!
    $dateOfBirth: String!
    $gender: String!
    $role: String!
    $username: String!
    $email: String!
    $mobile: String!
    $password: String!
    $dateOfJoining: String!
  ) {
    createUser(
      input: {
        fields: {
          username: $username
          password: $password
          first_name: $first_name
          last_name: $last_name
          role: $role
          dateOfBirth: $dateOfBirth
          gender: $gender
          is_actiive: true
          address:""
          city:""
          state:""
          country:""
          email: $email
          mobile: $mobile
          dateOfJoining: $dateOfJoining
          ACL: { roles: { roleName: "admin", read: true, write: true } }
        }
      }
    ) {
      user {
        objectId
        full_name
        username
        mobile
        createdAt
      }
    }
  }
`;

function Addstaff() {
  const [inputState, setInputState] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    mobile: "",
    role: "",
    password: "",
    dateOfJoining: "",
    address: ""
  });

  const [formValues, setFormValues] = useState(inputState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  console.log(inputState)

  const client = useContext(ClientContext);
  const navigate = useNavigate();
  const [addStaffMutation] = useMutation(ADD_STAFF_MEMBER);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValues({ ...formValues, [name]: value });
  };

  console.log(formValues);

  const handleSubitClick = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
  };

  const handleSubmitStaff = async () => {
    let headersList = {
      "X-Parse-Application-Id": process.env.REACT_APP_XPARSE_APPLICATION_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_XPARSE_REST_API_KEY,
      "X-Parse-Revocable-Session": process.env.REACT_APP_XPARSE_REVOCABLE_SESSION,
      "X-Parse-Session-Token": reactLocalStorage.get("sessionToken") || "",
      "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify({
      ACL: {
        zjBOjdiByO: {
          read: true,
          write: true,
        },
        "*": {
          read: true,
          write: true,
        },
      },
      dateOfBirth: formValues.dateOfBirth,
      username: formValues.email,
      email: formValues.email,
      password: formValues.password,
      first_name: formValues.firstName,
      last_name: formValues.lastName,
      gender: formValues.gender,
      mobile: formValues.mobile,
      state: "some",
      city: "ddd",
      country: "ddd",
      is_actiive: true,
      address: formValues.address,
      role: formValues.role,
      dateOfJoining: formValues.dateOfJoining,
    });
    let response = await fetch(
      `${process.env.REACT_APP_REST_URL}/classes/_User`,
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );
    let data = await response.json();
    console.log(data.objectId);

    navigate("/Staff", { state: { from: "addStaff" } });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleSubmitStaff();
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    let date = new Date();
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    const currentDate = `${y}-0${m}-0${d}`;

    if (!values.firstName) {
      errors.firstName = "First Name is Requried";
    } else if (values.firstName.length < 3) {
      errors.firstName = "Generaic Name should be greater then 3 character";
    }
    if (values.lastName && values.lastName.length < 3) {
      errors.lastName = "Last Name should be greter then 3 character";
    }
    if (!values.gender) {
      errors.gender = "Gender is Requried";
    }
    // if (!values.dateOfBirth) {
    //   errors.dateOfBirth = "Date Of Birth is Requried";
    // } else if (values.dateOfBirth > currentDate) {
    //   errors.dateOfBirth = "Date Of Birth can not greater then current date";
    // }
    if (!values.role) {
      errors.role = "Role is Requried";
    }
    if (!values.email) {
      errors.email = "Email must be Requried";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not valid email formet";
    }
    if (!values.mobile) {
      errors.mobile = "Contact No is Requried";
    } else if (!mobileRegex.test(values.mobile)) {
      errors.mobile = "Enter valid 10 digit contact number ";
    }

    if (!values.password) {
      errors.password = "Password must be Requried";
    } else if (values.password.length < 8 || values.password.length > 8) {
      errors.password = "Password can not be less or greter then 8 character";
    }

    // if (!values.dateOfJoining) {
    //   errors.dateOfJoining = "Joining date is requried";
    // } else if (values.dateOfJoining != currentDate) {
    //   errors.dateOfJoining = "Joining date should be current date";
    // }
    return errors;
  };



  const handleCancleClick = (e) => {
    navigate("/Staff");
  };

  return (
    <>
      {/* <Outerheader /> */}
      {/* <Sidebar /> */}
      <div className=" overflow-hidden">
        <div className="ml-[260px] mt-[11px]">
          <div className="flex">
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
            <p className="ml-[12px] text-[#666666] font-medium">Add Staff</p>
          </div>
        </div>

        <p className="text-[#082161] font-medium mr-[650px] flex justify-center ml-[28rem] mt-[3rem]">
          Add Staff Details
        </p>

        <div className="flex justify-center ml-[11rem] mt-[1rem]">
          <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block mr-[10rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  First Name
                </label>
                <input
                  className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  name="firstName"
                  value={formValues.firstName || ""}
                  onChange={handleChange}
                />
                <p className="text-red-400 text-xs">{formErrors.firstName}</p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block mr-[10rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  name="lastName"
                  value={formValues.lastName || ""}
                  onChange={handleChange}
                />

                <p className="text-red-400 text-xs">{formErrors.lastName}</p>
              </div>

              <div className="w-full md:w-1/2 px-3 mt-2">
                <label
                  className="mr-[11rem] block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Gender
                </label>
                <div className="relative">
                  <select
                    name="gender"
                    value={formValues.gender}
                    onChange={handleChange}
                    className="border-input block appearance-none w-full bg-[#ffffff] border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="select">Select</option>
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
              <div className="w-full md:w-1/2 px-3 mt-2">
                <label
                  className="block mr-[8.5rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Mobile Number
                </label>
                <input
                  className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border border-gray-200 rounded-md py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  name="mobile"
                  value={formValues.mobile || ""}
                  onChange={handleChange}
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
                  className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border  rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                  type="date"
                  name="dateOfBirth"
                  value={formValues.dateOfBirth || ""}
                  onChange={handleChange}
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
                  className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border border-gray-200 rounded-md py-3 mb-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="email"
                  name="email"
                  value={formValues.email || ""}
                  onChange={handleChange}
                />
                <p className="text-red-400 text-xs">{formErrors.email}</p>
              </div>

              <div className="w-full md:w-1/2 px-3 mt-2">
                <label
                  className="mr-[12rem] block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Role
                </label>
                <div className="relative ">
                  <select
                    name="role"
                    onChange={handleChange}
                    value={formValues.role}
                    className="border-input block appearance-none w-full bg-[#ffffff] border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="select">Select</option>
                    {/* <option value="admin">Admin</option> */}
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    {/* <option value="pharmacist">Pharmacist</option> */}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mb-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                <p className="text-red-400 text-xs">{formErrors.role}</p>
              </div>
              <div className="w-full md:w-1/2 px-3 mt-2">
                <label
                  className="block mr-[10.5rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Password
                </label>
                <input
                  className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="password"
                  name="password"
                  value={formValues.password || ""}
                  onChange={handleChange}
                />
                <p className="text-red-400 text-xs">{formErrors.password}</p>
              </div>
              <div className="w-full md:w-1/2 px-3">
              <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">
                Address
              </label>
              <input
                value={formValues.address || ""}
                onChange={handleChange}
                name="address"
                id="address"
                className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-2">
                <label
                  className="block mr-[8rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Date of Joining
                </label>
                <input
                  className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                  type="date"
                  name="dateOfJoining"
                  value={formValues.dateOfJoining || ""}
                  onChange={handleChange}
                />
                <p className="text-red-400 text-xs">
                  {formErrors.dateOfJoining}
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <div className="flex">
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
                type="button"
                onClick={handleSubitClick}
                className="btn btn-outline text-white capitalize btn-md mr-[1rem] hover:#082161 bg-[#082161]"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleCancleClick}
                className="btn btn-outline text-[#082161] capitalize btn-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Addstaff;
