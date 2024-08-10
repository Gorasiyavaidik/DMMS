import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../store/variable";
import { useAuth } from "../../store/auth";

const Selldiamond = () => {
  const { getTokenFromLS } = useAuth();
  const [firstDropdownValue, setFirstDropdownValue] = useState('');
  const [secondDropdownValue, setSecondDropdownValue] = useState('');
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
  const [allBroker, setAllBroker] = useState([]);
  const [allBuyer, setAllBuyer] = useState([]);
  const [broker, setBroker] = useState({});
  const [buyer, setBuyer] = useState({});
  const [serialNo, setSerialNo] = useState('');
  const [price, setPrice] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [brokerage, setBrokerage] = useState('');
  const [discount, setDiscount] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [weight, setWeight] = useState('');


  const handleSubmit = async () => {
    const header = {
      Authorization: 'Bearer ' + getTokenFromLS(),
    }
    const body = {
      weight : weight,
      serialNo: serialNo,
      price: price,
      paymentDate: paymentDate,
      brokerage: brokerage,
      discount: discount,
      totalPrice: totalPrice,
      broker: broker,
      buyer: buyer
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/cut/sold`, body, { headers: header });
      window.location.href = "/inventory/inventory";
    }
    catch(error)
    {
      console.error('Error fetching data: ', error);
    }
  }

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
        const response = await axios.get(`${BASE_URL}/api/individual/getAllBuyer`, { headers: header });
        setAllBuyer(response.data.data);
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

  useEffect(() => {
    if (firstDropdownValue) {
      fetchDataForSecondDropdown(firstDropdownValue);
    }
  }, [firstDropdownValue]);
  const fetchDataForSecondDropdown = async (selectedValue) => {
    if(selectedValue === 'Polished To Sell') {
    try {
      const response = await axios.get(`${BASE_URL}/api/cut/getPolishedInventory`);
      setSecondDropdownOptions(response.data.data.map(item => ({
        value: JSON.stringify({ serialNo: item.serialNo, weight: item.weight }),
        label: `${item.serialNo} - ${item.colour} - ${item.weight}carat` // Adjust label format as needed
      })));
      
      // console.log(response.data);
    } catch (error) {
      console.error('Error fetching data for second dropdown:', error);
    }
  }
  else if(selectedValue === 'Rough To Sell') {
    try {
      const response = await axios.get(`${BASE_URL}/api/cut/getRoughToSell`);
      setSecondDropdownOptions(response.data.data.map(item => ({
        value: JSON.stringify({ serialNo: item.serialNo, weight: item.weight }),
        label: `${item.serialNo} - ${item.colour} - ${item.weight}carat` 
      })));
    } catch (error) {
      console.error('Error fetching data for second dropdown:', error);
    }
  }
  };

  const handleFirstDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setFirstDropdownValue(selectedValue);
    setSecondDropdownValue('');
  };

  const handleSecondDropdownChange = (event) => {
    // console.log(event.target.value)
    const { serialNo, weight } = JSON.parse(event.target.value);
    setSerialNo(serialNo);
    setWeight(weight);
    setSecondDropdownValue(event.target.value);
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Sell diamonds
          </h3>
        </div>
        <form action="#">
          <div className="p-6.5">
            {/* select diamond type */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Diamond Type To Sell
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" value={firstDropdownValue} onChange={handleFirstDropdownChange}>
                  <option value="">Select Diamond Type</option>
                  <option value="Polished To Sell">Polished To Sell</option>
                  <option value="Rough To Sell">Rough To Sell</option>
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
            {/* serialnumber */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                serial number
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" value={secondDropdownValue} onChange={handleSecondDropdownChange}>
                  <option value="">Select Serial No</option>
                  {
                    Array.isArray(secondDropdownOptions) && secondDropdownOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    )
                    )}
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
                Buyer
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select onChange={(e) => {setBuyer({ id: allBuyer[e.target.value]._id, name: allBuyer[e.target.value].name }) }} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  <option value={null}>Select</option>
                  {allBuyer.map((option, index) => (
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
                  price(carat)
                </label>
                <input
                  type="number"
                  onChange={(e) => {setPrice(e.target.value);setTotalPrice(weight *(price - (price * e.target.value / 100) - (price * brokerage / 100) ))}}
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
                  placeholder="date"
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>




            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Brokerage(%)
                </label>
                <input
                  type="number"
                  placeholder="Brokerage(%)"
                  onWheel={(e) => e.target.blur()}
                  onChange={(e) => {setBrokerage(e.target.value);setTotalPrice(weight *(price - (price * e.target.value / 100) - (price * brokerage / 100) ))}}
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
                  onWheel={(e) => e.target.blur()}
                  onChange={(e) => {setDiscount(e.target.value); setTotalPrice(weight *(price - (price * e.target.value / 100) - (price * brokerage / 100) ))}}
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
                  value = {totalPrice}
                  onChange={(e) => setTotalPrice(e.target.value)}
                  onWheel={(e) => e.target.blur()}
                  placeholder="total price"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>


            </div>
            <button  onClick={handleSubmit} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
              submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Selldiamond;