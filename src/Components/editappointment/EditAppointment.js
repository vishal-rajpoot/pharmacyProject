import React, { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import Appointment from "../appointment/Appointments";
// import Outerheader from '../outerheader/Outerheader'
import Sidebar from "../sidebar/Sidebar";


let headersList =
{
  "Accept": "application/json",
  "Content-Type": "application/json",
  "X-Parse-Application-Id": process.env.REACT_APP_XPARSE_APPLICATION_ID,
  "X-Parse-REST-API-Key": process.env.REACT_APP_XPARSE_REST_API_KEY,
  "X-Parse-Session-Token": localStorage.getItem('sessionToken')
};

const EditAppointment = () => {
  const { id } = useParams();
  const objectId = id;

  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([])
  const [editAppointment, seteditAppointment] = useState({
    appointdate: "",
    doctor: "",
    status: "",
    complaints: "",
    patient: "",
    patientId: ""
  });

  
  const getAppointmentData = async ()=>{
    let result = await fetch(`https://qpdev.maitretech.com/api/classes/appointment/${objectId}?include=patient,doctor`,{
      method:"GET",
      headers:headersList,
    })
    result = await result.json()
    const date = new Date(result.appoint_date.iso);
    date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
    // console.log(date);
    seteditAppointment({
        appointdate: date,
        doctor: result?.doctor?.full_name,
        status: result?.status,
        complaints: result?.complaints,
        patient: result.patient.first_name,
        patientId: result.patient.objectId
    })
  }
  useEffect(()=>{
    getAppointmentData()
  },[])

  const handleOnchangeDate = () => {
    const event = new Date(editAppointment.appointdate);
    editAppointment.appointdate = event.toISOString();
    // console.log(editAppointment.appointdate);
  };

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    seteditAppointment({ ...editAppointment, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    handleOnchangeDate();
    let result = await fetch(
      `${process.env.REACT_APP_REST_URL}/classes/appointment/${objectId}`,
      {
        method: "PUT",
        headers: headersList,
        body: JSON.stringify({
          appoint_date: {
            __type: "Date",
            iso: editAppointment?.appointdate,
          },
          doctor: {
            __type: "Pointer",
            className: "_User",
            objectId: editAppointment?.doctor,
            // full_name: editAppointment?.doctor,
          },
          complaints: editAppointment?.complaints,
          status: editAppointment?.status,
          patient: {
            __type: "Pointer",
            className: "_User",
            objectId: editAppointment.patientId,
            first_name: editAppointment?.patient
          },
        }),
      }
    );
    result = await result.json();
    navigate('/Appointment')
    console.log(result);
  };

  useEffect(() => {
    const doctorsAPI = async () => {
      let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/_User?where={"role":"doctor"}`, {
        method: 'GET',
        headers: headersList
      })
      result = await result.json();
      setDoctors(result.results)
    }
    doctorsAPI()
  }, [])

  return (
    <>
      <div className="flex justify-start pl-48 pt-[4.5rem]">
        <div className="flex">
          <p className="text-[#082161] font-medium">App</p>
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

            <form>
              <div className="w-full max-w-lg mx-8">
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block tracking-wide text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Patient Name {"id : " + editAppointment.patientId}
                    </label>
                    <input
                      className="border-input mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                      id="grid-last-name"
                      type="text"
                      name="patient"
                      value={editAppointment.patient}
                      readOnly
                      onChange={handleOnchange}
                    />
                  </div>

                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block tracking-wide text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Doctor name
                    </label>
                    <select
                      className="border-input w-full bg-gray-200 rounded px-4 leading-tight focus:outline-none  focus:border-gray-500 h-9"
                      id="grid-last-name"
                      type="text"
                      name="doctor"
                      value={editAppointment.doctor}
                      onChange={handleOnchange}
                    >
                      {doctors?.map((item) => {
                        return (
                          <option key={item.objectId} value={item.objectId} defaultChecked>
                            {item.full_name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block tracking-wide text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Shedule Date & Time
                    </label>
                    <input
                      name="appointdate"
                      value={editAppointment?.appointdate}
                      className="border-input appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                      id="grid-last-name"
                      type="date"
                      onChange={handleOnchange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block tracking-wide text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Status
                    </label>
                    <select
                      className=" block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                      id="grid-last-name"
                      type="text"
                      name="status"
                      value={editAppointment.status}
                      onChange={handleOnchange}
                    >
                      <option defaultChecked>Fixed</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="mr-[2rem] block tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-state"
                    >
                      Patient Complaint
                    </label>
                    <input
                      className="border-input appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-9"
                      id="grid-last-name"
                      type="text"
                      name="complaints"
                      value={editAppointment.complaints}
                      onChange={handleOnchange}
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-5">
                  <button
                    className="btn btn-outline text-white capitalize btn-sm mr-[1rem] hover:#082161 bg-[#082161]"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button className="btn btn-outline text-[#082161] capitalize btn-sm"
                    onClick={(e) => {
                      e.preventDefault()
                      navigate('/Appointment')
                    }}>
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
};

export default EditAppointment;
