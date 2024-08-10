import { useState } from "react";
import Modal from "../Modal";
import { Link ,useNavigate } from "react-router-dom";

const SortingTable = (data) => {
    const navigate = useNavigate();
    
    const [serialNo, setSerialNo] = useState("");
    const [open, setOpen] = useState(false)
    const [change , setChange] = useState(false);

    const handleChangeState = () =>{
        // navigate(`/inventory/changestate/${serialNo}` , {state : {state : "sorting"}});
        setChange(true);
    }

    const handleToPolishing = ()=>{
        navigate(`/inventory/changestate/${serialNo}` , {state : {state : "Sorting",where:"ToPolishing"}});
    }

    const handleToRough = ()=>{
        navigate(`/inventory/changestate/${serialNo}` , {state : {state : "Sorting",where:"ToRough"}});
    }

    const handleToWeightloss = ()=>{
        navigate(`/inventory/changestate/${serialNo}` , {state : {state : "Sorting",where:"ToWeightloss"}});
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
                        onClick={() => { setOpen(true); setSerialNo(item.serialNo); }}
                        className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10">
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
            {/* <Link to={`/inventory/editinventory/${serialNo}`} >
                <button  className="inline-flex items-center justify-center rounded-md border border-primary py-1 px-4 mx-1 text-center font-medium text-white bg-primary  hover:bg-opacity-90 lg:px-8 xl:px-8">Edit</button>
                </Link> */}
                <button onClick={handleChangeState} className="inline-flex items-center justify-center rounded-md border border-primary py-1 px-4 mx-1 text-center font-medium text-white bg-primary hover:bg-opacity-90 lg:px-8 xl:px-8">Change State</button>
            </div>
            </div>
        </Modal>
        { change &&
            <Modal open={open} onClose={() => {setChange(false);setOpen(false)}}>
            <div className="text-center w-full">
            <div className="mx-auto my-4 w-48">
            </div>
            <div className="flex gap-4">

                <button  onClick={handleToPolishing} className="inline-flex items-center justify-center rounded-md border border-primary py-1 px-4 mx-1 text-center font-medium text-white bg-primary hover:bg-opacity-90 lg:px-8 xl:px-8">Move to ready to polish</button>

                <button onClick={handleToRough} className="inline-flex items-center justify-center rounded-md border border-primary py-1 px-4 mx-1 text-center font-medium text-white bg-primary hover:bg-opacity-90 lg:px-8 xl:px-8">Move to Rough to sell</button>

                <button onClick={handleToWeightloss} className="inline-flex items-center justify-center rounded-md border border-primary py-1 px-4 mx-1 text-center font-medium text-white bg-primary hover:bg-opacity-90 lg:px-8 xl:px-8">Add Weight loss</button>
            
            </div>
            </div>
        </Modal>
        }
        </div>

    );
};

export default SortingTable;
