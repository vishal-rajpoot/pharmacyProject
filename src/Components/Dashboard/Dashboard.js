
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Globaldata } from "../../App";
import DashBoardCard from "./DashBoardCard";
import Footer from "./Footer";
import Middle from "./Middle";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isUserLogin } = useContext(Globaldata);

  const [orderCount, setOrderCount] = useState(0);
  const [NewPatientCount, setNewPatientsCount] = useState(0);
  const [staff, setStaff] = useState();
  const [staffCount, setStaffCount] = useState(0)
  const [appointment, setAppointment] = useState();
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [patients, setPatients] = useState();

  let headersList = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Parse-Application-Id": process.env.REACT_APP_XPARSE_APPLICATION_ID,
    "X-Parse-REST-API-Key": process.env.REACT_APP_XPARSE_REST_API_KEY,
  };
const getAllAppointment = async () => {

    let Appointmentresult = await fetch(`${process.env.REACT_APP_REST_URL}/classes/appointment?&limit=4&count=1`, {
      method: 'GET',
      headers: headersList,
    })
    Appointmentresult = await Appointmentresult.json()
    setAppointment(Appointmentresult?.results)
    setAppointmentCount(Appointmentresult?.count)
  }
 

  const getNewPatients = async () => {

    let NewPatientsresult = await fetch(
      `${process.env.REACT_APP_REST_URL}/classes/_User?where={"role":"customer"}&count=1&limit=4&order=-createdAt`,
      {
        method: "GET",
        headers: headersList,
      }
    );
    NewPatientsresult = await NewPatientsresult.json();
    setPatients(NewPatientsresult.results);
    setNewPatientsCount(NewPatientsresult?.count);
  };

  const getAllOrders = async () => {

    let OrderResult = await fetch(
      `${process.env.REACT_APP_REST_URL}/classes/Order?&count=1`,
      {
        method: "GET",
        headers: headersList,
      }
    );
    OrderResult = await OrderResult.json();
    setOrderCount(OrderResult?.count);
  };

  const getAllStaff = async () => {
    let staffResult = await fetch(
      `${process.env.REACT_APP_REST_URL}/classes/_User?where={"role":{"$in":["nurse","doctor"]}}&limit=4&count=1`,
      {
        method: "GET",
        headers: headersList,
      }
    );
    staffResult = await staffResult.json();
    setStaff(staffResult?.results);
    setStaffCount(staffResult?.count)
  };

  useEffect(() => {
    getNewPatients();
    getAllOrders();
    getAllStaff();
    getAllAppointment();
  }, []);

  useEffect(() => {
    if (!isUserLogin()) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <DashBoardCard
        {...{
          appointmentCount,
          orderCount,
          NewPatientCount,
        }}
      />
      <Middle
        {...{
          appointment,
          appointmentCount,
          staff,
          staffCount
        }}
      />
      <Footer
        {...{
          patients,
          NewPatientCount
        }}
      />
    </div>
  );
};

export default Dashboard;
