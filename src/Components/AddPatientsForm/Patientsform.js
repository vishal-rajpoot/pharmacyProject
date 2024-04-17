import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import { useMutation } from "graphql-hooks";
import { ClientContext } from "graphql-hooks";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import '../../App.css'

export const ADD_PATIENT_MEMBER = `
mutation AddPatientMutation(
  $first_name: String!
  $last_name: String!
    $username: String!
    $password: String!
    $address: String!
    $dateOfBirth: Date!
    $gender: String!
    $email: String!
    $mobile: String!
    $dateOfJoining: String
    $country: String!
    $city: String!
    $state: String!
    $role: String!
  ) {
    createUser(
      input: {
        fields: {
          first_name: $first_name
          last_name: $last_name
          username: $username
          password: $password
          address: $address
          dateOfBirth: $dateOfBirth
          gender: $gender
          email: $email
          mobile: $mobile
          dateOfJoining: $dateOfJoining
          country: $country
          city: $city
          state: $state
          is_actiive: true
          role: $role
          ACL: { roles: { roleName: "admin", read: true, write: true } }
        }
      }
    ) {
      user {
        objectId
        first_name
        last_name
        username
        address
        dateOfBirth
        gender
        email
        mobile
        joining_date
        country
        city
        state
        role
        createdAt
      }
    }
  }
  
`;

