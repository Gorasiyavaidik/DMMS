import React,{useState , useEffect} from "react";
import axios from "axios";
import { useAuth } from "../../store/auth";
import {BASE_URL} from '../../store/variable';

const AddStaff = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState();
  const [address, setAddress] = useState({});
  const [balance,setBalance] = useState();
  const [note, setNote] = useState("");
  const[salary,setSalary] = useState();
  const [error, setError] = useState("");
  const { getTokenFromLS } = useAuth();
  const addStaff = async (e) => {
    e.preventDefault();
    const body = {
      name: name,
      number: number,
      salary : salary,
      address: address,
      note: note,
      balance : balance,
    };
    const header = {
      Authorization: 'Bearer ' + getTokenFromLS(),
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/staff/addStaff`, body, { headers: header });
      // console.log(response.data.message);
      window.location.href = "/staff";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.message);
      } else {
        console.error('Error fetching data: ', error);
      }
    }
  }
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Staff
          </h3>
        </div>
        <form action="#">
          <div className="p-6.5">
           
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  name
                </label>
                <input
                  type="text"
                  placeholder="name"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

        
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  salary
                </label>
                <input
                  type="Number"
                  placeholder="salary"
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

        
            </div>
           
            
            {/* Mobile Number */}
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Mobile Number
                </label>
                <input
                  type="Number"
                  placeholder="Mobile Number"
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

        
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  balance
                </label>
                <input
                  type="Number"
                  placeholder="balance"
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

        
            

        
            </div>
            <button onClick={addStaff} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
              submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddStaff;