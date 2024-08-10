import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/auth";

const CardTwo = () => {

  const [profit, setProfit] = useState(0);
  const { getTokenFromLS } = useAuth();


  useEffect(() => {
    const fetchData = async () => {
      const header = {
        Authorization: 'Bearer ' + getTokenFromLS(),
      }
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/cut/profitCurrentMonth", { headers: header });
        setProfit(response.data.data);
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







  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <svg className="fill-primary dark:fill-white" width="22px" height="22px" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 14.0967C10.842 14.0967 9.90331 13.158 9.90331 12C9.90331 10.842 10.842 9.90331 12 9.90331C13.158 9.90331 14.0967 10.842 14.0967 12C14.0967 13.158 13.158 14.0967 12 14.0967Z" ></path> <path d="M7 12C7 12.5523 6.55229 13 6 13C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11C6.55229 11 7 11.4477 7 12Z" ></path> <path d="M18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12C17 12.5523 17.4477 13 18 13Z" ></path> <path fillRule="evenodd" clipRule="evenodd" d="M21 5C22.6569 5 24 6.34315 24 8V16C24 17.6569 22.6569 19 21 19H3C1.34315 19 0 17.6569 0 16V8C0 6.34315 1.34315 5 3 5H21ZM4 7H20C20 7.26264 20.0517 7.52272 20.1522 7.76537C20.2528 8.00802 20.4001 8.2285 20.5858 8.41421C20.7715 8.59993 20.992 8.74725 21.2346 8.84776C21.4773 8.94827 21.7374 9 22 9V15C21.7374 15 21.4773 15.0517 21.2346 15.1522C20.992 15.2528 20.7715 15.4001 20.5858 15.5858C20.4001 15.7715 20.2528 15.992 20.1522 16.2346C20.0517 16.4773 20 16.7374 20 17H4C4 16.7374 3.94827 16.4773 3.84776 16.2346C3.74725 15.992 3.59993 15.7715 3.41421 15.5858C3.2285 15.4001 3.00802 15.2528 2.76537 15.1522C2.52272 15.0517 2.26264 15 2 15V9C2.26264 9 2.52272 8.94827 2.76537 8.84776C3.00802 8.74725 3.2285 8.59993 3.41421 8.41421C3.59993 8.2285 3.74725 8.00802 3.84776 7.76537C3.94827 7.52272 4 7.26264 4 7Z" ></path> </g></svg>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {profit}
          </h4>
          <span className="text-sm font-medium">Profit this month</span>
        </div>

        
      </div>
    </div>
  );
};
 
export default CardTwo;
