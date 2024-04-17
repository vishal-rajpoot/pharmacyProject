import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Globaldata } from "../../App";
import Select from 'react-select'
import trash_svg from './trash.svg'
import BookAppointment from "./BookAppointment";

let headersList =
{
  "Accept": "application/json",
  "Content-Type": "application/json",
  "X-Parse-Application-Id": process.env.REACT_APP_XPARSE_APPLICATION_ID,
  "X-Parse-REST-API-Key": process.env.REACT_APP_XPARSE_REST_API_KEY
};

const AddOrder = () => {
  const navigate = useNavigate();
  const { state } = useContext(Globaldata)
  const { chatuser } = state
  const roomId = chatuser?.roomId;
  const userId = roomId?.split('-')
  const customerid = userId?.[1]
  let userName = chatuser?.roomTitle;
  const Name = userName?.split('-')
  const PatientName = Name?.[1]

  // states for order processing
  const [inventory, setInventory] = useState()
  const [categories, setCategories] = useState()
  const [medicineItem, setMedicineItem] = useState({
    category: "",
    amount: 0,
    generic_name: "",
    brand_name: "",
    inventoryID: "",
    quantity: 1,
  });
  const [filterInventoryListByCategory, setFilterInventoryListByCategory] = useState([]);
  const [filterUniqueArrayOfGenericName, setfilterUniqueArrayOfGenericName] = useState()
  const [filterUniqueArrayOfBrands, setFilterUniqueArrayOfBrands] = useState([])
  const [orderTotalAmount, setOrderTotalAmount] = useState(0);
  const [medicineItemList, setMedicineItemList] = useState([]);
  const [local_MedicineItemList, setLocalMedicineItemList] = useState([])
  const [quantityError, setQuantityError] = useState(false)
  const [orderSummaryQuantityError, seOrderSummaryQuantityError] = useState(false)
  const [searchBy, setSearchBy] = useState("generic_name")
  const [mapState, setMapState] = useState()
  const [discount, setDiscount] = useState()

  const doctorID = "FsUkHOdCcX";
  const patientID = customerid;
  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    const getAllInventory = async () => {
      let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/Inventory/?limit=1400/?include=category`, {
        method: 'GET',
        headers: headersList,
      })
      result = await result.json()
      setInventory(result?.results)
    }
    getAllInventory()
  }, [])

  useEffect(() => {
    const getAllCategories = async () => {
      let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/Category`, {
        method: 'GET',
        headers: headersList
      })
      result = await result.json()
      let categoriesArray = result.results
      categoriesArray.forEach((ele, i) => categoriesArray[i] = { ...ele, label: ele.category_name, value: ele.objectId });
      setCategories(categoriesArray)
    }
    getAllCategories()
  }, [])


  // filter list of item from inventories based on category,
  const filterInventoryByCategory = (categoryId) => {
    let filteredInvData = inventory?.filter((inventoryItem) =>
      inventoryItem?.category?.objectId === categoryId
    );

    if (searchBy == "generic_name") {
      filteredInvData?.forEach((ele, i) => filteredInvData[i] = { ...ele, label: ele.generaic_name, value: ele.generaic_name });
      setFilterInventoryListByCategory(filteredInvData);
      // filter unique array of generic name
      const uniqueGenericName = [];
      let filterUniqueGenericNameArray = filteredInvData?.filter(element => {
        const isDuplicate = uniqueGenericName.includes(element.generaic_name);
        if (!isDuplicate) {
          uniqueGenericName.push(element.generaic_name)
          return true;
        }
        return false;
      });
      setfilterUniqueArrayOfGenericName(filterUniqueGenericNameArray)
    }
    if (searchBy == "brand_name") {
      filteredInvData?.forEach((ele, i) => filteredInvData[i] = { ...ele, label: ele.brand, value: ele.brand });
      setFilterInventoryListByCategory(filteredInvData);
      // filter unique array of brand name
      const uniqueBrands = [];
      let filterUniqueBrandNameArray = filteredInvData?.filter(element => {
        const isDuplicate = uniqueBrands.includes(element.brand);
        if (!isDuplicate) {
          uniqueBrands.push(element.brand)
          return true;
        }
        return false;
      });
      setFilterUniqueArrayOfBrands(filterUniqueBrandNameArray)
    }
  };

  useEffect(() => {
    filterInventoryByCategory(medicineItem.category);
  }, [medicineItem.category, medicineItem.inventoryID, searchBy] || []);

  useEffect(() => {
    if (medicineItem.generic_name) {
      let filterBrands = filterInventoryListByCategory?.filter((item) => {
        return item.generaic_name === medicineItem.generic_name && item.remaining_qty !== 0
      })
      filterBrands?.forEach((ele, i) => filterBrands[i] = { ...ele, label: ele.brand, value: ele.objectId, selected_quantity: '' });
      setMapState(filterBrands)
    }

    if (medicineItem.brand_name) {
      let filterGenericnames = filterInventoryListByCategory?.filter((item) => {
        return item.brand === medicineItem.brand_name && item.remaining_qty !== 0
      })
      filterGenericnames?.forEach((ele, i) => filterGenericnames[i] = { ...ele, label: ele.brand, value: ele.objectId, selected_quantity: 1 });
      setMapState(filterGenericnames)
    }

  }, [medicineItem])


  const handleQuantity = (e, item) => {
    // console.log(e.target.value)
    let updateMapStateArray = mapState.map((element, index) => {
      if (element.objectId === item.objectId) {
        return { ...element, selected_quantity: e.target.value }
      } else {
        return element
      }
    })
    setMapState(updateMapStateArray)

    if (medicineItemList) {
      let updatedMedicineListArray = medicineItemList.map((element, index) => {
        if (element.inventoryID == item.objectId) {
          return {
            ...element, quantity: e.target.value,
            updated_remaining_quantity: item.remaining_qty - e.target.value
          }
        } else {
          return element
        }
      })
      setMedicineItemList(updatedMedicineListArray)
    }

  }

  const handleAddItems = (event, item) => {
    const { objectId, category, brand, size, generaic_name, selling_price, remaining_qty, selected_quantity } = item
    const { checked, name } = event.target
    const selectedItem = {
      category: category.objectId,
      generic_name: generaic_name,
      brand_name: brand,
      amount: selling_price,
      quantity: selected_quantity,
      inventoryID: objectId,
      size: size,
      remaining_qty: remaining_qty,
      updated_remaining_quantity: remaining_qty - selected_quantity
    }

    if (checked) {
      setMedicineItemList([...medicineItemList, selectedItem])
      setOrderTotalAmount((prev) => parseFloat(prev) + parseFloat(selling_price * selectedItem.quantity));
      // code for checked checkbox after adding the items
      mapState?.forEach((ele, i) => {
        if (ele.objectId === item.objectId) {
          mapState[i] = { ...ele, isChecked: true }
        }
      })

    } else {
      setMedicineItemList(medicineItemList.filter((item, index) => item.inventoryID !== objectId))
      setOrderTotalAmount((prev) => parseFloat(prev) - parseFloat(selling_price * selectedItem.quantity));
      // code for unchecked checkbox after removing the items
      mapState?.forEach((ele, i) => {
        if (ele.objectId === item.objectId) {
          mapState[i] = { ...ele, isChecked: false }
        }
      })
    }
  }

  // function for select checkbox even after user switch between data
  useEffect(() => {
    if (local_MedicineItemList) {
      mapState?.forEach((ele, i) => {
        local_MedicineItemList?.forEach((element, index) => {
          if (element.inventoryID === ele.objectId) {
            mapState[i] = { ...ele, isChecked: true, selected_quantity: element.quantity }
          }
        })
      })
    }
    setMapState(mapState)
  }, [mapState])

  useEffect(() => {
    let total = 0;
    medicineItemList.map((item, index) => {
      total = total + item.amount * item.quantity
      total = total - (item.discount || 0)
      total = Math.round(total)
    })
    setOrderTotalAmount(total)
  }, [medicineItemList])

  // check quantity error for main order page
  useEffect(() => {
    const checkMedicineItemList = medicineItemList.filter((item) => {
      if (item.quantity > item.remaining_qty) {
        return item
      }
    })
    checkMedicineItemList.length > 0 ? setQuantityError(true) : setQuantityError(false)
  }, [medicineItemList])


  const handleOrderSubmit = () => {
    const checkMedicineItemList = medicineItemList.filter((item) => {
      if (item.quantity > item.remaining_qty) {
        return item
      }
    })
    checkMedicineItemList.length > 0 ? alert('Please select right quantity..') : submitOrder()
  };

  const submitOrder = async () => {
    // console.log("submit order")
    if (medicineItemList.length >= 1) {
      // api call for add order 
      let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/Order`, {
        method: 'POST',
        headers: headersList,
        body: JSON.stringify({
          created_by: { __type: "Pointer", className: "_User", objectId: doctorID },
          patient: { __type: "Pointer", className: "_User", objectId: patientID },
          status: "initiated",
          item_count: medicineItemList.length,
          total_amount: orderTotalAmount,
        })
      })
      result = await result.json()
      const OrderID = result.objectId
      // console.log("added order resp", result)

      medicineItemList.forEach(async (element) => {
        // console.log(element)
        let response = await fetch(`${process.env.REACT_APP_REST_URL}/classes/OrderItem`, {
          method: 'POST',
          headers: headersList,
          body: JSON.stringify({
            category: element.category,
            category: { __type: "Pointer", className: "Category", objectId: element.category },
            inventory: { __type: "Pointer", className: "Inventory", objectId: element.inventoryID },
            order_id: { __type: "Pointer", className: "Order", objectId: OrderID },
            amount: parseFloat(element.amount) * parseFloat(element.quantity),
            qty: parseFloat(element.quantity),
            generaic_name: element.generic_name,
            brand: element.brand_name,
            discount: element.discount
          })
        })
        response = await response.json()
        // console.log("add item resp", response)
        // api call for update inventory item quantity
        if (response) {
          let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/Inventory/${element.inventoryID}`, {
            method: 'PUT',
            headers: headersList,
            body: JSON.stringify({ remaining_qty: element.updated_remaining_quantity })
          })
          result = await result.json()
          // console.log("update item resp:", result)
        }
      });
      setOrderTotalAmount(0);
      setMedicineItemList([]);
      navigate('/Order');
    }
  }

  const handleResetOrder = () => {
    setOrderTotalAmount(0)
    setMedicineItemList([])
    setMapState([])
  }

  const handleRemoveAddedItem = (item) => {
    setMedicineItemList(medicineItemList.filter((element, index) => {
      return element.inventoryID !== item.inventoryID
    }))

    if (local_MedicineItemList) {
      mapState?.forEach((element, i) => {
        if (element.objectId === item.inventoryID) {
          mapState[i] = { ...element, isChecked: false }
        }
      })
    }
    setMapState(mapState)
  }

  const handeEditAddedQuantity = (e, item) => {
    let updateMedicineListByQuantity = medicineItemList.map((element, index) => {
      if (element.inventoryID === item.inventoryID) {
        return {
          ...element, quantity: e.target.value,
          updated_remaining_quantity: element.remaining_qty - e.target.value
        }
      } else {
        return element
      }
    })
    setMedicineItemList(updateMedicineListByQuantity)
  }

  useEffect(() => {
    localStorage.setItem("local_medicineItemList", JSON.stringify(medicineItemList))
  }, [medicineItemList])

  useEffect(() => {
    let local_medicineItemList = localStorage.getItem('local_medicineItemList')
    local_medicineItemList = JSON.parse(local_medicineItemList)
    setLocalMedicineItemList(local_medicineItemList)
  }, [mapState])

  // Quantity error function for order summary page
  useEffect(() => {
    let OrderSummayQuantityError = [];
    OrderSummayQuantityError = medicineItemList?.filter((element, index) => {
      if (element.quantity > element.remaining_qty) {
        return element
      }
    })
    OrderSummayQuantityError.length > 0 ? seOrderSummaryQuantityError(true) : seOrderSummaryQuantityError(false)
  }, [medicineItemList])

  const handleRadioChange = (e) => {
    setSearchBy(e.target.value)
    if (e.target.value == "generic_name") {
      setMedicineItem({ ...medicineItem, brand_name: "" })
    }
    if (e.target.value == "brand_name") {
      setMedicineItem({ ...medicineItem, generic_name: "" })
    }
  }

  // Api call for get patient detail or patient age mainly
  const getPatientDetails = async () => {
    let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/_User/${patientID}`, {
      method: 'GET',
      headers: headersList,
    })
    result = await result.json()
    let patientDob = result.dateOfBirth
    calculatePatientAge(patientDob)
  }
  const calculatePatientAge = (patientDob) => {
    let patientBirthAge = patientDob.slice(0, 4)
    const currentYear = new Date().getFullYear()
    let patientAge = currentYear - patientBirthAge
    patientAge >= 60 ? setDiscount(true) : setDiscount(false)
  }
  useEffect(() => {
    getPatientDetails()
  }, [chatuser])

  const handleDiscound = (e, item) => {
    const { checked } = e.target
    if (checked) {
      let discountedMedicineItemList = medicineItemList.map((element, index) => {
        if (element.inventoryID === item.inventoryID) {
          let itemTotalAmount = element.amount * element.quantity
          let ItemDiscountedAmount = (itemTotalAmount * 20) / 100
          return { ...element, discount: ItemDiscountedAmount }
        }
        return element
      })
      setMedicineItemList(discountedMedicineItemList)
    } else {
      let RemoveDiscountedMedicineItemList = medicineItemList.map((element, index) => {
        if (element.inventoryID === item.inventoryID) {
          return { ...element, discount: 0 }
        }
        return element
      })
      setMedicineItemList(RemoveDiscountedMedicineItemList)
    }
  }

  return (
    <>
      <div>
        <div>
          <h4 className="mt-3 ml-2">
            <b> {isToggle ? "Book Order " : "Book Appointment"}</b>
          </h4>
        </div>
        <div>
          <div className="m-2">
            <input
              type="radio"
              name="select_page"
              onClick={() => setIsToggle(false)}
              className="cursor-pointer"
              checked={isToggle == false ? true : false}
            />
            <label className="m-3 cursor-pointer" >Appointment</label>
            <input
              type="radio"
              name="select_page"
              onClick={() => setIsToggle(true)}
              className="cursor-pointer"
            />
            <label className="m-3 cursor-pointer">Walk In</label>
          </div>
          <div className="m-2 text-base modal-head-patient-detail">
            <h6 className="mb-2 capitalize">Patient Name: {PatientName}</h6>
            <h6>Patient ID: {customerid}</h6>
          </div>

          {isToggle ? (
            <>
              <div className="order-processing-header ml-[0.5rem] datepicker relative text-sm form-floating xl:w-96 flex justify-between font-bold">
                <span className='mr-6'>Count {medicineItemList.length}</span>
                <span className="mb-2 text-gray-700 text-sm font-bold mr-3">
                  Amount ({orderTotalAmount})
                </span>
              </div>

              <div className="ml-[0.5rem] mt-2">
                <div className="flex justify-around flex-wrap">
                  <div className="w-full mt-[1.5rem]">
                    <label className="block mr-[1rem] mt-[-1.5rem] tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                      Category
                    </label>
                    <Select
                      className="mb-3 react-select"
                      options={categories}
                      onChange={(value) => setMedicineItem({ ...medicineItem, category: value.objectId })}
                    />
                    <div className="search-wrapper" onChange={(e) => handleRadioChange(e)}>
                      <input type="radio" id="generic_name" name="cmn_search" value="generic_name"
                        checked={searchBy === "generic_name" ? true : false}
                      />
                      <label htmlFor="generic_name" className='mr-2'>Generic Name</label>
                      <input type="radio" id="brand_name" name="cmn_search" value="brand_name" />
                      <label htmlFor="brand_name">Brand Name</label>
                    </div>

                    {searchBy == "generic_name" ?
                      <>
                        <label className="block mr-[1rem] tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                          Generic Name
                        </label>
                        <Select
                          className="mb-3 react-select-genericname"
                          options={filterUniqueArrayOfGenericName}
                          onChange={(value) => setMedicineItem({ ...medicineItem, generic_name: value.generaic_name })}
                        />
                      </>
                      :
                      <>
                        <label className="block mr-[1rem] tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                          Brand Name
                        </label>
                        <Select
                          className="mb-3 react-select-brandname"
                          options={filterUniqueArrayOfBrands}
                          onChange={(value) => setMedicineItem({ ...medicineItem, brand_name: value.brand })}
                        />
                      </>
                    }

                    {quantityError ? <p className="quantity-error-para">Quantity should not be greater then remaining quantity</p> : ''}
                    <div className="overflow-x-auto order-processing-table">
                      <table className="table table-compact w-full">
                        <thead>
                          <tr>
                            <th>Select</th>
                            <th>Generic Name</th>
                            <th>Brand Name</th>
                            <th>Size</th>
                            <th>Remaining Qty.</th>
                            <th>Quantity</th>
                            <th>Selling Price</th>
                            <th>Total</th>
                            <th>unit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mapState?.map((item, index) => {
                            const { objectId, category, generaic_name, brand, size, remaining_qty, selected_quantity, selling_price, unit } = item
                            return (
                              <>
                                <tr key={objectId}>
                                  <th>
                                    <input
                                      onChange={(event) => handleAddItems(event, item)}
                                      type="checkbox"
                                      name={objectId}
                                      id={item.objectId}
                                      checked={item.isChecked}
                                    />
                                  </th>
                                  <td>{generaic_name}</td>
                                  <td>{brand}</td>
                                  <td>{size}</td>
                                  <td className='text-center'>{remaining_qty}</td>
                                  <td>
                                    <input name="quantity"
                                      onChange={(e) => handleQuantity(e, item)}
                                      // value={selected_quantity}
                                      // disabled={item.isChecked}
                                      type="text" placeholder="Enter Qty." className="op-quantity" />
                                  </td>
                                  <td className='text-center'>{selling_price}</td>
                                  <td className='text-center'>{selling_price * selected_quantity}</td>
                                  <td>{unit}</td>
                                </tr>
                              </>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="place-order-btn-wrapper">
                <button onClick={() => handleResetOrder()} type="button" className="modal-reset-order">Reset Order</button>
                <label htmlFor="my-modal-6" className="modal-placeorder-btn">Place Order</label>
              </div>
              <input type="checkbox" id="my-modal-6" className="modal-toggle" />
              <div className="modal" style={{ backgroundColor: 'white' }}>
                <div className="modal-box w-11/12 max-w-5xl confirm-order-process-model">
                  <h3 className="font-bold text-lg p-2 mb-2">Order Summary</h3>
                  {orderSummaryQuantityError ? <p className="cnfrm-quantity-error">Quantity should not be greater then remaining quantity</p> : ''}
                  {/* Order Summary Table */}
                  <div className="overflow-x-auto mb-3">
                    <table className="table table-compact w-full">
                      <thead>
                        <tr>
                          <th>S No.</th>
                          <th>Generic Name</th>
                          <th>Brand Name</th>
                          <th>Size</th>
                          <th>Remaining Qty.</th>
                          <th>Quantity</th>
                          <th>Amount</th>
                          <th>Remove</th>
                          {discount ? <th>Dis.20%</th> : ''}
                        </tr>
                      </thead>
                      <tbody>
                        {
                          medicineItemList.map((item, index) => {
                            return (
                              <tr>
                                <th>{index + 1}</th>
                                <td>{item.generic_name}</td>
                                <td>{item.brand_name}</td>
                                <td>{item.size}</td>
                                <td>{item.remaining_qty}</td>
                                <td>
                                  <input type="text" className="itemlist-qty"
                                    onChange={(e) => handeEditAddedQuantity(e, item)}
                                    value={item.quantity}
                                  />
                                </td>
                                <td>{item.amount * item.quantity - (item.discount || 0)}</td>
                                <td onClick={() => handleRemoveAddedItem(item)} className="op-del-col">
                                  <img src={trash_svg} alt="" />
                                </td>
                                {discount ?
                                  <td className="text-center">
                                    <input onChange={(e) => handleDiscound(e, item)} type="checkbox" name="" id="" />
                                  </td> : ''}
                              </tr>
                            )
                          })
                        }
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Grand Total</th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th>{orderTotalAmount}</th>
                          <th></th>
                          {discount ? <th></th> : ''}
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="model-go-back-wrapper">
                    <label htmlFor="my-modal-6" className="btn go-back-btn">Go Back</label>
                    <button onClick={() => handleOrderSubmit()} className="cnfrm-placer-order-btn">Confirm Place Order</button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <BookAppointment patientID={patientID}></BookAppointment>
          )}
        </div>
      </div>
    </>
  );
};

export default AddOrder;




