import Breadcrumb from '../../components/Breadcrumb';
import React from 'react';
import { useState, useEffect } from 'react';
import TableThree from '../../components/inventoryTables/TableThree';
import SortingTable from '../../components/inventoryTables/SortingTable';
import ReadyToPilish from '../../components/inventoryTables/ReadyToPolish';
import Polishing from '../../components/inventoryTables/Polishing';
import Polished from '../../components/inventoryTables/Polished';
import RoughTiSell from '../../components/inventoryTables/RoughToSell';
import axios from 'axios';
import {BASE_URL} from '../../store/variable';
import { useAuth } from '../../store/auth';

const Tables = () => {
  const [data, setData] = useState([]);
  const[state,setState] = useState("rough")
  const { getTokenFromLS } = useAuth();

  const rough = async () => {
    setState("rough");
    var roughBtn = document.getElementById("rough");
    var sortingBtn = document.getElementById("sorting");
    var ReadyToPolishBtn = document.getElementById("ReadyToPolish");
    var polishingBtn = document.getElementById("polishing");
    var polishedBtn = document.getElementById("polished");
    var RoughToSellBtn = document.getElementById("RoughToSell");
    roughBtn.classList.add("bg-primary");
    sortingBtn.classList.remove("bg-primary");
    ReadyToPolishBtn.classList.remove("bg-primary");
    polishingBtn.classList.remove("bg-primary");
    polishedBtn.classList.remove("bg-primary");
    RoughToSellBtn.classList.remove("bg-primary");

    const header = {
      Authorization: 'Bearer ' + getTokenFromLS(),
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/cut/getRoughInventory`, { headers: header });
      // console.log(response.data.message);
      setData(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.message);
      } else {
        console.error('Error fetching data: ', error);
      }
    }
  }
  const sorting = async () => {
    setState("sorting");
    var roughBtn = document.getElementById("rough");
    var sortingBtn = document.getElementById("sorting");
    var ReadyToPolishBtn = document.getElementById("ReadyToPolish");
    var polishingBtn = document.getElementById("polishing");
    var polishedBtn = document.getElementById("polished");
    var RoughToSellBtn = document.getElementById("RoughToSell");
    roughBtn.classList.remove("bg-primary");
    sortingBtn.classList.add("bg-primary");
    ReadyToPolishBtn.classList.remove("bg-primary");
    polishingBtn.classList.remove("bg-primary");
    polishedBtn.classList.remove("bg-primary");
    RoughToSellBtn.classList.remove("bg-primary");
    

    const header = {
      Authorization: 'Bearer ' + getTokenFromLS(),
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/cut/getSortingInventory`, { headers: header });
      // console.log(response.data.message);
      setData(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.message);
      } else {
        console.error('Error fetching data: ', error);
      }
    }
  }
  const ReadyToPolish = async () => {
    setState("ReadyToPolish");
    var roughBtn = document.getElementById("rough");
    var sortingBtn = document.getElementById("sorting");
    var ReadyToPolishBtn = document.getElementById("ReadyToPolish");
    var polishingBtn = document.getElementById("polishing");
    var polishedBtn = document.getElementById("polished");
    var RoughToSellBtn = document.getElementById("RoughToSell");
    roughBtn.classList.remove("bg-primary");
    sortingBtn.classList.remove("bg-primary");
    ReadyToPolishBtn.classList.add("bg-primary");
    polishingBtn.classList.remove("bg-primary");
    polishedBtn.classList.remove("bg-primary");
   RoughToSellBtn.classList.remove("bg-primary");

    const header = {
      Authorization: 'Bearer ' + getTokenFromLS(),
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/cut/getReadyToPolish`, { headers: header });
      // console.log(response.data.message);
      setData(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.message);
      } else {
        console.error('Error fetching data: ', error);
      }
    }
  }
  const polishing = async () => {
    setState("polishing");
    var roughBtn = document.getElementById("rough");
    var sortingBtn = document.getElementById("sorting");
    var ReadyToPolishBtn = document.getElementById("ReadyToPolish");
    var polishingBtn = document.getElementById("polishing");
    var polishedBtn = document.getElementById("polished");
    var RoughToSellBtn = document.getElementById("RoughToSell");
    roughBtn.classList.remove("bg-primary");
    sortingBtn.classList.remove("bg-primary");
    ReadyToPolishBtn.classList.remove("bg-primary");
    polishingBtn.classList.add("bg-primary");
    polishedBtn.classList.remove("bg-primary");
    RoughToSellBtn.classList.remove("bg-primary");

    const header = {
      Authorization: 'Bearer ' + getTokenFromLS(),
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/cut/getPolishingInventory`, { headers: header });
      // console.log(response.data.message);
      setData(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.message);
      } else {
        console.error('Error fetching data: ', error);
      }
    }
  }
  const polished = async () => {
    setState("polished");
    var roughBtn = document.getElementById("rough");
    var sortingBtn = document.getElementById("sorting");
    var ReadyToPolishBtn = document.getElementById("ReadyToPolish");
    var polishingBtn = document.getElementById("polishing");
    var polishedBtn = document.getElementById("polished");
    var RoughToSellBtn = document.getElementById("RoughToSell");
    roughBtn.classList.remove("bg-primary");
    sortingBtn.classList.remove("bg-primary");
    ReadyToPolishBtn.classList.remove("bg-primary");
    polishingBtn.classList.remove("bg-primary");
    polishedBtn.classList.add("bg-primary");
    RoughToSellBtn.classList.remove("bg-primary");

    const header = {
      Authorization: 'Bearer ' + getTokenFromLS(),
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/cut/getPolishedInventory`, { headers: header });
      // console.log(response.data.message);
      setData(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.message);
      } else {
        console.error('Error fetching data: ', error);
      }
    }
  }
  const RoughToSell = async () => {
    setState("RoughToSell");
    var roughBtn = document.getElementById("rough");
    var sortingBtn = document.getElementById("sorting");
    var ReadyToPolishBtn = document.getElementById("ReadyToPolish");
    var polishingBtn = document.getElementById("polishing");
    var polishedBtn = document.getElementById("polished");
    var RoughToSellBtn = document.getElementById("RoughToSell");
    roughBtn.classList.remove("bg-primary");
    sortingBtn.classList.remove("bg-primary");
    ReadyToPolishBtn.classList.remove("bg-primary");
    polishingBtn.classList.remove("bg-primary");
    polishedBtn.classList.remove("bg-primary");
    RoughToSellBtn.classList.add("bg-primary");

    const header = {
      Authorization: 'Bearer ' + getTokenFromLS(),
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/cut/getRoughToSell`, { headers: header });
      // console.log(response.data.message);
      setData(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log(error.response.data.message);
      } else {
        console.error('Error fetching data: ', error);
      }
    }
  }

  useEffect(() => {
    rough();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Inventory" />
      
      <div
        className="inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        role="group">
        <button
          type="button"
          id="rough"
          onClick={rough}
          className="inline-block rounded-l bg-primary bg-primary-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black dark:text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 "
          data-te-ripple-init
          data-te-ripple-color="light">
          rough-inventory
        </button>
        <button
          type="button"
          id="sorting"
          onClick={sorting}
          className="inline-block px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black dark:text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
          data-te-ripple-init
          data-te-ripple-color="light">
          sorting
        </button>
        <button
          type="button"
          id="ReadyToPolish"
          onClick={ReadyToPolish}
          className="inline-block px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black dark:text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
          data-te-ripple-init
          data-te-ripple-color="light">
          Ready To Polish
        </button>
        <button
          type="button"
          id="polishing"
          onClick={polishing}
          className="inline-block rounded-r px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black dark:text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
          data-te-ripple-init
          data-te-ripple-color="light">
          polishing
        </button>
        <button
          type="button"
          id="polished"
          onClick={polished}
          className="inline-block rounded-r px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black dark:text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
          data-te-ripple-init
          data-te-ripple-color="light">
          polished-inventory
        </button>
        <button
          type="button"
          id="RoughToSell"
          onClick={RoughToSell}
          className="inline-block rounded-r px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black dark:text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
          data-te-ripple-init
          data-te-ripple-color="light">
          Rough To Sell
        </button>
      </div>
      
      {state === "rough" && <div className="flex flex-col gap-10">
        <TableThree data={data} />
      </div>}
      {state === "sorting" && <div className="flex flex-col gap-10">
        <SortingTable data={data} />
      </div>}
      {state === "ReadyToPolish" && <div className="flex flex-col gap-10">
        <ReadyToPilish data={data} />
      </div>}
      {state === "polishing" && <div className="flex flex-col gap-10">
        <Polishing data={data} />
      </div>}
      {state === "polished" && <div className="flex flex-col gap-10">
        <Polished data={data} />
      </div>}
      {state === "RoughToSell" && <div className='flex flex-col gap-10'>
        <RoughTiSell data={data}></RoughTiSell>
        </div>}
      
      
      
      
    </>
  );
};

export default Tables