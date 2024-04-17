import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

let headersList =
{
  "Accept": "application/json",
  "Content-Type": "application/json",
  "X-Parse-Application-Id": process.env.REACT_APP_XPARSE_APPLICATION_ID,
  "X-Parse-REST-API-Key": process.env.REACT_APP_XPARSE_REST_API_KEY,
  "X-Parse-Session-Token": localStorage.getItem('sessionToken')
  // "X-Parse-Session-Token": reactLocalStorage.get('sessionToken')
};

function Editpatientsform() {
  const navigate = useNavigate();
  const { id } = useParams();
  const objectId = id;
  const [patientInfo, setPatientInfo] = useState()
  const [formValues, setFormValues] = useState({
  firstName: "",
  lastName: "",
  fullName: "",
  gender: "",
  mobile: "",
  dateOfBirth: "",
  email: "",
  address: "",
  country: "",
  city: "",
  state: "",
  role: "customer",
  joiningDate: ""});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const getSinglePatient = async () => {
    let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/_User/${objectId}`, {
      method: 'GET',
      headers: headersList
    })
    result = await result.json()
    setPatientInfo(result)

  }
  useEffect(() => {
    getSinglePatient()
  }, [])

  useEffect(() => {
    if (patientInfo) {
      const { first_name, last_name, full_name, gender, email, username, dateOfBirth, mobile, country, city, address, createdAt, state, } = patientInfo;
      setFormValues({
        firstName: first_name,
        lastName: last_name,
        fullName: full_name,
        gender: gender,
        mobile: mobile,
        dateOfBirth: dateOfBirth?.slice(0, 10),
        email: username,
        address: address,
        country: country,
        city: city,
        state: state,
        role: "customer",
        joiningDate: createdAt?.slice(0, 10),
      });
    }
  }, [patientInfo])

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const handleUpdatePatientForm = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
    let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/_User/${objectId}`, {
      method: 'PUT',
      headers: headersList,
      body: JSON.stringify({
        full_name: formValues.fullName,
        gender: formValues.gender,
        mobile: formValues.mobile,
        dateOfBirth: formValues.dateOfBirth,
        email: formValues.email,
        address: formValues.address,
        country: formValues.country,
        city: formValues.city,
        state: formValues.state,
        dateOfJoining: formValues.joiningDate,
        role: formValues.role,
      })
    })
    result = await result.json()
    if (result) {
      navigate("/Patients");
    }
  };


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
    if (!values.dateOfBirth) {
      errors.dateOfBirth = "Date Of Birth is Requried";
    } else if (values.dateOfBirth > currentDate) {
      errors.dateOfBirth = "Date Of Birth can not greater then current date";
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
    if (!values.address) {
      errors.address = "Address is Requried";
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
    if (!values.joiningDate) {
      errors.joiningDate = "Joining date is requried";
    }
    return errors;
  };

  const handleCancleClick = () => {
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
          <p className="ml-[12px] text-[#666666] font-medium">Edit Patient</p>
        </div>
      </div>

      <div>
        <div>
          <div className="w-[60vw] max-h-full mx-[28rem] relative">
            <h4 className=" text-blue-900 mx-1 mb-3">
              <b>Edit Patient Details</b>
            </h4>
            <form onSubmit={handleUpdatePatientForm}>
              <div className="w-full max-w-lg mx-8">
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full px-3">
                    <label
                      className="block tracking-wide text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Full Name
                    </label>
                    <input
                      className="border-input appearance-none block w-full text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                      id="grid-last-name"
                      type="text"
                      name="fullName"
                      value={formValues.fullName}
                      onChange={(e) => handleChange(e)}
                    />
                    <p className="text-red-400 text-xs">
                      {formErrors.firstName}
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
                        className="border-input block appearance-none w-full border border-gray-300 text-gray-600 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                        id="grid-state"
                        name="gender"
                        value={formValues.gender}
                        onChange={(e) => handleChange(e)}
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
                      id="grid-last-name"
                      type="text"
                      placeholder="+63"
                      name="mobile"
                      value={formValues.mobile}
                      onChange={(e) => handleChange(e)}
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
                      value={formValues.dateOfBirth}
                      onChange={(e) => handleChange(e)}
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
                      id="grid-last-name"
                      type="email"
                      name="email"
                      value={formValues.email}
                      onChange={(e) => handleChange(e)}
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
                      id="grid-password"
                      type="text"
                      name="address"
                      value={formValues.address}
                      onChange={(e) => handleChange(e)}
                    />
                    <p className="text-red-400 text-xs">{formErrors.address}</p>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block mr-[26rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Country
                    </label>
                    <input
                      className="border-input appearance-none block w-full text-gray-700 border border-gray-300 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                      id="grid-last-name"
                      type="text"
                      name="country"
                      value={formValues.country}
                      onChange={(e) => handleChange(e)}
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
                      id="grid-last-name"
                      type="text"
                      name="city"
                      value={formValues.city}
                      onChange={(e) => handleChange(e)}
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
                      id="grid-last-name"
                      type="text"
                      name="state"
                      value={formValues.state}
                      onChange={(e) => handleChange(e)}
                    />
                    <p className="text-red-400 text-xs">{formErrors.state}</p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="mr-[1rem] block tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-state"
                    >
                      Patient Complaint
                    </label>
                    <input
                      className="border-input appearance-none block w-full text-gray-700 border border-gray-300 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                      id="grid-last-name"
                      type="text"
                    />
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
                      name="joiningDate"
                      value={formValues.joiningDate}
                      onChange={(e) => handleChange(e)}
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
                  <p className="text-red-400 text-xs">
                    {formErrors.joiningDate}
                  </p>
                </div>
                <div className="flex justify-start mt-3">
                  <button
                    className="btn btn-outline text-white capitalize btn-sm mr-[1rem] hover:#082161 bg-[#082161]"
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-outline text-[#082161] capitalize btn-sm"
                    onClick={handleCancleClick}
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
export default Editpatientsform;
