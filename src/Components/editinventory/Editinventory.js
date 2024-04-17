import { useMutation, useQuery } from "graphql-hooks";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';

// import Outerheader from "../outerheader/Outerheader";
// import Sidebar from "../sidebar/Sidebar";
import '../../App.css'
// import { get } from "firebase/database";


let headersList =
  {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-Parse-Application-Id": process.env.REACT_APP_XPARSE_APPLICATION_ID,
    "X-Parse-REST-API-Key": process.env.REACT_APP_XPARSE_REST_API_KEY,
    // "X-Parse-Session-Token": reactLocalStorage.get('sessionToken')
  };

function Editinventory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const objectId = id;

  const [autoFillinventoryData, setAutoFillinventoryData] = useState({
    genericName: "",
    brandName: "",
    batchName: "",
    category: "",
    manufacturer: "",
    unit: "",
    size: "",
    purchaseDate: "",
    expireDate: "",
    totalQuantity: "",
    basePrice: "",
    sellingPrice: ""
  })
  
  useEffect( () => {
    const api = fetch(`${process.env.REACT_APP_REST_URL}/classes/Inventory/${objectId}?include=category`, {
      method: 'GET',
      headers: headersList
    })
    api.then( (data) => {
      return data.json();
    }).then( (res) => {
      console.log(res.category.objectId);
      setAutoFillinventoryData({
        id: res.objectId,
        genericName: res.generaic_name,
        brandName: res.brand,
        batchName: res.batch_name,
        category: res.category.objectId,
        manufacturer: res.manufacturer,
        unit: res.unit,
        size: res.size,
        purchaseDate: res.purchase_date,
        expireDate: res.expiry_dt,
        totalQuantity: res.remaining_qty,
        basePrice: parseFloat(res.base_price),
        sellingPrice: parseFloat(res.selling_price),
      })
    }).catch( (error) => {
      console.log(error);
    })
    
  },[])

  const [category, setCategory] = useState([]);
  useEffect( () => {
    const categoryData = fetch(`${process.env.REACT_APP_REST_URL}/classes/Category`, {
      method: 'GET',
      headers: headersList
    })
    categoryData.then( (data) => {
      return data.json();
    }).then( (response) => {
      setCategory(response.results)
    })
  },[])

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      submitUpdateInventory();
    }
  }, [formErrors]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    // setFormValues({ ...formValues, [name]: value });
    setAutoFillinventoryData({...autoFillinventoryData, [name]: value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(autoFillinventoryData);
    setFormErrors(errors);
    setIsSubmit(true);
  };

  const submitUpdateInventory = async () => {
    let response = await fetch(`${process.env.REACT_APP_REST_URL}/classes/Inventory/${objectId}?include=category`, {
      method: 'PUT',
      headers: headersList,
      body: JSON.stringify({
        generaic_name: autoFillinventoryData.genericName,
        brand: autoFillinventoryData.brandName,
        batch_name: autoFillinventoryData.batchName,
        manufacturer: autoFillinventoryData.manufacturer,
        category: {
          __type: 'Pointer',
          className: 'Category',
          objectId: autoFillinventoryData.category
        },
        unit: autoFillinventoryData.unit,
        size: autoFillinventoryData.size,
        purchase_date: autoFillinventoryData.purchaseDate,
        expiry_dt: autoFillinventoryData.expireDate,
        remaining_qty: parseFloat(autoFillinventoryData.totalQuantity),
        base_price: parseFloat(autoFillinventoryData.basePrice),
        selling_price: parseFloat(autoFillinventoryData.sellingPrice),
      })
    })
        response = await response.json()
        if (response) {
          navigate("/Inventory");
        }   
  }

  const validate = (values) => {
    const errors = {};
    if (!values.genericName) {
      errors.genericName = "Generaic Name is Requried";
    } else if (values.genericName.length < 3) {
      errors.genericName = "Generaic Name should be greter then 3 character";
    }
    if (!values.brandName) {
      errors.brandName = "Brand Name is Requried";
    } else if (values.brandName.length < 3) {
      errors.brandName = "Brand Name should be greter then 3 character";
    }
    // if (!values.batchName) {
    //   errors.batchName = "Batch Name is Requried";
    // } else if (values.batchName.length < 3) {
    //   errors.batchName = "Batch Name should be greter then 3 character";
    // }
    if (!values.category) {
      errors.category = "Category is a mandatory field";
    }
    if (!values.unit) {
      errors.unit = "Unit is Requried";
    }
    if (!values.purchaseDate) {
      errors.purchaseDate = "Purchase Date is Requried";
    }
    if (!values.expireDate) {
      errors.expireDate = "Expiry Date is Requried";
    } else if (values.expireDate <= values.purchaseDate) {
      errors.expireDate =
        " Expiry Date can not be eqal or less then purchase date";
    }
    if (!values.totalQuantity) {
      errors.totalQuantity = "Total Quantity is Requried";
    } else if (values.totalQuantity < 1) {
      errors.totalQuantity = "Total Quantity should be greater than 0";
    }
    if (!values.basePrice) {
      errors.basePrice = "Base Price is Requried";
    } else if (values.basePrice < 1) {
      errors.basePrice = "Base Price should be greater than 0";
    }
    if (!values.sellingPrice) {
      errors.sellingPrice = "Selling Price is Requried";
    } else if (parseInt(values.sellingPrice) < parseInt(values.basePrice)) {
      errors.sellingPrice =
        "Selling Price should be greter than or equal to Base Price ";
    }
    return errors;
  };

  const handleCancleClick = () => {
    navigate("/Inventory");
  };



  return (
    <>
      {/* <Outerheader /> */}
      {/* <Sidebar /> */}
      <div className="ml-[260px] pt-[7rem]">
        <div className="flex">
          <p className="text-[#082161] font-medium">Inventory</p>
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
          <p className="ml-[12px] text-[#666666] font-medium">Edit Inventory</p>
        </div>
      </div>

      <div>
        <p className="text-[#082161] font-medium mr-[650px] flex justify-center ml-[25rem] mt-[2rem] ">
          Edit Inventory
        </p>

        <div className="flex justify-center ml-[10rem] mt-[1rem]">
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block mr-[1rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Generic Name
                </label>
                <input
                  className="border-input appearance-none block  w-full bg-[#ffffff] text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  name="genericName"
                  value={autoFillinventoryData?.genericName}
                  onChange={(e) => handleChange(e)}
                />
                <p className="text-red-400 text-xs">{formErrors.genericName}</p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block mr-[10rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Brand Name
                </label>
                <input
                  className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  name="brandName"
                  value={autoFillinventoryData?.brandName}
                  onChange={(e) => handleChange(e)}
                />
                
                <p className="text-red-400 text-xs">{formErrors.brandName}</p>
              </div>

              <div className="w-full md:w-1/2 px-3 ">
                <label
                  className="mr-[11rem] block tracking-wide text-gray-700 text-xs font-bold mt-2 mb-2"
                  htmlFor="grid-state"
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    className="border-input block appearance-none w-full bg-[#ffffff] border border-gray-200 text-gray-700 py-3 px-4 pr-8 mb-1 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="category"
                    onChange={(e) => handleChange(e)}
                    value={autoFillinventoryData?.category || "Select"}
                  >
                    {/* <option value={autoFillinventoryData?.category?.objectId} defaultValue>Select</option> */}
                    {category?.map((item) => {
                      return (
                        <option key={item.objectId} value={item.objectId}>
                          {item.category_name}
                        </option>
                      );
                    })}
                  </select>
                  <div className="border-input pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                <p className="text-red-400 text-xs" >{formErrors.category}</p>
              </div>
              <div className="w-full md:w-1/2 px-3">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mt-2 mb-2"
                htmlFor="grid-last-name"
              >
                Manufacturer Name
              </label>
                <input
                  className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  name="manufacturer"
                  value={autoFillinventoryData?.manufacturer}
                  onChange={(e) => handleChange(e)}
                />
                {/* <p className="text-red-400 text-xs">{formErrors.batchName}</p> */}
              </div>

              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-[1rem]">
                <label
                  className="block mr-[12.5rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Unit
                </label>
                <div className="relative">
                  <select
                    className="border-input block appearance-none w-full bg-[#ffffff] border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="unit"
                    value={autoFillinventoryData?.unit}
                    onChange={(e) => handleChange(e)}
                  >
                    <option>Select</option>
                    <option>Bottle</option>
                    <option>Piece</option>
                    <option>Strips</option>
                    <option>Box</option>
                    <option>Pack</option>
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
                <p className="text-red-400 text-xs">{formErrors.unit}</p>
              </div>

              <div className="w-full md:w-1/2 px-3 mt-2">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mt-2 mb-2"
                htmlFor="grid-last-name"
              >
                Concentration/Size
              </label>
              <input
                className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                name="size"
                value={autoFillinventoryData?.size}
                onChange={(e) => handleChange(e)}
              />
              {/* <p className="text-red-400 text-xs">{formErrors.batchName}</p> */}
            </div>

              <div className="w-full md:w-1/2 px-3 mt-[1rem]">
                <label
                  className="block mr-[9rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Purchase Date
                </label>
                <input
                  className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="date"
                  name="purchaseDate"
                  value={autoFillinventoryData?.purchaseDate}
                  onChange={(e) => handleChange(e)}
                />
                <p className="text-red-400 text-xs">
                  {formErrors.purchaseDate}
                </p>
              </div>

              <div className="w-full md:w-1/2 px-3 mt-[1rem] ">
                <label
                  className="mr-[9.8rem] block tracking-wide text-gray-700 text-xs font-bold mb-1"
                  htmlFor="grid-state"
                >
                  Expire Date
                </label>
                <input
                  className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                  type="date"
                  name="expireDate"
                  value={autoFillinventoryData?.expireDate}
                  onChange={(e) => handleChange(e)}
                />
                <p className="text-red-400 text-xs">{formErrors.expireDate}</p>
              </div>
              <div className="w-full md:w-1/2 px-3 mt-[2.5rem]">
                <label
                  className="block mr-[1rem] mt-[-1.6rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Total Quantity
                </label>
                <input
                  className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="number"
                  name="totalQuantity"
                  value={autoFillinventoryData?.totalQuantity}
                  min={1}
                  onChange={(e) => handleChange(e)}
                />
                <p className="text-red-400 text-xs">
                  {formErrors.totalQuantity}
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3 mt-[.3rem] ">
              <label
                className="mr-[10rem] block tracking-wide text-gray-700 text-xs font-bold mt-2 mb-2"
                htmlFor="grid-state"
              >
                Base Price
              </label>
              <input
                className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                type="number"
                min={0.00}
                step={0.01}
                name="basePrice"
                value={autoFillinventoryData?.basePrice}
                onChange={(e) => handleChange(e)}
              />
              <p className="text-red-400 text-xs">{formErrors.basePrice}</p>
            </div>
            <div className="w-full md:w-1/2 px-3 mt-[2rem]">
              <label
                className="block mr-[8rem] mt-[-1.05rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Selling Price
              </label>
              <input
                className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                min={0.00}
                step={0.01}
                name="sellingPrice"
                value={autoFillinventoryData?.sellingPrice}
                onChange={(e) => handleChange(e)}
              />
              <p className="text-red-400 text-xs">{formErrors.sellingPrice}</p>
            </div>
            </div>
            <div className="flex justify-end">
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
          </form>
        </div>
      </div>
    </>
  );
}

export default Editinventory;
