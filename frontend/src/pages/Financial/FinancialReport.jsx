import { useState, useEffect } from "react";
import { useAuth } from "../../store/auth.jsx";
import axios from "axios";
import { BASE_URL } from "../../store/variable";
import { set } from "date-fns";

const FinancialReport = () => {
  const { getTokenFromLS } = useAuth();
  const [serialNo, setSerialNo] = useState("");
  const [diamondData, setDiamondData] = useState([]);
  const [submitButton, setSubmitButton] = useState(true);
  const [financialReport, setFinancialReport] = useState(false);
  const [data, setData] = useState([]);
  const [sortedDiamonds, setSortedDiamonds] = useState({});
  
  const [type,setType] = useState();
  const [financialYearProfit, setFinancialYearProfit] = useState(0);
  const [financialYearSold, setFinancialYearSold] = useState(0);
  const [financialYearWeightloss, setFinancialYearWeightloss] = useState(0);
  let financialYearData = {};



  const [selectedYear, setSelectedYear] = useState(null);
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 10}, (_, i) => currentYear - i); // Change 10 to the number of years you want to display



  const handleChangeYear = (e) => {
    setSelectedYear(parseInt(e.target.value));
    
    }

  

  useEffect(() => {
    const fetchData = async () => {
      const header = {
        Authorization: "Bearer " + getTokenFromLS(),
      };
      try {
        const response = await axios.get(
          `${BASE_URL}/api/diamond/getAllDiamond`,
          { headers: header }
        );
        setDiamondData(response.data.data);
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
  const handleSubmit = async () => {
    setFinancialReport(true);
    console.log(type);
  
    if (type === "cut") {
      const body = {
        serialNo: serialNo,
      };
      const header = {
        Authorization: "Bearer " + getTokenFromLS(),
      };
  
      try {
        const response = await axios.post(
          `${BASE_URL}/api/diamond/getAllRelatedDiamond`,
          body,
          { headers: header }
        );
        setData(response.data.data);
  
        const sortedDiamonds = {
          rough: [],
          Sorting: [],
          ReadyToPolish: [],
          Polishing: [],
          Polished: [],
          RoughToSell: [],
          Sold: [],
          Weightloss: [],
        };
  
        response.data.data.forEach((diamond) => {
          switch (diamond.state) {
            case "ReadyToPolish":
              sortedDiamonds.ReadyToPolish.push(diamond);
              break;
            case "Polishing":
              sortedDiamonds.Polishing.push(diamond);
              break;
            case "Polished":
              sortedDiamonds.Polished.push(diamond);
              break;
            case "Sorting":
              sortedDiamonds.Sorting.push(diamond);
              break;
            case "Rough":
              sortedDiamonds.rough.push(diamond);
              break;
            case "RoughToSell":
              sortedDiamonds.RoughToSell.push(diamond);
              break;
            case "Sold":
              sortedDiamonds.Sold.push(diamond);
              break;
            case "Weightloss":
              sortedDiamonds.Weightloss.push(diamond);
              break;
            default:
              break;
          }
        });
  
        setSortedDiamonds(sortedDiamonds);
      } catch (error) {
        if (error.response && error.response.status === 400) {
        } else {
          console.error("Error fetching data: ", error);
        }
      }
    }
  
    if (type === "year") {
      const header = {
        Authorization: "Bearer " + getTokenFromLS(),
      };
      try {
        const response = await axios.get(
          `${BASE_URL}/api/payment/financialYearProfit/${selectedYear}`,
          { headers: header }
        );
        financialYearData = response.data.data;
        setFinancialYearProfit(response.data.data.profit);
        console.log(financialYearData)
        
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  };
  
  let totalprofit = 0;
  let Roughprice = 0;
  if(sortedDiamonds.rough)
    {
      Roughprice = sortedDiamonds.rough[0].expenses[0].amount; 
    }
  if(sortedDiamonds.Sold){
    sortedDiamonds.Sold.map((item)=>{
      totalprofit += item.expenses[0].amount - item.expenses[1].amount; 
    })
  }
  if(sortedDiamonds.Weightloss)
    {
      sortedDiamonds.Weightloss.map((item)=>{
        totalprofit -= item.weight * Roughprice ;
      })
    }


  return (
    <>
      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">
          Financial Report
        </label>
        <div className="relative z-20 bg-transparent dark:bg-form-input">
          <select
            onChange={(e) => {
              if (e.target.value !== "") {
                const selectedValue = e.target.value;
                setType(selectedValue);
                console.log(selectedValue)
                setSubmitButton(false);
              } else {
                setSubmitButton(true);
              }
            }}
            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option value="select">Select</option>
            <option value="cut">Cut Wise Report</option>
            <option value="year">Year Wise Report</option>
          </select>
          {type=="cut" && <select
            onChange={(e) => {
              if (e.target.value !== "") {
                setSerialNo(diamondData[e.target.value].serialNo);
                setSubmitButton(false);
              } else {
                setSubmitButton(true);
              }
            }}
            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option value="">Select</option>
            {diamondData.map((option, index) => (
              <option key={index} value={index}>
                {option.serialNo}
              </option>
            ))}
          </select>}

          <div>
      
      {type=="year" && <select id="year" className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" onChange={handleChangeYear} value={selectedYear || ""}>
        <option value="">Select</option>
        {years.map((year, index) => (
          <option key={index} value={year}>{year}</option>
        ))}
      </select>}
      
    </div>











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
        <button
          className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
          disabled={submitButton}
          onClick={handleSubmit}
        >
          submit
        </button>
      </div>
      {financialReport && (
        <div>
          {Object.entries(sortedDiamonds).map(([category, diamonds], index) => (
            <div
              key={index}
              className="mb-2.5 block text-black dark:text-white"
            >
              <h2>{diamonds[0] && category.toUpperCase()}</h2>
              {category === "rough" && (
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Serial no
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        weight
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {diamonds.map((item, i) => (
                      <tr key={i}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {item.serialNo}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {item.weight}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {category === "Sorting" && (
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Serial no
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        weight
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {diamonds.map(
                      (item, i) =>
                        item.weight !== 0 && (
                          <tr key={i}>
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                              <h5 className="font-medium text-black dark:text-white">
                                {item.serialNo}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {item.weight}
                              </p>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              )}
              {category === "ReadyToPolish" && diamonds[0] && (
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Serial no
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        weight
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {diamonds.map(
                      (item, i) =>
                        item.weight !== 0 && (
                          <tr key={i}>
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                              <h5 className="font-medium text-black dark:text-white">
                                {item.serialNo}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {item.weight}
                              </p>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              )}
              {category === "Polishing" && diamonds[0] && (
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Serial no
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        weight
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        workshop
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        no of diamonds
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {diamonds.map(
                      (item, i) =>
                        item.weight !== 0 && (
                          <tr key={i}>
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                              <h5 className="font-medium text-black dark:text-white">
                                {item.serialNo}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {item.weight}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {item.workshop?.name}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {item.diamondCount}
                              </p>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              )}
              {category === "Polished" && diamonds[0] && (
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Serial no
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        weight
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        workshop
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        no of diamonds
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        total expense
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {diamonds.map((item, i) => {
                      if (item.weight !== 0 && item.expenses) {
                        return (
                          <tr key={i}>
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                              <h5 className="font-medium text-black dark:text-white">
                                {item.serialNo}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {item.weight}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {item.workshop.name}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {item.diamondCount}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {" "}
                                {item.expenses[0].amount}
                              </p>
                            </td>
                          </tr>
                        );
                      } else {
                        return null; // or you can handle this case differently
                      }
                    })}
                  </tbody>
                </table>
              )}
              {category === "RoughToSell" && diamonds[0] && (
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Serial no
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        weight
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        total expense
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {diamonds.map(
                      (item, i) =>
                        item.weight !== 0 && (
                          <tr key={i}>
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                              <h5 className="font-medium text-black dark:text-white">
                                {item.serialNo}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {item.weight}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {" "}
                                {item.expenses[1].amount}
                              </p>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              )}
              {category === "Sold" && diamonds[0] && (
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Serial no
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        weight
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        total expense
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        profit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {diamonds.map((item, i) => {
                      if (item.weight !== 0 && item.expenses) {
                        return (
                          <tr key={i}>
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                              <h5 className="font-medium text-black dark:text-white">
                                {item.serialNo}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {item.weight}
                              </p>
                            </td>

                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {" "}
                                {item.expenses[1].amount}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {" "}
                                {item.expenses[0].amount - item.expenses[1].amount}
                              </p>
                            </td>
                          </tr>
                        );
                      } else {
                        return null; // or you can handle this case differently
                      }
                    })}
                  </tbody>
                </table>
              )}
              {category === "Weightloss" && diamonds[0] && (
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Serial no
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        weight
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {diamonds.map(
                      (item, i) =>
                        item.weight !== 0 && (
                          <tr key={i}>
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                              <h5 className="font-medium text-black dark:text-white">
                                {item.serialNo}
                              </h5>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {item.weight}
                              </p>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              )}
            </div>
          ))}
          <div className="min-w-80 py-4 px-4 font-medium text-black dark:text-white"> Total Profit : {totalprofit || financialYearProfit }</div>

        </div>
      )}
    </>
  );
};

export default FinancialReport;
