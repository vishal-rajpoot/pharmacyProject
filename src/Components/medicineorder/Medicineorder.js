import { async } from "@firebase/util";
import { useQuery } from "graphql-hooks";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { getFirestore, collection, addDoc, setDoc, serverTimestamp, onSnapshot, query, orderBy, doc } from 'firebase/firestore';
import { db } from '../../chatcomponents/firebase'
import Pagination from "../Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { displayitem } from "../PagePerItems";
import { Globaldata } from "../../App";

function Medicineorder() {
  const { pageNumber } = useParams()
  const navigate = useNavigate()
  const { isUserLogin } = useContext(Globaldata)
  const [orders, setOrders] = useState()
  const [singleOrder, setSingleOrder] = useState()
  const [orderItems, setOrderItems] = useState()
  const [orderCount, setOrderCount] = useState(0)
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (!isUserLogin()) {
      navigate('/')
    }
  }, [])

  let headersList =
  {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-Parse-Application-Id": process.env.REACT_APP_XPARSE_APPLICATION_ID,
    "X-Parse-REST-API-Key": process.env.REACT_APP_XPARSE_REST_API_KEY
  };

  const getAllOrders = async () => {
    let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/Order?include=patient&where={"objectId":{"$regex":"${query}","$options":"i"}}&limit=${displayitem}&skip=${(pageNumber -1)*displayitem}&count=1&order=-createdAt`, {
      method: 'GET',
      headers: headersList,
    })
    result = await result.json()
    setOrders(result?.results)
    setOrderCount(result?.count)
  }
  useEffect(() => {
    getAllOrders()
  }, [pageNumber,query])


  const getSingleOrder = async (order) => {
    setSingleOrder(order)
    let response = await fetch(`${process.env.REACT_APP_REST_URL}/classes/OrderItem?where={ "order_id": { "__type": "Pointer", "className": "Order", "objectId": "${order.objectId}" } }&include=inventory`, {
      method: 'GET',
      headers: headersList,
    })
    response = await response.json()
    setOrderItems(response.results)
  }

  const pageRef = (page) => {
    navigate(`/Order/Page=${page}`)
  }

  const handleOrderStatus = async (e, order) => {
    let selectedOrderStatus = e.target.value
    let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/Order/${order.objectId}`, {
      method: 'PUT',
      headers: headersList,
      body: JSON.stringify({ status: selectedOrderStatus })
    })
    result = await result.json()
    if (result) {
      let SystemGeneratedMessage;
      if (selectedOrderStatus == 'Ordered') {
        SystemGeneratedMessage = `Hello Mr. ${order.patient.full_name} your order ${order.objectId} has been placed`
      }
      if (selectedOrderStatus == 'Payment Verified') {
        SystemGeneratedMessage = `Hello Mr. ${order.patient.full_name} your order ${order.objectId} payment has been verified `
      }
      if (selectedOrderStatus == 'Out For Dilevery') {
        SystemGeneratedMessage = `Hello Mr. ${order.patient.full_name} your order ${order.objectId} is now out for delivery `
      }

      if (selectedOrderStatus == 'Cancelled') {
        SystemGeneratedMessage = `Hello Mr. ${order.patient.full_name} your order ${order.objectId} has been cancelled`
      }
      if (selectedOrderStatus == 'Completed') {
        SystemGeneratedMessage = `Hello Mr. ${order.patient.full_name} your order ${order.objectId} has been completed`
      }
      try {
        await addDoc(collection(db, 'chat-rooms', `doctor-${order.patient.objectId}`, 'messages'), {
          _id: new Date().getTime(),
          displayName: 'Admin',
          text: SystemGeneratedMessage,
          timestamp: serverTimestamp(),
          user: {
            name: 'Admin',
            _id: 'admin@gmail.com'
          }
        });
      }
      catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <div className="flex ml-[15rem] ">
        <p className="text-xl  text-[#082161]  mt-20 font-[700]">
          Medicine orders
        </p>
      </div>
      <div className="bg-[#D9D9D9] w-[62rem] h-[3rem] ml-[17rem] my-5">
        <div className="flex">
          <p className="text text-xl  ml-[25px]  text-[black] font-[500] pt-[9px]">
            Medicine Orders
          </p>
          <input
            type="text"
            className="form-control ml-[2rem] block px-4 h-[2.5rem] w-[12rem] p-1 mt-[.3rem]  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none drop-shadow-md"
            placeholder="search here..."
            value={query}
            onChange={(e)=>{setQuery(e.target.value)}}
          />
        </div>
      </div>
      <div className="mx-7">
        <div className="flex ml-[15rem] mt-[1rem]">
          <table className="table-auto w-[65rem] h">
            <thead>
              <tr className="text-center">
                <th>
                  <input type="checkbox" />
                </th>
                <th>Order</th>
                <th>Customer Name</th>
                <th>Quantity</th>
                <th>Orders Date</th>
                <th>Amount</th>
                <th>Prescribed By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => {
                const { objectId, createdAt, item_count, total_amount, created_by, patient } = order
                // console.log( objectId, createdAt, item_count, total_amount, created_by, patient )
                return (
                  <tr className="text-center" key={objectId}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <label onClick={() => getSingleOrder(order)} htmlFor="my-modal-3" className="cursor-pointer text-blue-700"><td className="pt-3">{objectId}</td></label>
                    <td>
                      {patient?.full_name}
                    </td>
                    <td>{item_count}</td>
                    <td>{createdAt.slice(0, 10)}</td>
                    <td>{total_amount.toFixed(2)}</td>
                    <td>
                      {/* {created_by?.first_name} {created_by?.last_name} */}
                      Doctor
                    </td>
                    <td>
                      <select className="select select-bordered" onChange={(e) => handleOrderStatus(e, order)}>
                        <option disabled selected>{order.status}</option>
                        <option value='Ordered'>Ordered</option>
                        <option value='Payment Verified'>Payment Verified</option>
                        <option value='Out For Dilevery'>Out For Dilevery</option>
                        <option value='Completed'>Completed</option>
                        <option value='Cancelled'>Cancelled</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative w-11/12 max-w-5xl">
              <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
              <h3 className="text-lg font-bold text-blue-800">Medicine Order Details</h3>
              <hr />
              <h4 className="py-2 font-bold">Order Information</h4>
              <h4 className="py-2 font-bold">Order ID : {singleOrder?.objectId}</h4>
              <h4 className="py-2 font-bold">Date/Time : {singleOrder?.updatedAt}</h4>
              <h4 className="py-2 font-bold">Patient Name : {singleOrder?.patient?.full_name}</h4>
              <h4 className="py-2 font-bold">Mobile No : {singleOrder?.patient?.mobile}</h4>
              <h4 className="py-2 font-bold">Medicine :</h4>
              <hr />
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Medicine Name</th>
                      <th>Brand Name</th>
                      <th>Size</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems?.map((orderitem, index) => {
                      return (
                        <tr key={orderitem.objectId}>
                          <td>{orderitem.objectId}</td>
                          <td>{orderitem?.inventory?.generaic_name}</td>
                          <td>{orderitem?.inventory?.brand}</td>
                          <td>{orderitem?.inventory?.size}</td>
                          <td>{orderitem.qty}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <hr className="py-2" />
              <h4 className="py-2 font-bold text-blue-800">Total Item Amount : <span className="ml-24">{singleOrder?.total_amount}</span></h4>
              <h4 className="font-bold text-blue-800">Order Status : <span className="text-green-600 ml-32">Completed</span></h4>
            </div>
          </div>
        </div>


      </div>
      <Pagination
        {
        ...{
          pageNumber,
          orderCount,
          pageRef
        }
        } />

    </>
  );
}
export default Medicineorder;