function Patientsform() {
  const [inputState, setInputState] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
    role: "customer",
    country: "",
    city: "",
    state: "",
    joining_date: "",
  });

  const [formValues, setFormValues] = useState(inputState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const client = useContext(ClientContext);
  const navigate = useNavigate();
  const [addPatientMutation] = useMutation(ADD_PATIENT_MEMBER);

  const handleChange = (evt) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    console.log(name,value);
    setFormValues({ ...formValues, [name]: value });
  };

  // console.log(formValues);

  const submitPatientForm = async () => {
    let headersList = {
      "X-Parse-Application-Id": process.env.REACT_APP_XPARSE_APPLICATION_ID,
      "X-Parse-REST-API-Key": process.env.REACT_APP_XPARSE_REST_API_KEY,
      "X-Parse-Revocable-Session": process.env.REACT_APP_XPARSE_REVOCABLE_SESSION,
      // "X-Parse-Session-Token": reactLocalStorage.get("sessionToken") || "",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      ACL: {
        "role:admin": {
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
      state: formValues.state,
      city: formValues.city,
      country: formValues.country,
      is_actiive: true,
      address: formValues.address,
      role: formValues.role,
      dateOfJoining: formValues.joining_date,
    });

    let response = await fetch(
      `${process.env.REACT_APP_REST_URL}/classes/_User`,
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.text();
    console.log(data);
    navigate("/Patients", { state: { from: "Patientsform" } });
  };

  const handleSubitClick = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      submitPatientForm();
    }
  }, [formErrors]);

  const validate = (values) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    const errors = {};
    let date = new Date();
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    const currentDate = `${y}-0${m}-0${d}`;

    if (!values.firstName) {
      errors.firstName = "First Name is Requried";
    } else if (values.firstName.length < 3) {
      errors.firstName = "First Name should be greter then 3 character";
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
    if (!values.address) {
      errors.address = "Address is Requried";
    }
    if (!values.password) {
      errors.password = "Password is Requried";
    } else if (values.password.length < 8 || values.password.length > 8) {
      errors.password = "Password can not be less or greter then 8 character";
    }
    if (!values.country) {
      errors.country = "Country is Requried";
    }
    if (!values.city) {
      errors.city = "City is Requried";
    }
    if (!values.state) {
      errors.state = "State is Requried";
    }
    // if (!values.joining_date) {
    //   errors.joining_date = "Joining date is requried";
    // } else if (values.joining_date != currentDate) {
    //   errors.joining_date = "Joining date should be current date";
    // }
    return errors;
  };

  const handleCancleClick = (e) => {
    navigate("/Patients");
  };

  return (
    <>
      {/* <Outerheader /> */}
      {/* <Sidebar /> */}
      <div className="flex justify-start pl-48 pt-[4.5rem]">
        <div className="flex">
          <p className="text-[#082161] font-medium">Patients</p>
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
          <p className="ml-[12px] text-[#666666] font-medium">Add Patient</p>
        </div>
      </div>
      <div>
        <div>
          <div className="w-[60vw] max-h-full mx-[28rem] relative">
            <h4 className=" text-blue-900 mx-1 mb-3">
              <b>Add Patient Details</b>
            </h4>
            <form>
              <div className="w-full max-w-lg mx-8">
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block tracking-wide text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      First Name
                    </label>
                    <input
                      className="border-input appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                      type="text"
                      name="firstName"
                      value={formValues.firstName || ""}
                      onChange={handleChange}
                    />
                    <p className="text-red-400 text-xs">
                      {formErrors.firstName}
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block tracking-wide text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Last Name
                    </label>
                    <input
                      className="border-input appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                      type="text"
                      name="lastName"
                      value={formValues.lastName || ""}
                      onChange={handleChange}
                    />
                    <p className="text-red-400 text-xs">
                      {formErrors.lastName}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block tracking-wide text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-state"
                    >
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        name="gender"
                        value={formValues.gender}
                        onChange={handleChange}
                        className="border-input block appearance-none w-full border border-gray-300 text-gray-600 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                        id="grid-state"
                      >
                        <option>Select</option>
                        <option>Male</option>
                        <option>Female</option>
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
                      className="block tracking-wide text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Mobile No
                    </label>
                    <input
                      className="border-input appearance-none block w-full text-gray-700 border border-gray-300 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                      placeholder="+63"
                      type="number"
                      name="mobile"
                      value={formValues.mobile || ""}
                      onChange={handleChange}
                    />
                    <p className="text-red-400 text-xs">{formErrors.mobile}</p>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="mr-[9.8rem] block tracking-wide text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-state"
                    >
                      Date of Birth
                    </label>
                    <input
                      className="border-input appearance-none block w-full border border-gray-300 rounded text-gray-600 py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                      type="date"
                      name="dateOfBirth"
                      value={formValues.dateOfBirth || ""}
                      onChange={handleChange}
                    />
                    <p className="text-red-400 text-xs">
                      {formErrors.dateOfBirth}
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block tracking-wide text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Email
                    </label>
                    <input
                      className="border-input appearance-none block w-full text-gray-600 border border-gray-300 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                      type="email"
                      name="email"
                      value={formValues.email || ""}
                      onChange={handleChange}
                    />
                    <p className="text-red-400 text-xs">{formErrors.email}</p>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full px-3">
                    <label
                      className="block tracking-wide text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Address
                    </label>
                    <input
                      className="border-input appearance-none block w-full text-gray-700 border border-gray-300 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                      type="text"
                      name="address"
                      value={formValues.address || ""}
                      onChange={handleChange}
                    />
                    <p className="text-red-400 text-xs">{formErrors.address}</p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Country
                    </label>
                    <input
                      className="border-input appearance-none block w-full text-gray-700 border border-gray-300 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                      type="text"
                      name="country"
                      value={formValues.country || ""}
                      onChange={handleChange}
                    />
                    <p className="text-red-400 text-xs">{formErrors.country}</p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="mr-[10rem] block tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-state"
                    >
                      City
                    </label>
                    <input
                      className="border-input appearance-none block w-full text-gray-700 border border-gray-300 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                      type="text"
                      name="city"
                      value={formValues.city || ""}
                      onChange={handleChange}
                    />
                    <p className="text-red-400 text-xs">{formErrors.city}</p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="mr-[11rem] block tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-state"
                    >
                      State
                    </label>
                    <input
                      className="border-input appearance-none block w-full text-gray-700 border border-gray-300 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                      type="text"
                      name="state"
                      value={formValues.state || ""}
                      onChange={handleChange}
                    />
                    <p className="text-red-400 text-xs">{formErrors.state}</p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="mr-[1rem] block tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-state"
                    >
                      Password
                    </label>
                    <input
                      className=" border-input appearance-none block w-full text-gray-700 border border-gray-300 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                      type="password"
                      name="password"
                      value={formValues.password || ""}
                      onChange={handleChange}
                    />
                    <p className="text-red-400 text-xs">
                      {formErrors.password}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="mr-[1rem] block tracking-wide text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-state"
                    >
                      Date of Registration
                    </label>
                    <input
                      className="border-input appearance-none block w-full border border-gray-300 rounded text-gray-600 py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                      type="date"
                      name="joining_date"
                      value={formValues.joining_date || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 flex">
                    <img
                      src="/image/patientLogo.svg"
                      alt="Add image"
                      className="w-12 mt-5"
                    />
                    <input
                      type="file"
                      name="avatar"
                      id="avatar"
                      accept="image/png, image/jpeg"
                      className="mt-6 ml-2"
                    />
                  </div>
                  <p className="text-red-400 ml-2 text-xs">
                    {formErrors.joining_date}
                  </p>
                </div>
                <div className="flex justify-start mt-3">
                  <button
                    onClick={handleSubitClick}
                    className="btn btn-outline text-white capitalize btn-sm mr-[1rem] hover:#082161 bg-[#082161]"
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleCancleClick}
                    className="btn btn-outline text-[#082161] capitalize btn-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Patientsform;
