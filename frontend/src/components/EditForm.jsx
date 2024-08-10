import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useAuth } from '../store/auth';
import axios from 'axios';
import { BASE_URL } from '../../store/variable';

import moment from 'moment';

function formatDate(date) {
  const formattedDate = moment(date).format("YYYY-MM-DD");
  return formattedDate;
}

const EditForm = ({ state, data, handleClose }) => {
  const cancelButtonRef = useRef(null);
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
  const { getTokenFromLS } = useAuth();
  const [diamondData, setDiamondData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const header = {
        Authorization: 'Bearer ' + getTokenFromLS(),
      }
      try {
        const response = await axios.get(`${BASE_URL}/api/cut/getInventory/${data}`, { headers: header });
        setDiamondData(response.data.data);
        // console.log(response.data.message);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // console.log(error.response.data.message);
        } else {
          console.error('Error fetching data: ', error);
        }
      }
      try {
        const response = await axios.get(`${BASE_URL}/api/individual/getAllBrokers`, { headers: header });
        setAllBroker(response.data.data);
        // console.log(response.data.message);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // console.log(error.response.data.message);
        } else {
          console.error('Error fetching data: ', error);
        }
      }
      try {
        const response = await axios.get(`${BASE_URL}/api/individual/getAllSellers`, { headers: header });
        setAllSeller(response.data.data);
        // console.log(response.data.message);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // console.log(error.response.data.message);
        } else {
          console.error('Error fetching data: ', error);
        }
      }
    };
    fetchData();
    setSerialNo(diamondData.serialNo);
    setWeight(diamondData.weight);
    setBroker(diamondData.broker);
    setSeller(diamondData.seller);
    setGrade(diamondData.grade);
    setColour(diamondData.colour);
    setPrice(diamondData.price);
    setPayment_date(diamondData.payment_date);
    setDiscount(diamondData.discount);
    setTotal_price(diamondData.total_price);
  }, []);
  useEffect(() => { setTotal_price(price * weight) }, [weight, price]);
  const editInventory = async (e) => {
    e.preventDefault();
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
      const response = await axios.post(`${BASE_URL}/api/diamond/editDiamond`, body, { headers: header });
      // console.log(response.data.message);
      window.location.href = "/inventory/inventory";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.message);
      } else {
        console.error('Error fetching data: ', error);
      }
    }
  }
  return (state &&
    <div>
      <Transition.Root show={true} as={Fragment}>
        <Dialog as="div" className="relative z-10 " initialFocus={cancelButtonRef} onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto mt-20">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 backdrop-blur">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Edit Diamonds
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
                              // defaultValue={diamondData.serialNo}
                              value={diamondData.serialNo}
                              // disabled={true}
                              onChange={(e) => setSerialNo(e.target.value)}
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
                            <select onChange={(e) => setBroker({ id: e.target.value._id, name: e.target.value.name })} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                              <option value={null} >Select</option>
                              {allBroker.map((option, index) => (
                                <option key={index} value={option} selected={option.id == diamondData.broker.id}>
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
                            <select onChange={(e) => setSeller({ id: e.target.value._id, name: e.target.value.name })} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                              <option value={null} >Select</option>
                              {allSeller.map((option, index) => (
                                <option key={index} value={option} selected={option.id == diamondData.seller.id}>
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
                              defaultValue={diamondData.grade}
                              onChange={(e) => setGrade(e.target.value)}
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
                              defaultValue={diamondData.colour}
                              onChange={(e) => setColour(e.target.value)}
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
                              defaultValue={diamondData.weight}
                              onChange={(e) => { setWeight(e.target.value); }}
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
                              defaultValue={diamondData.price}
                              onChange={(e) => { setPrice(e.target.value); }}
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
                              // defaultValue="2017-09-30"
                              defaultValue={formatDate(diamondData.payment_date)}
                              onChange={(e) => setPayment_date(e.target.value)}
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
                              defaultValue={diamondData.discount}
                              onChange={(e) => setDiscount(e.target.value)}
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
                              defaultValue={diamondData.total_price}
                              onChange={(e) => setTotal_price(e.target.value)}
                              value={total_price}
                              onWheel={(e) => e.target.blur()}
                              placeholder="total price"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                          </div>
                        </div>
                        <button onClick={editInventory} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                          submit
                        </button>
                      </div>
                    </form>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
};

export default EditForm;