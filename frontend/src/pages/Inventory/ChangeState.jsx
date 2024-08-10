import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";
import axios from "axios";
import { BASE_URL } from "../../store/variable";
import { useParams, useLocation } from "react-router-dom";


function ChangeState() {
  const location = useLocation();
  const state = location.state.state;
  const { id } = useParams();
  const data = id;
  const [serialnNo, setSerialNo] = useState("");
  const [Weight, setWeight] = useState();
  const [noofDiamond, setNoofDiamond] = useState(0);
  const { getTokenFromLS } = useAuth();
  const [diamondData, setDiamondData] = useState({});
  const [submitButton, setSubmitButton] = useState(true);
  const [workshop, setWorkshop] = useState({});
  const [allWorkshop, setAllWorkshop] = useState([]);
  // fatch inventory
  useEffect(() => {
    const fetchData = async () => {
      const header = {
        Authorization: "Bearer " + getTokenFromLS(),
      };
      try {
        const response = await axios.get(
          `${BASE_URL}/api/cut/getInventory/${data}`,
          { headers: header }
        );
        setDiamondData(response.data.data);
        setWorkshop({
          id: response.data.data.workshop._id,
          name: response.data.data.workshop.name,
        });
        // console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // console.log(error.response.data.message);
        } else {
          console.error("Error fetching data: ", error);
        }
      }
    };
    fetchData();
  }, []);

  // fatch all workshops
  useEffect(() => {
    const fetchData = async () => {
      const header = {
        Authorization: "Bearer " + getTokenFromLS(),
      };
      try {
        const response = await axios.get(
          `${BASE_URL}/api/workshop/getAllWorkshop`,
          { headers: header }
        );
        setAllWorkshop(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // console.log(error.response.data.message);
        } else {
          console.error("Error fetching data: ", error);
        }
      }
    };
    fetchData();
  }, []);

  const ChangeStatee = async (e) => {
    e.preventDefault();
    const body = {
      weight: Weight,
      serialNo: diamondData.serialNo,
    };
    const header = {
      Authorization: "Bearer " + getTokenFromLS(),
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/cut/roughToSorting",
        body,
        { headers: header }
      );
      window.location.href = "/inventory/inventory";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.message);
      } else {
        console.error("Error fetching data: ", error);
      }
    }
  };
  const ChangeStateSTP = async (e) => {
    e.preventDefault();
    const body = {
      weight: Weight,
      serialNo: diamondData.serialNo,
    };
    const header = {
      Authorization: "Bearer " + getTokenFromLS(),
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/cut/SortingToReadyToPolish",
        body,
        { headers: header }
      );
      window.location.href = "/inventory/inventory";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.message);
      } else {
        console.error("Error fetching data: ", error);
      }
    }
  };
  const ChangeStateSTR = async (e) => {
    e.preventDefault();
    const body = {
      weight: Weight,
      serialNo: diamondData.serialNo,
    };
    const header = {
      Authorization: "Bearer " + getTokenFromLS(),
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/cut/SortingToRoughToSell",
        body,
        { headers: header }
      );
      window.location.href = "/inventory/inventory";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.message);
      } else {
        console.error("Error fetching data: ", error);
      }
    }
  };
  const ChangeStateSTW = async (e) => {
    e.preventDefault();
    const body = {
      weight: Weight,
      serialNo: diamondData.serialNo,
    };
    const header = {
      Authorization: "Bearer " + getTokenFromLS(),
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/cut/SortingToRoughToWeightloss",
        body,
        { headers: header }
      );
      window.location.href = "/inventory/inventory";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.message);
      } else {
        console.error("Error fetching data: ", error);
      }
    }
  };
  const ChangeStateRPP = async (e) => {
    e.preventDefault();
    if(workshop === null){
      alert("Please select workshop");
      return;
    }
    if(noofDiamond === null){
      alert("Please enter no of diamond");
      return;
    }
    const body = {
      weight: Weight,
      serialNo: diamondData.serialNo,
      workshop: workshop,
      noofDiamond: noofDiamond,
    };
    const header = {
      Authorization: "Bearer " + getTokenFromLS(),
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/cut/ReadyToPolishToPolishing",
        body,
        { headers: header }
      );
      window.location.href = "/inventory/inventory";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.message);
      } else {
        console.error("Error fetching data: ", error);
      }
    }
  };
  const ChangeStatePP = async (e) => {
    e.preventDefault();
    const body = {
      weight: Weight,
      serialNo: diamondData.serialNo,
      workshop: workshop,
      noofDiamond: noofDiamond,
    };
    const header = {
      Authorization: "Bearer " + getTokenFromLS(),
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/cut/PolishingToPolished",
        body,
        { headers: header }
      );
      window.location.href = "/inventory/inventory";
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
      {state === "rough" && (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Change State
            </h3>
          </div>
          <form action="#">
            <div className="p-6.5">
              {/* serialnumber */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    serial number
                  </label>
                  <input
                    type="text"
                    defaultValue={diamondData.serialNo}
                    disabled={true}
                    onChange={(e) => setSerialNo(e.target.value)}
                    placeholder="serial number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              {/* grade,color,weight,price */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    total weight of rough inventory(carat)
                  </label>
                  <input
                    type="number"
                    defaultValue={diamondData.weight}
                    disabled={true}
                    onWheel={(e) => e.target.blur()}
                    placeholder="weight"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Enter Weight you want to move in sorting(carat)
                  </label>
                  <input
                    type="number"
                    onChange={(e) => {
                      setWeight(e.target.value);
                      if (e.target.value > diamondData.weight) {
                        alert(
                          "weight should be less than total weight of rough inventory"
                        );
                      }
                      if (e.target.value > diamondData.weight) {
                        setSubmitButton(true);
                      } else {
                        setSubmitButton(false);
                      }
                    }}
                    onWheel={(e) => e.target.blur()}
                    placeholder="weight"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <button
                onClick={ChangeStatee}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                disabled={submitButton}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      )}
      {state === "Sorting" && location.state.where == "ToPolishing" && (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Sorting To Ready To Polishing
            </h3>
          </div>
          <form action="#">
            <div className="p-6.5">
              {/* serialnumber */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    serial number
                  </label>
                  <input
                    type="text"
                    defaultValue={diamondData.serialNo}
                    disabled={true}
                    onChange={(e) => { setSerialNo(e.target.value); }}

                    placeholder="serial number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              {/* grade,color,weight,price */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    total weight of sorting inventory(carat)
                  </label>
                  <input
                    type="number"
                    defaultValue={diamondData.weight}
                    disabled={true}
                    onWheel={(e) => e.target.blur()}
                    placeholder="weight"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Weight to move in Ready to polishing(carat)
                  </label>
                  <input
                    type="number"
                    onChange={(e) => {
                      setWeight(e.target.value);
                      if (e.target.value > diamondData.weight) {
                        alert(
                          "weight should be less than total weight of rough inventory"
                        );
                      }
                      if (e.target.value > diamondData.weight) {
                        setSubmitButton(true);
                      } else {
                        setSubmitButton(false);
                      }
                    }}
                    onWheel={(e) => e.target.blur()}
                    placeholder="weight"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <button
                onClick={ChangeStateSTP}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                disabled={submitButton}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      )}
      {state === "Sorting" && location.state.where == "ToRough" && (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Sorting To Rough To Sell
            </h3>
          </div>
          <form action="#">
            <div className="p-6.5">
              {/* serialnumber */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    serial number
                  </label>
                  <input
                    type="text"
                    defaultValue={diamondData.serialNo}
                    disabled={true}
                    onChange={(e) => setSerialNo(e.target.value)}
                    placeholder="serial number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              {/* grade,color,weight,price */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    total weight of sorting inventory(carat)
                  </label>
                  <input
                    type="number"
                    defaultValue={diamondData.weight}
                    disabled={true}
                    onWheel={(e) => e.target.blur()}
                    placeholder="weight"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Weight to move in Ready to polishing(carat)
                  </label>
                  <input
                    type="number"
                    onChange={(e) => {
                      setWeight(e.target.value);
                      if (e.target.value > diamondData.weight) {
                        alert(
                          "weight should be less than total weight of rough inventory"
                        );
                      }
                      if (e.target.value > diamondData.weight) {
                        setSubmitButton(true);
                      } else {
                        setSubmitButton(false);
                      }
                    }}
                    onWheel={(e) => e.target.blur()}
                    placeholder="weight"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <button
                onClick={ChangeStateSTR}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                disabled={submitButton}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      )}
      {state === "Sorting" && location.state.where == "ToWeightloss" && (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Sorting To Weight loss
            </h3>
          </div>
          <form action="#">
            <div className="p-6.5">
              {/* serialnumber */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    serial number
                  </label>
                  <input
                    type="text"
                    defaultValue={diamondData.serialNo}
                    disabled={true}
                    onChange={(e) => setSerialNo(e.target.value)}
                    placeholder="serial number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>

              {/* grade,color,weight,price */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    total weight of sorting inventory(carat)
                  </label>
                  <input
                    type="number"
                    defaultValue={diamondData.weight}
                    disabled={true}
                    onWheel={(e) => e.target.blur()}
                    placeholder="weight"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Weight to move in Rough to Sell(carat)
                  </label>
                  <input
                    type="number"
                    onChange={(e) => {
                      setWeight(e.target.value);
                      if (e.target.value > diamondData.weight) {
                        alert(
                          "weight should be less than total weight of rough inventory"
                        );
                      }
                      if (e.target.value > diamondData.weight) {
                        setSubmitButton(true);
                      } else {
                        setSubmitButton(false);
                      }
                    }}
                    onWheel={(e) => e.target.blur()}
                    placeholder="weight"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <button
                onClick={ChangeStateSTW}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                disabled={submitButton}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      )}
      {state === "ReadyToPolish" && (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Assign to Wrokshop
            </h3>
          </div>
          <form action="#">
            <div className="p-6.5">
              {/* serialnumber */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    serial number
                  </label>
                  <input
                    type="text"
                    defaultValue={diamondData.serialNo}
                    disabled={true}
                    onChange={(e) => setSerialNo(e.target.value)}
                    placeholder="serial number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Workshop
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    onChange={(e) => {
                      if(e.target.value !== "Select"){setWorkshop({
                        id: allWorkshop[e.target.value]._id,
                        name: allWorkshop[e.target.value].name,
                      })}; if (e.target.value == "Select") {
                        setSubmitButton(true);
                        // console.log(workshop.id);
                        
                      }
                      else {
                        setSubmitButton(false);
                        
                      }
                    }
                    }
                    defaultValue={diamondData.workshop}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value={null}>Select</option>
                    {allWorkshop.map((option, index) => (
                      <option key={index} value={index}>
                        {option.name}
                      </option>
                    ))}
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
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    total weight of Ready To Polish inventory(carat)
                  </label>
                  <input
                    type="number"
                    defaultValue={diamondData.weight}
                    disabled={true}
                    onWheel={(e) => e.target.blur()}
                    placeholder="weight"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Weight to Assign Workshop(carat)
                  </label>
                  <input
                    type="number"
                    onChange={(e) => {
                      setWeight(e.target.value);
                      if (e.target.value > diamondData.weight) {
                        alert(
                          "weight should be less than total weight of rough inventory"
                        );
                      }
                      if (e.target.value > diamondData.weight || workshop.id === undefined || noofDiamond === 0) {
                        setSubmitButton(true);
                      } else {
                        setSubmitButton(false);
                      }
                    }}
                    onWheel={(e) => e.target.blur()}
                    placeholder="weight"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    No of Diamond
                  </label>
                  <input
                    type="number"
                    onChange={(e) => {
                      setNoofDiamond(e.target.value);
                    if (e.target.value === null || workshop.id === undefined) { setSubmitButton(true); } else { setSubmitButton(false); }}}
                    onWheel={(e) => e.target.blur()}
                    placeholder="No of Diamond"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <button
                onClick={ChangeStateRPP}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                disabled={submitButton}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      )}
      {state === "Polishing" && (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Add to polished
            </h3>
          </div>
          <form action="#">
            <div className="p-6.5">
              {/* serialnumber */}
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    serial number
                  </label>
                  <input
                    type="text"
                    defaultValue={diamondData.serialNo}
                    disabled={true}
                    placeholder="serial number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    workshop
                  </label>
                  <input
                    type="text"
                    defaultValue={workshop.name}
                    disabled={true}
                    placeholder="workshop"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Given Weight(carat)
                  </label>
                  <input
                    type="number"
                    defaultValue={diamondData.weight}
                    disabled={true}
                    onWheel={(e) => e.target.blur()}
                    placeholder="weight"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Given No of Diamond
                  </label>
                  <input
                    type="text"
                    defaultValue={diamondData.diamondCount}
                    disabled={true}
                    placeholder="No of Diamond"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Submitted Weight (carat)
                  </label>
                  <input
                    type="number"
                    onChange={(e) => {
                      setWeight(e.target.value);
                      if (e.target.value > diamondData.weight) {
                        alert(
                          "weight should be less than total weight of rough inventory"
                        );
                      }
                      if (e.target.value > diamondData.weight) {
                        setSubmitButton(true);
                      } else {
                        setSubmitButton(false);
                      }
                    }}
                    onWheel={(e) => e.target.blur()}
                    placeholder="weight"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    submit No of Diamond
                  </label>
                  <input
                    type="number"
                    onChange={(e) => {
                      setNoofDiamond(e.target.value);
                    }}
                    onWheel={(e) => e.target.blur()}
                    placeholder="No of Diamond"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              <button
                onClick={ChangeStatePP}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                disabled={submitButton}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default ChangeState;
