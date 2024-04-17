import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ClientContext } from "graphql-hooks";
import { useQuery, useManualQuery } from "graphql-hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { ADD_STAFF_MEMBER } from "../addStaff/Addstaff";
import Pagination from "../Pagination";
import { displayitem } from "../PagePerItems";
import { Globaldata } from "../../App";

const GET_STAFF_QUERY = `
query GET_STAFF_QUERY {
    users(where:{role:{notEqualTo:"patient"}}) {
      edges {
        node {
          objectId
          first_name
          last_name
          role
          username
          gender
          dateOfJoining
          dateOfBirth
          createdAt
          mobile
          address
          ACL {
            roles {
              roleName
            }
          }
        }
      }
    }
  }
`;

const DELETE_STAFF = `
mutation deleteSstaffMember($staffID: ID!)
{
  deleteUser(input:{id:$staffID}){
    user{
      objectId
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

function Staff() {
  const { pageNumber } = useParams()
  const navigate = useNavigate()
  const {isUserLogin} = useContext(Globaldata)
  const client = useContext(ClientContext);
  const [staff, setStaff] = useState()
  const [staffCount, setStaffCount] = useState(0)
  
  useEffect(() => {
    if (!isUserLogin()) {
      navigate('/')
    }
  }, [])

   const getAllStaff = async () => {
    let result = await fetch(`${process.env.REACT_APP_REST_URL}/classes/_User?where={"role":{"$in":["nurse","doctor"]}}&limit=${displayitem}&skip=${(pageNumber - 1) * displayitem}&count=1`, {
      method: 'GET',
      headers: headersList,
    })
    result = await result.json()
    setStaff(result?.results)
    setStaffCount(result?.count)
  }
  useEffect(() => {
    getAllStaff()
  }, [pageNumber])

 
  const [deleteID, setDeleteID] = useState("");
  const location = useLocation();
  const [isCloseDialog, setCloseDialog] = useState(true);
  const { error, data, loading, refetch } = useQuery(GET_STAFF_QUERY, {
    useCache: false,
    skipCache: true,
    refetchAfterMutations: [ADD_STAFF_MEMBER, DELETE_STAFF],
  });

  const [deleteStaffFn, { delLoading, delError }] = useManualQuery(
    DELETE_STAFF
  );
  if (loading) return "Loading...";
  if (error) return "Something bad happened";

  const addStaffHandler = () => {
    navigate("/AddStaff");
  };

  const deleteHandler = (staffId) => {
    setDeleteID(staffId);
    setCloseDialog(!isCloseDialog);
  };

  const confirmDeleteHandler = async (id) => {
    await deleteStaffFn({ variables: { staffID: id } });
    refetch({
      useCache: false,
      skipCache: true,
    });

    if (!delLoading && !delError) {
      setCloseDialog(!isCloseDialog);
    }
  };
  
 

   const pageRef = (page) => {
    navigate(`/Staff/Page=${page}`)
  }

  return (
    <>
      {/* <Outerheader /> */}
      {/* <Sidebar /> */}

      {/* -Overlay Effect */}
      <div
        hidden={isCloseDialog}
        className="fixed  z-10 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="my-modal"
      ></div>

      {/* modal content */}
      <div
        hidden={isCloseDialog}
        className="relative z-20 top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
      >
        <div className="mt-3 text-center">
          <div
            onClick={(e) => setCloseDialog(!isCloseDialog)}
            className="absolute right-0 top-0 cursor-pointer"
          >
            <i className="text-3xl ri-close-circle-line"></i>
          </div>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <i className="ri-questionnaire-line"></i>
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Delete ?!
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">Want to Delete user ?</p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              name="ok-btn"
              onClick={(e) => confirmDeleteHandler(deleteID)}
              className="px-4 py-2 bg-red-400 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Yes, Delete
            </button>
            <button
              type="button"
              id="cancel-btn"
              name="cancel-btn"
              onClick={(e) => setCloseDialog(!isCloseDialog)}
              className="px-4 py-2 text-blue-800  text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between ml-[16rem]">
        <p className="text-xl  text-[#082161] mt-20 font-[700]">Staff</p>
        {/* <Link 
                  to={{
                    pathname: "",
                    search: "",
                    hash: "",
                    state: { fromDashboard: refetch }
                  }}> */}
        <button
          type="button"
          className=" bg-[#082161] w-[8vw] mr-[7rem] mt-[5rem] text-[#ffffff] h-[6vh] rounded-md "
          onClick={addStaffHandler}
        >
          + Add Staff
        </button>
        {/* </Link> */}
      </div>
      <div className="flex">
        <p className="text text-xl ml-[20rem]  mb-[500px] text-[#082161] font-[500]">
          All Staff
        </p>
        <input
          type="text"
          className="form-control ml-[2rem] block px-4 h-[2.5rem] w-[12rem] p-1 mt-[-.5rem]  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none drop-shadow-md"
          placeholder="search here..."
        />
      </div>

      <div className="relative">
        <div className="flex   ml-[20rem] mt-[-30rem]">
          <table className="table-auto  w-[60rem] ">
            <thead className="bg-[#D9D9D9]">
              <tr className="h-[2.5rem]">
                <th>
                  <input type="checkbox" />
                </th>
                <th>Name</th>
                <th>Role</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Address</th>
                <th>Joining Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {staff?.map(( node ) => {
                const {
                  first_name,
                  last_name,
                  role,
                  mobile,
                  username,
                  address,
                  dateOfJoining,
                } = node;

                return (
                  <tr key={node.objectId} className="text-left">
                    <td>
                      <input type="checkbox" className="mx-4 mr-5 " />
                    </td>
                    <td>
                      <span className="absolute ml-[-28px] flex">
                        <img
                          alt="Staff"
                          src="https://lmsimages.sgp1.digitaloceanspaces.com/user_img.png"
                        />
                      </span>
                      <span className="capitalize truncate text-center">
                        {first_name} 
                        {/* {last_name} */}
                      </span>
                    </td>
                    <td className="text-center">{role} </td>
                    <td className="text-center">{mobile}</td>
                    <td className="text-center">{username}</td>
                    <td className="text-center">{address}</td>
                    <td className="text-center">{dateOfJoining?.slice(0, 10)}</td>
                    <td className="relative">
                      <div className="flex justify-center mt-2">
                        <Link
                          to={`/Editstaff/${node.objectId}`}
                          className="bg-green-100 p-2"
                        >
                          <svg
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
                        </Link>
                        <button
                          type="button"
                          className="bg-red-100 p-2"
                          onClick={() => deleteHandler(node.objectId)}
                        >
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
                        </button>
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
            orderCount:staffCount,
            pageRef
          }
        }/>
      </div>
    </>
  );
}

export default Staff;
