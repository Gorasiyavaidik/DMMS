import React from "react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/auth";
import { BASE_URL } from "../../store/variable";

const Adddiamond = () => {
  const [submitButton, setSubmitButton] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState();
  const [type, setType] = useState({});
  const [address, setAddress] = useState({});
  const [balance, setBalance] = useState();
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const { getTokenFromLS } = useAuth();
  const addIndividual = async (e) => {
    e.preventDefault();
    const body = {
      name: name,
      number: number,
      type: type,
      address: address,
      note: note,
      balance: balance,
    };
    const header = {
      Authorization: "Bearer " + getTokenFromLS(),
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/individual/addIndividual`,
        body,
        { headers: header }
      );
      // console.log(response.data.message);
      window.location.href = `/individuals/${type}`;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.message);
      } else {
        console.error("Error fetching data: ", error);
      }
    }
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Individual
          </h3>
        </div>
        <form action="#">
          <div className="p-6.5">
            {/* serialnumber */}
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                    if (name.length > 0) {
                      setSubmitButton(true);
                    } else {
                      setSubmitButton(false);
                    }
                  }}
                  placeholder="Name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
            {/* broker Seller */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Type
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  onChange={(e) => {
                    setType(e.target.value);
                    if (e.target.value == "Type") {
                      setSubmitButton(true);
                    }
                  }}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">Type</option>
                  <option value="Broker">Broker</option>
                  <option value="Buyer">Buyer</option>
                  <option value="Seller">Seller</option>
                </select>
                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </span>
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
                  Balance
                </label>
                <input
                  type="Number"
                  placeholder="Balance"
                  onChange={(e) => setBalance(e.target.value)}
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
                  Note
                </label>
                <input
                  type="text"
                  placeholder="Note"
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
            <button
              onClick={addIndividual}
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Adddiamond;
