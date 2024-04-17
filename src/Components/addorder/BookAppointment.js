import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';

let headersList =
{
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-Parse-Application-Id": process.env.REACT_APP_XPARSE_APPLICATION_ID,
    "X-Parse-REST-API-Key": process.env.REACT_APP_XPARSE_REST_API_KEY
};

const BookAppointment = (props) => {
    const navigate = useNavigate()
    const {patientID} = props
    // state for book an appointment 
    const [doctors, setDoctors] = useState([])
    // const [datefromUser, setDate] = useState("")
    const [bookAppointment, setBookAppointment] = useState({
        appointdate: "",
        doctor: "",
        complaints: "",

    })
    const convertDateToISO = () => {
        const event = new Date(bookAppointment.appointdate);
        bookAppointment.appointdate = event.toISOString();
    }

    const handleOnchange = (event) => {
        const { name, value } = event.target;
        setBookAppointment({ ...bookAppointment, [name]: value })
    }

    //   handle Book Appointment button to submit data in Database

    const handleBookAppointment = async () => {
        convertDateToISO()
        let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/appointment`, {
            method: 'POST',
            headers: headersList,
            body: JSON.stringify({
                appoint_date: {
                    "__type": "Date",
                    "iso": bookAppointment?.appointdate
                },
                doctor: {
                    "__type": "Pointer",
                    "className": "_User",
                    "objectId": bookAppointment?.doctor
                },
                complaints: bookAppointment?.complaints,
                patient: {
                    "__type": "Pointer",
                    "className": "_User",
                    "objectId": patientID
                }
            })
        })
        result = await result.json()
        navigate('/Appointment')
        console.log(result);
    }

    // api for getting the list of doctors
    useEffect(() => {
        const doctorsAPI = async () => {
            let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/_User?where={"role":"doctor"}`, {
                method: 'GET',
                headers: headersList
            })
            result = await result.json();
            setDoctors(result.results)
            // console.log(result.results);
        }
        doctorsAPI()
    }, [])

    return (
        <div>
            <div className="flex items-center m-2">
                <div className="datepicker relative form-floating xl:w-full">
                    <label htmlFor="floatingInput" className="text-gray-700 font-bold text-sm">
                        Shedule Date & Time
                    </label>
                    <input
                        type="date"
                        name="appointdate"
                        value={bookAppointment?.appointdate}
                        className="form-control block w-full py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        // placeholder="DD/MM/YY"
                        onChange={handleOnchange}
                    />
                </div>
            </div>
            <div className="flex items-center m-2">
                <div className="datepicker relative form-floating xl:w-full text-sm">
                    <label htmlFor="floatingInput" className="text-gray-700 font-bold">
                        Doctor
                    </label>
                    <label
                        htmlFor="floatingInput"
                        className="text-gray-700"
                    ></label>
                    <select
                        name="doctor"
                        value={bookAppointment?.doctor}
                        className="w-full px-3 py-1.5 form-control block text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        onChange={handleOnchange}>
                        {doctors?.map((item) => {
                            return (
                                <option key={item.objectId} value={item.objectId}>
                                    {item.full_name}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className="flex items-center m-2">
                <div className="datepicker relative form-floating xl:w-full">
                    <label htmlFor="floatingInput" className="text-gray-700 font-bold text-sm">
                        Complaints/Notes
                    </label>
                    <input
                        type="text"
                        name="complaints"
                        value={bookAppointment?.complaints}
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder=""
                        onChange={handleOnchange}
                    />
                </div>
            </div>
            <div className="book-appointment-btn-wrapper">
                <button
                    className="book-appointment-btn"
                    onClick={handleBookAppointment}
                >
                    Book Appointment
                </button>
            </div>
        </div>
    )
}

export default BookAppointment