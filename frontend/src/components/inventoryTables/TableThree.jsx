import { useState } from "react";
import Modal from "../Modal";
import { Link ,useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../store/variable";
import { useAuth } from '../../store/auth';

const TableThree = (data) => {
  const [serialNo, setSerialNo] = useState("");
  const [open, setOpen] = useState(false)
  const [isedit, setIsedit] = useState(true);
  const { getTokenFromLS } = useAuth();

  const navigate = useNavigate();
  const handleChangestate = () =>{
    navigate(`/inventory/changestate/${serialNo}`,{state : {state:"rough"}})
  }
  const handleDelete = async () =>{
    const header = {
      Authorization: 'Bearer ' + getTokenFromLS(),
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/diamond/deleteDiamond/${serialNo}`, { headers: header });
     
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.message);
      } else {
        console.error('Error fetching data: ', error);
      }
    }
  }
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Serial no
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                weight
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Grade
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                color
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-13 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, i) => (

              <tr key={i}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.serialNo}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.weight}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.grade}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.colour}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      
                      onClick={() => { setOpen(true); setSerialNo(item.serialNo); item.childs.length > 0 ? setIsedit(false) : setIsedit(true)}}
                      className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10 ">
                      Manage
                    </button>

                  </div>
                </td>
              </tr>
            ))}

          </tbody >
        </table>
      </div>  
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-full">
          <div className="mx-auto my-4 w-48">
          </div>
          <div className="flex gap-4">
          {isedit &&<Link to={`/inventory/editinventory/${serialNo}`} >
            <button  className="inline-flex items-center justify-center rounded-md border border-primary py-1 px-4 mx-1 text-center font-medium text-white bg-primary hover:bg-opacity-90 lg:px-8 xl:px-8">Edit</button>
            </Link>}
           {isedit && <button onClick={handleDelete} className="inline-flex items-center justify-center rounded-md border border-primary py-1 px-4 mx-1 text-center font-medium text-white bg-primary hover:bg-opacity-90 lg:px-8 xl:px-8">Delete</button>}
            <button onClick={handleChangestate} className="inline-flex items-center justify-center rounded-md border border-primary py-1 px-4 mx-1 text-center font-medium text-white bg-primary hover:bg-opacity-90 lg:px-8 xl:px-8">Change State</button>
            
            

          </div>
        </div>
      </Modal>
    </div>

  );
};

export default TableThree;
