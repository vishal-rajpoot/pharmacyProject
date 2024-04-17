import React,{useState} from 'react'
import { displayitem } from '../PagePerItems'

const Pagination = ({pageNumber,orderCount,pageRef}) => {
    const [currentPage, setCurrentPage] = useState(pageNumber || 1)
   function pageHandler(pageNumber) {
    setCurrentPage(pageNumber)
    pageRef(pageNumber)
   }
   return (
      <div className="flex justify-end mr-[4rem] mt-3 ">
          <button
              className="btn btn-outline text-[#082161] capitalize btn-sm mr-[0.5rem]"
              disabled={currentPage === 1}
              onClick={() => pageHandler(currentPage-1)}
          >
              Previous
          </button>
          {
              [...Array(Math.ceil(orderCount / displayitem)).keys()].map(item => {
                  const classnames = item === currentPage - 1 ? "btn btn-outline bg-[#082161] text-white btn-sm mr-[0.5rem]" : "btn btn-outline btn-sm mr-[0.5rem]";
                  return <button key={item + 1} className={classnames} onClick={() => pageHandler(item+1)}> {item + 1}</button>
              })
          }
          <button
              className="btn btn-outline text-[#082161] capitalize btn-sm mr-[0.5rem]"
              disabled={!(orderCount > currentPage * displayitem)}
              onClick={() => pageHandler(currentPage+1)}
          >
              Next
          </button>
      </div>
  )
}

export default Pagination