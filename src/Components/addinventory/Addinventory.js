import { useMutation, useQuery } from "graphql-hooks";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../App.css'


const GET_All_Category = `
query GetCategories {
  categories {
    edges {
      node {
        category_name
        objectId
        description
        createdAt
        id
        updatedAt
      }
    } 
  }
}
`;


let headersList =
{
  "Accept": "application/json",
  "Content-Type": "application/json",
  "X-Parse-Application-Id": process.env.REACT_APP_XPARSE_APPLICATION_ID,
  "X-Parse-REST-API-Key": process.env.REACT_APP_XPARSE_REST_API_KEY
};

function Addinventory() {
  const [initialData, setInitialData] = useState({
    genericName: "",
    brandName: "",
    batchName: "",
    category: "",
    manufacturer: "",
    unit: "",
    size: "",
    purchaseDate: "",
    expireDate: "",
    totalQuantity: 0,
    basePrice: 0,
    sellingPrice: 0,
  });

  const [formValues, setFormValues] = useState(initialData);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const { data, loading, error } = useQuery(GET_All_Category);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
  };


  const handleSubmitInventory = async () => {
    let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/Inventory`, {
      method: 'POST',
      headers: headersList,
      body: JSON.stringify({
        generaic_name: formValues.genericName,
        brand: formValues.brandName,
        batch_name: formValues.batchName,
        manufacturer: formValues.manufacturer,
        category: {
          __type: 'Pointer',
          className: 'Category',
          objectId: formValues.category
        },
        unit: formValues.unit,
        size: formValues.size,
        purchase_date: formValues.purchaseDate,
        expiry_dt: formValues.expireDate,
        remaining_qty: parseFloat(formValues.totalQuantity),
        base_price: parseFloat(formValues.basePrice),
        selling_price: parseFloat(formValues.sellingPrice),
      })
    })
    result = await result.json()
    if (result) {
      navigate("/Inventory", { state: { from: "addInventory" } });
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleSubmitInventory();
    }
  }, [formErrors]);

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
    if (!values.category) {
      errors.category = "Category Name is Requried";
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
      errors.totalQuantity = "Total Quantity should be greater then 0";
    }
    if (!values.basePrice) {
      errors.basePrice = "Base Price is Requried";
    } else if (values.basePrice < 1) {
      errors.basePrice = "Base Price should be greater then 0";
    }
    if (!values.sellingPrice) {
      errors.sellingPrice = "Selling Price is Requried";
    } else if (parseInt(values.sellingPrice) < parseInt(values.basePrice)) {
      errors.sellingPrice =
        "Selling Price should be greter then or equal to Base Price ";
    }
    return errors;
  };

  const handleCancleClick = () => {
    navigate("/Inventory");
  };

  return (
    <>
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
          <p className="ml-[12px] text-[#666666] font-medium">Add Inventory</p>
        </div>
      </div>

      <p className="text-[#082161] font-medium mr-[650px] flex justify-center ml-[21rem] my-[2rem]">
        Add Inventory
      </p>

      <div className="flex justify-center ml-[6rem]">
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
                className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                type="text"
                name="genericName"
                value={formValues.genericName}
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
                value={formValues.brandName}
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
                  name="category"
                  value={formValues.category}
                  onChange={(e) => handleChange(e)}
                  className="border-input block appearance-none w-full bg-[#ffffff] border border-gray-200 text-gray-700 py-3 px-4 pr-8 mb-1 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>Select</option>
                  {data?.categories?.edges?.map((item) => {
                    const { id, objectId, category_name } = item.node;
                    return (
                      <option key={id} value={objectId}>
                        {category_name}
                      </option>
                    );
                  })}
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
              <p className="text-red-400 text-xs">{formErrors.category}</p>
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
                value={formValues.manufacturer}
                onChange={(e) => handleChange(e)}
              />
              <p className="text-red-400 text-xs">{formErrors.batchName}</p>
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
                  name="unit"
                  value={formValues.unit}
                  onChange={(e) => handleChange(e)}
                  className="border-input block appearance-none w-full bg-[#ffffff] border border-gray-200 text-gray-700 py-3 px-4 pr-8 mb-1 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                value={formValues.size}
                onChange={(e) => handleChange(e)}
              />
              <p className="text-red-400 text-xs">{formErrors.batchName}</p>
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
                value={formValues.purchaseDate}
                onChange={(e) => handleChange(e)}
              />
              <p className="text-red-400 text-xs">{formErrors.purchaseDate}</p>
            </div>

            <div className="w-full md:w-1/2 px-3 mt-[1rem] ">
              <label
                className="mr-[9.8rem] block tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Expire Date
              </label>
              <input
                className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                type="date"
                name="expireDate"
                value={formValues.expireDate}
                onChange={(e) => handleChange(e)}
              />
              <p className="text-red-400 text-xs">{formErrors.expireDate}</p>
            </div>
            <div className="w-full md:w-1/2 px-3 mt-[2.5rem]">
              <label
                className="block mr-[1rem] mt-[-1.4rem] tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Total Quantity
              </label>
              <input
                className="border-input appearance-none block w-full bg-[#ffffff] text-gray-700 border border-gray-200 rounded-md py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                min={0}
                name="totalQuantity"
                value={formValues.totalQuantity}
                onChange={(e) => handleChange(e)}
              />
              <p className="text-red-400 text-xs">{formErrors.totalQuantity}</p>
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
                value={formValues.basePrice}
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
                value={formValues.sellingPrice}
                onChange={(e) => handleChange(e)}
              />
              <p className="text-red-400 text-xs">{formErrors.sellingPrice}</p>
            </div>
          </div>
          <div className="flex mr-[20rem] mt-[1.5rem]">
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
    </>
  );
}
export default Addinventory;

