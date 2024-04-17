import trash_svg from './trash.svg'
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Pagination from "../Pagination"
import { displayitem } from "../PagePerItems";
import { Globaldata } from "../../App";
import * as XLSX from 'xlsx'
import '../../App.css'


let headersList =
{
  "Accept": "application/json",
  "Content-Type": "application/json",
  "X-Parse-Application-Id": process.env.REACT_APP_XPARSE_APPLICATION_ID,
  "X-Parse-REST-API-Key": process.env.REACT_APP_XPARSE_REST_API_KEY
};

function Inventory(props) {
  const navigate = useNavigate()
  const { isUserLogin } = useContext(Globaldata)
  const { pageNumber } = useParams();
  const [inventory, setInventory] = useState()
  const [inventoryCount, setInventoryCount] = useState(0)
  const [userId, setuserId] = useState()
  const [deleteID, setDeleteID] = useState()
  const [availableCategories, setAvailableCategories] = useState()
  const [addCategoryArray, setAddCategoryArray] = useState()
  const [isCategoryAdded, setIsCategoryAdded] = useState(false)
  const [loader, setLoader] = useState()
  const [searchBy, setSearchBy] = useState('generic_name')
  const [filteredCategories, setFilteredCategories] = useState()

  //  state for sorting 
  const [order, setOrder] = useState('ASC');

  // on change states for upload inventory
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  // on submit for upload inventory
  const [excelData, setExcelData] = useState(null);
  // state for successfull csv upload message
  const [iscsvUpload, setisCsvUpload] = useState(false)
  const [expireDateColType, setExpireDateColType] = useState()
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (!isUserLogin()) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    let user = localStorage.getItem('user')
    user = JSON.parse(user)
    setuserId(user.uid)
  }, [])

  const sorting = (col) => {
    if(order === 'ASC'){
      const sorted = [...inventory].sort( (a,b) =>
      a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setInventory(sorted)
      setOrder('DESC')
    }
    if(order === 'DESC'){
      const sorted = [...inventory].sort( (a,b) =>
      a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setInventory(sorted)
      setOrder('ASC')
    }
  }

  const getAllInventory = async () => {

    let fetchInventoryUrl;
    if(searchBy == 'generic_name'){
      fetchInventoryUrl = `${process.env.REACT_APP_REST_URL}/classes/Inventory?include=category&where={"generaic_name": {"$regex": "${query}","$options": "i"}}&limit=${displayitem}&order="generaic_name"&skip=${(pageNumber - 1) * displayitem}&count=1`
    }
    if(searchBy == 'brand_name'){
      fetchInventoryUrl = `${process.env.REACT_APP_REST_URL}/classes/Inventory?include=category&where={"brand": {"$regex": "${query}","$options": "i"}}&limit=${displayitem}&skip=${(pageNumber - 1) * displayitem}&count=1`
    }
    let result = await fetch(fetchInventoryUrl, {
      method: 'GET',
      headers: headersList,
    })
    
    result = await result.json()
    setInventory(result?.results)
    setInventoryCount(result?.count)
  }
  useEffect(() => {
    getAllInventory()
  }, [pageNumber, query, searchBy])


  const deleteHandler = (inventoryId) => {
    setDeleteID(inventoryId);
  }
  const confirmDeleteInventory = async () => {

    let resp = await fetch(`${process.env.REACT_APP_REST_URL}/classes/Inventory/${deleteID}`, {
    method: 'DELETE',
    headers: headersList
    })
    resp = await resp.json()
    if (resp) {
      getAllInventory()
    }
  };

  const handleCheckBoxes = (e) => {
    const { name, checked } = e.target
    // console.log(name ,checked)
    if (name === "selectAll") {
      let selectedcheckbox = inventory?.map((item, index) => {
        return { ...item, isChecked: checked }
      })
      setInventory(selectedcheckbox)
    } else {
      let selectedcheckbox = inventory?.map((item, index) => {
        if (item.objectId === name) {
          return { ...item, isChecked: checked }
        } else {
          return item
        }
      })
      setInventory(selectedcheckbox)
    }
  }

  const pageRef = (page) => {
    navigate(`/Inventory/Page=${page}`)
  }

  // handle File Change
  const fileType = ['application/vnd.ms-excel'];
  const handleFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        }
      }
      else {
        setExcelFileError('Please Select Csv File Only');
        setExcelFile(null);
      }
    }
    else {
      console.log('plz select your file');
    }
  }

  // handle submit function for upload inventory
    const handleUploadInventory = async (e) => {
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      let excelData = data

      let newArray = []
      let categoryObjectId

      // let categoryName
      // let checkArray = []

      // code for all available categories

      let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/Category`, {
        method: 'GET',
        headers: headersList
      })
      result = await result.json()
      let availableCategories = result.results
      // console.log(availableCategories)

      for (let i = 0; i < excelData.length; i++) {
        let filterSignle = availableCategories.filter((item) => {
          return item.category_name == excelData?.[i].Category
        })
        categoryObjectId = filterSignle[0]?.objectId

        // categoryName = filterSignle[0]?.category_name
        // checkArray.push({categoryName, categoryObjectId})

        let newObj = {
          base_price: excelData?.[i]['Base Price'],
          brand: excelData?.[i]['Brand Name'],
          category: {
            __type: 'Pointer',
            className: 'Category',
            objectId: categoryObjectId
          },
          generaic_name: excelData?.[i]['Generic Name'],
          selling_price: excelData?.[i]['Selling Price'],
          unit: excelData?.[i]?.Unit,
          remaining_qty: excelData?.[i]['Total Quantity/Remaining Unit'],
          manufacturer: excelData?.[i]['Manufacturer Name'],
          size: excelData?.[i]['Concentration/Size'],
          expiry_dt: excelData?.[i]['Expire Date']
        }
        newArray.push(newObj)
      }
      // console.log(checkArray)
      // console.log(checkArray.length)

      setLoader(true)
      for (let j = 0; j < newArray.length; j++) {
        let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/Inventory`, {
          method: 'post',
          headers: headersList,
          body: JSON.stringify(newArray[j])
        })
          result = await result.json()
          console.log(result)
        }
          setLoader(false)
          setisCsvUpload(true)
          document.getElementById("file-input").value = ""
       }
      else {
        setExcelData(null);
      }
  }

  const handleAllCategories = (e) => {
    let inputCategories = e.target.value
    // var res = inputCategories.replace(/\s+/g, "");
    let inputCategoriesArray = inputCategories.split(",")
    setAddCategoryArray(inputCategoriesArray)
  }

  const handleAddCategories = async () => {
    console.log(addCategoryArray)
    for (let i = 0; i < addCategoryArray.length; i++) {
      let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/Category`, {
        method: 'POST',
        headers: headersList,
        body: JSON.stringify({ category_name: addCategoryArray[i] })
      })
      result = await result.json()
      if (result) {
        setIsCategoryAdded(true)
        getAllCategories()
      }
    }
  }

  const getAllCategories = async () => {

      let response = await fetch(`${process.env.REACT_APP_REST_URL}/classes/Inventory/?limit=1400/?include=category`,{
      method:'GET',
      headers:headersList,
      })
      response = await response.json()
      let allInventoryData = response.results

      // api call for getting all categories
      let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/Category`, {
      method: 'GET',
      headers: headersList
      })
      result = await result.json()
      let allCategroies = result.results
      setAvailableCategories(result.results)

      // filter operational categories for delete category
      let categoriesOperationArray = []
      let found
      allCategroies.map((category)=>{
      found = allInventoryData?.find(element => element?.category?.objectId == category?.objectId)
      if(found){
        categoriesOperationArray?.push({...category, isDelete:false})
      }else{
        categoriesOperationArray?.push({...category, isDelete:true})
      }
    })
    setFilteredCategories(categoriesOperationArray)    
  }
    

  const handleDeleteAll = async () => {
    let filterSelectedCheckBoxes = inventory.filter((item) => {
      return item.isChecked === true
    })
    for (let i = 0; i < filterSelectedCheckBoxes.length; i++) {
      let resp = await fetch(`${process.env.REACT_APP_REST_URL}/classes/Inventory/${filterSelectedCheckBoxes[i].objectId}`, {
        method: 'DELETE',
        headers: headersList
      })
      resp = await resp.json()
      console.log(resp)
    }
    getAllInventory()
  }

  const handleRadioButton=(e)=>{
    setSearchBy(e.target.value)
  }

  const handleDeleteCategory = async (categoryId)=>{
    let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/Category/${categoryId}`,{
      method:'DELETE',
      headers:headersList,
    })
    result = await result.json()
    console.log(result)
    if(result){
      getAllCategories()
    }
  }

  return (
    <>
      <div className="flex justify-between ml-[18em]">
        <p className="text-xl  text-[#082161] mt-20 font-[700]">Inventory</p>
        <div>
          {userId == 'YG3aYgItIe' ?
            <>
              <label onClick={() => getAllCategories()} htmlFor="my-modal-addcategory" className="cursor-pointer modal-button  bg-[#082161] w-[11vw] mr-[1.7rem] mt-[4.3rem] text-[#ffffff] h-[6vh] rounded-md" style={{ padding: '9px' }}>+ Add Category</label>
              <label htmlFor="my-modal-3" className="modal-button  bg-[#082161] w-[11vw] mr-[1.7rem] mt-[4.3rem] text-[#ffffff] h-[6vh] rounded-md cursor-pointer" style={{ padding: '9px' }}>+ Upload Inventory</label>
              <input type="checkbox" id="my-modal-3" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box relative">
                  <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                  {loader ? <h3 className='loader-line'>Please wait inventory uploading..</h3> : ''}
                  <h3 className="text-lg font-bold pb-2">Please Select a CSV or Excel File..</h3>
                  <p>Note : </p>
                  <p>Please upload excel file only with the extension (.xls)</p>
                  <p className='pb-2'>The coloumn type of Expire Date should be text</p><hr />
                  <input type='file' onChange={(e) => handleFileChange(e)} required id='file-input'></input>
                  <button type='submit' onClick={(e) => handleUploadInventory(e)} className='btn-success p-2 mb-2'>Upload</button><hr />
                  {iscsvUpload ? <h4 className="success-msg">Hurray Inventory Updated Successfully</h4> : ''}
                  {excelFileError ? <p className="text-red-600 pt-3 pb-3">invalid file (please select excel file only)</p> : ''}
                </div>
              </div>

              {/* Modal box for add multiple category  */}                                                                                               

              <input type="checkbox" id="my-modal-addcategory" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box relative">
                  <label htmlFor="my-modal-addcategory" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                  <h3 className="text-lg font-bold">Add Your New Category</h3><hr />
                  <input onChange={(e) => handleAllCategories(e)} type="text" placeholder='Enter Category Name' className='add-category-input' />
                  <p className="py-4">Note :</p>
                  <p>1 Please separate each category by coma</p>
                  <p>2 The first letter of each category should be capital</p><br />
                  <button onClick={() => handleAddCategories()} className='add-category-btn'>Add Category</button>
                  {isCategoryAdded ?
                    <p className='success-msg'>Your Category has been added successfully</p> : ''}
                  <hr />
                  <p className='pt-4 pb-3 pl-3 font-bold'>All available categories :</p>
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Category Name</th>
                          <th>Created At </th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCategories?.map((category, index) => {
                          return (
                            <tr>
                              <th>{index + 1}</th>
                              <td>{category.category_name}</td>
                              <td>{category.createdAt.slice(0, 10)}</td>
                              <td>
                                <button onClick={()=>handleDeleteCategory(category.objectId)}
                                className={ category.isDelete ? "rmv-category-trash-icon" :"disable-delete-category" }  
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </>
            : ''}
          <Link to="/AddInventory">
            <button
              type="button"
              className=" bg-[#082161] w-[10vw] mr-[5.7rem] mt-[4.3rem] text-[#ffffff] h-[6vh] rounded-md "
            >
              + Add Inventory
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-between mt-[1rem]">
        <div id='inv-topbar' className={props.sidebarstatus ? " bg-[#D9D9D9] w-[71rem] h-[3rem] ml-[18rem]" : " bg-[#D9D9D9] w-[70rem] h-[3rem] ml-[18rem]"}>
          <div>
            <p className="text text-xl ml-5 mr-5 text-[black] font-[500] pt-[.6rem]">
              All Inventory
            </p>
          </div>
          <div onChange={(e)=>handleRadioButton(e)} className="radio-btn-wrapper">
              <input type="radio" id="generic_name" name="search" value="generic_name" 
               checked={searchBy==="generic_name" ? true : false}
               />
              <label htmlFor="generic_name" className='mr-2'>Generic Name</label>
              <input type="radio" id="brand_name" name="search" value="brand_name" />
              <label htmlFor="brand_name">Brand Name</label>
          </div>
          <div>
            <input
            className='inv-search-box'
            type="text"
            placeholder="search here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          </div>
        </div>
        <span>
          {inventory?.filter((item) => item.isChecked === true).length >= 1 ?
            <div className='delete-all-wrapper'>
              <label className="delete-all-text" htmlFor="my-modal-delete-all">Delete All</label>
              <img src={trash_svg} className="delete-all-icon" />
              <input type="checkbox" id="my-modal-delete-all" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box">
                  <h3 className="text-black text-lg font-bold">Do you want to delete ?</h3>
                  <p className="py-4"></p>
                  <div className="modal-action">
                    <label
                      htmlFor="my-modal-delete-all"
                      className="btn bg-red-500 hover:bg-red-500"
                      onClick={((e) => handleDeleteAll(e))}
                    >
                      Delete
                    </label>
                    <label
                      htmlFor="my-modal-delete-all"
                      className="btn bg-white text-black text-base hover:text-white hover:bg-blue-500  "
                      onClick={(e) => setCloseDialog(!isCloseDialog)}
                    >
                      Cancel
                    </label>
                  </div>
                </div>
              </div>
            </div>
            : ''
          }
        </span>
      </div>
      <div className="flex ml-[18rem] mt-[1rem]">
        <table className={props.sidebarstatus ? "table-auto w-[71rem]" : "table-auto w-[70rem]"}>
          <thead>
            <tr className="text-center text-sm">
              <th>
                <input type="checkbox"
                  name="selectAll"
                  onChange={(e) => handleCheckBoxes(e)}
                  checked={
                    inventory?.filter((item) => item.isChecked !== true).length < 1
                  }
                />
              </th>
              <th>Manufacturer</th>
              <th>Category</th>
              <th onClick={() => sorting('generaic_name')} className = "generic-name-cursor-pointer">Generic Name</th>
              <th>Brand Name</th>
              <th>Size</th>
              <th>Remaining Unit</th>
              <th>Unit</th>
              {/* <th>Base Price</th> */}
              <th>Selling Price</th>
              <th>Purchase Date</th>
              <th>Expire Date</th>
              <th>Label</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {inventory?.map((item) => {
              const {
                objectId,
                category,
                brand,
                generaic_name,
                remaining_qty,
                updatedAt,
                selling_price,
                base_price,
                unit,
                manufacturer,
                expiry_dt,
                size,
                sales_perf,
              } = item;
              let roi = ((selling_price - base_price) / base_price) * 100

              return (
                <tr className="text-center" key={objectId}>
                  <td>
                    <input type="checkbox"
                      name={objectId}
                      onChange={(e) => handleCheckBoxes(e)}
                      checked={item.isChecked || false}
                    />
                  </td>
                  <td>{manufacturer || '-'}</td>
                  <td>{category?.category_name}</td>
                  <td>{generaic_name}</td>
                  <td>{brand}</td>
                  <td>{size}</td>
                  <td>{remaining_qty}</td>
                  <td>{unit}</td>
                  {/* <td>{base_price}</td> */}
                  <td>{selling_price}</td>
                  <td>{updatedAt.slice(0, 10)}</td>
                  <td>{expiry_dt}</td>
                  <td>
                    <div className="flex justify-around">
                      {roi >= 100 ? <div className="badge badge-info badge-outline pl-[1rem] pr-[1rem] gap-1">ROI</div> : <div className="badge badge-error badge-outline pl-[1rem] pr-[1rem] gap-1">ROI</div>}
                    </div>
                  </td>
                  <td className="relative">
                    <div className="flex justify-center mt-2">
                      <Link to={`/Editinventory/${objectId}`}>
                        <div className="tooltip" data-tip="Edit">
                          <svg
                            className=""
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 16.327C0.4726 14.7052 0.9435 13.0835 1.4161 11.4617C1.4535 11.3325 1.4926 11.2033 1.5266 11.0741C1.581 10.8786 1.683 10.7205 1.8394 10.5896C1.9856 10.4689 2.1148 10.3244 2.2491 10.1901C4.4642 7.99536 6.6793 5.80067 8.8927 3.60427C8.9437 3.55328 8.9879 3.49548 9.0236 3.45128C9.3245 3.75387 9.6067 4.03777 9.9212 4.35397C9.8872 4.37777 9.8209 4.41177 9.7699 4.46277C7.4749 6.75267 5.1816 9.04256 2.8917 11.3376C2.8101 11.4209 2.7421 11.5348 2.7098 11.647C2.4344 12.5565 2.1726 13.471 1.9006 14.3839C1.8666 14.4978 1.8836 14.5692 1.9703 14.6474C2.1114 14.7749 2.2355 14.9211 2.3783 15.0469C2.4276 15.0894 2.5211 15.1217 2.5806 15.1064C3.4952 14.8446 4.4081 14.5777 5.3193 14.3023C5.3975 14.2785 5.4706 14.2122 5.5318 14.1493C7.8591 11.8289 10.183 9.50496 12.5069 7.18277C12.5511 7.13857 12.5885 7.08927 12.614 7.06037C12.9438 7.39017 13.2634 7.70976 13.6136 8.05996C13.5983 8.07016 13.5371 8.09566 13.4946 8.13816C11.203 10.4077 8.908 12.6721 6.6283 14.9534C6.3104 15.273 5.9653 15.4702 5.5386 15.5909C4.0256 16.0193 2.5194 16.4715 1.0098 16.9152C0.9095 16.9441 0.8075 16.9713 0.7072 17.0002H0.5712C0.4981 16.9679 0.4233 16.939 0.3502 16.905C0.1462 16.8098 0.0765 16.616 0 16.4273V16.327ZM4.5713 13.5102C4.5271 13.228 4.4795 12.9696 4.4489 12.7112C4.4336 12.5888 4.3843 12.5395 4.2653 12.5174C3.9746 12.4613 3.6873 12.3882 3.4187 12.3287C5.8293 9.91296 8.2399 7.49557 10.6352 5.09347C11.0177 5.47597 11.4172 5.87377 11.8031 6.25797C9.4163 8.65156 7.0074 11.0673 4.5713 13.5102ZM11.5141 1.08998C11.7317 0.877482 11.9493 0.651382 12.1822 0.440583C12.8503 -0.161216 13.7207 -0.147616 14.3718 0.488183C15.0909 1.18858 15.7998 1.89748 16.5002 2.61658C17.1632 3.29488 17.153 4.20267 16.4917 4.87927C16.2928 5.08327 16.0871 5.28217 15.8967 5.46917C14.4415 4.01567 12.988 2.56388 11.5141 1.08998V1.08998ZM9.741 2.69478C10.0708 2.38538 10.4091 2.06748 10.7304 1.76488C12.2536 3.28808 13.7683 4.80447 15.2966 6.33277C14.9787 6.63027 14.637 6.95157 14.3072 7.26097L9.741 2.69478Z"
                              fill="#80ECB8"
                            />
                          </svg>
                        </div>
                      </Link>
                      <div
                        className="tooltip ml-5"
                        data-tip="Delete"
                        onClick={() => deleteHandler(objectId)}
                      >
                        <label htmlFor="my-modal" style={{ cursor: "pointer" }}>
                          <svg
                            width="13"
                            height="15"
                            viewBox="0 0 13 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.25948 14.2201C2.27648 14.6213 2.60628 14.9375 3.00748 14.9375H9.99618C10.3974 14.9375 10.7289 14.6213 10.7442 14.2201L11.244 3.6835H1.75968L2.25948 14.2201ZM8.08198 6.3015C8.08198 6.1332 8.21798 5.9972 8.38628 5.9972H8.87248C9.04078 5.9972 9.17678 6.1349 9.17678 6.3015V12.3212C9.17678 12.4895 9.03908 12.6255 8.87248 12.6255H8.38628C8.21798 12.6255 8.08198 12.4895 8.08198 12.3212V6.3015ZM5.95528 6.3015C5.95528 6.1332 6.09128 5.9972 6.25958 5.9972H6.74578C6.91408 5.9972 7.05009 6.1349 7.05009 6.3015V12.3212C7.05009 12.4895 6.91408 12.6255 6.74578 12.6255H6.25958C6.09128 12.6255 5.95528 12.4895 5.95528 12.3212V6.3015ZM3.82688 6.3015C3.82688 6.1332 3.96288 5.9972 4.12948 5.9972H4.61568C4.78398 5.9972 4.91998 6.1349 4.91998 6.3015V12.3212C4.91998 12.4895 4.78228 12.6255 4.61568 12.6255H4.12948C3.96118 12.6255 3.82688 12.4895 3.82688 12.3212V6.3015ZM11.5755 0.8292H8.35228V0.2189C8.35228 0.1322 8.28258 0.0625 8.19588 0.0625H4.80948C4.72278 0.0625 4.65308 0.1322 4.65308 0.2189V0.8292H1.42818C1.16978 0.8292 0.958984 1.0383 0.958984 1.2984V2.774H12.0447V1.2984C12.0447 1.04 11.8356 0.8292 11.5755 0.8292Z"
                              fill="#FF6760"
                            />
                          </svg>
                        </label>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        {
        ...{
          pageNumber,
          orderCount: inventoryCount,
          pageRef
        }
        } />

      {/* modal content */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Do you want to delete ?</h3>
          <p className="py-4"></p>
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn bg-red-500 hover:bg-red-500"
              onClick={(e) => confirmDeleteInventory(deleteID)}
            >
              Delete
            </label>
            <label
              htmlFor="my-modal"
              className="btn bg-white text-black text-base hover:text-white hover:bg-blue-500  "
              onClick={(e) => setCloseDialog(!isCloseDialog)}
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inventory;