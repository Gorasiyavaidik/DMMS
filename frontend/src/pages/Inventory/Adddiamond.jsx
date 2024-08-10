import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../store/auth"
import {BASE_URL} from "../../store/variable";


const Adddiamond = () => {

  const [serialnNo, setSerialNo] = useState("");
  const [weight, setWeight] = useState();
  const [broker, setBroker] = useState({});
  const [seller, setSeller] = useState({});
  const [grade, setGrade] = useState("");
  const [colour, setColour] = useState("");
  const [price, setPrice] = useState();
  const [payment_date, setPayment_date] = useState("");
  const [discount, setDiscount] = useState();
  const [total_price, setTotal_price] = useState();
  const [note, setNote] = useState("");
  const [allBroker, setAllBroker] = useState([]);
  const [allSeller, setAllSeller] = useState([]);
  const [submit, setSubmit] = useState(false);
  const { getTokenFromLS } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const header = {
        Authorization: 'Bearer ' + getTokenFromLS(),
      }
      try {
        const response = await axios.get(`${BASE_URL}/api/individual/getAllBroker`, { headers: header });
        setAllBroker(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // console.log(error.response.data.message);
        } else {
          console.error('Error fetching data: ', error);
        }
      }
      try {
        const response = await axios.get(`${BASE_URL}/api/individual/getAllSeller`, { headers: header });
        setAllSeller(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // console.log(error.response.data.message);
        } else {
          console.error('Error fetching data: ', error);
        }
      }
    };
    fetchData();
  }, []);

  const addInventory = async (e) => {
  if(serialnNo !== "" && weight !== "" && seller.id !== undefined && grade !== "" && colour !== "" && price !== "" && payment_date !== "" && discount !== "" && total_price !== "")
   { e.preventDefault();
    const body = {
      serialNo: serialnNo,
      weight: weight,
      broker: broker,
      seller: seller,
      grade: grade,
      colour: colour,
      price: price,
      payment_date: payment_date,
      discount: discount,
      total_price: total_price,
      note: note
    };
    const header = {
      Authorization: 'Bearer ' + getTokenFromLS(),
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/diamond/addDiamond", body, { headers: header });
      // console.log(response.data.message);
      window.location.href = "/inventory/inventory";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.message);
      } else {
        console.error('Error fetching data: ', error);
      }
    }}
    else
    {
      alert("Please fill all the fields");
    }
  }
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Diamonds
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
                  onChange={(e) => {setSerialNo(e.target.value)}}
                  placeholder="serial number"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>


            </div>
            {/* broker Seller */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Broker
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select onChange={(e) => setBroker({ id: allBroker[e.target.value]._id, name: allBroker[e.target.value].name})} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  <option value={null}>Select</option>
                  {allBroker.map((option, index) => (
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
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Seller
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select onChange={(e) => {setSeller({ id: allSeller[e.target.value]._id, name: allSeller[e.target.value].name }) }} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  <option value={null}>Select</option>
                  {allSeller.map((option, index) => (
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

            {/* grade,color,weight,price */}
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Grade
                </label>
                <input
                  type="text"
                  onChange={(e) => {setGrade(e.target.value); }}
                  placeholder="Grade"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>


            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Color
                </label>
                <input
                  type="text"
                  onChange={(e) => {setColour(e.target.value); }}
                  placeholder="Color"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>


            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  weight(carat)
                </label>
                <input
                  type="number"
                  onChange={(e) => { setWeight(e.target.value); setTotal_price(price * weight);  }}
                  onWheel={(e) => e.target.blur()}
                  placeholder="weight"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>


            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  price(carat)
                </label>
                <input
                  type="number"
                  onChange={(e) => { setPrice(e.target.value); setTotal_price(price * weight); }}
                  onWheel={(e) => e.target.blur()}
                  placeholder="price"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>


            </div>


            {/* payment date */}
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  payment date
                </label>
                <input
                  type="date"
                  onChange={(e) => {setPayment_date(e.target.value);}}
                  placeholder="date"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>




            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Discount(%)
                </label>
                <input
                  type="number"
                  onChange={(e) => {setDiscount(e.target.value);setTotal_price(price * weight - (price * weight * e.target.value / 100)); if(e.target.value !== "" && serialnNo !== "" && weight !== "" && seller.id !== undefined && grade !== "" && colour !== "" && price !== "" && payment_date !== ""){setSubmit(true)}else{setSubmit(false)} ;}}
                  placeholder="Discount(%)"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>


            </div>

            {/* total value */}
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  total price
                </label>
                <input
                  type="number"
                  onChange={(e) => setTotal_price(e.target.value)}
                  value={total_price}
                  onWheel={(e) => e.target.blur()}
                  placeholder="total price"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>


            </div>
            <button onClick={addInventory} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray" disabled={!submit}>
              submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Adddiamond;