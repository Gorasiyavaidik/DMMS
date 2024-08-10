import React , {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import WorkshopTable from '../../components/WorkshopTables/WorkshopTable';
import axios from "axios";
import { BASE_URL } from '../../store/variable';
import { useAuth } from "../../store/auth";

const BrokerDetail = () => {
const { id } = useParams();
const [workshop, setBroker] = useState([]);
const { getTokenFromLS } = useAuth();
const [data2 , setData2] = useState([]);
useEffect(() => {
    const fetchData = async () => {
        const header = {
            Authorization: 'Bearer ' + getTokenFromLS(),
        }
        try {
            const response = await axios.get(`${BASE_URL}/api/workshop/getIndividualWorkshop/${id}`, { headers: header });
            setBroker(response.data.data);
            // console.log(response.data.data)
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
  const fetchData = async () => {
      const header = {
          Authorization: 'Bearer ' + getTokenFromLS(),
      }
      try {
          const response = await axios.get(`${BASE_URL}/api/cut/getWorkshopInventory/${id}`, { headers: header });
          setData2(response.data.data);
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

const handleClear = async () => {
    console.log("clicked")
    const header = {
        Authorization: 'Bearer ' + getTokenFromLS(),
    }
    try {
        const response = await axios.get(`${BASE_URL}/api/workshop/clearBalance/${id}`, { headers: header });
        setBroker(response.data.data);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            // console.log(error.response.data.message);
        } else {
            console.error('Error fetching data: ', error);
        }
    }
}


 
  return (
    <div>
        <button 
        onClick={handleClear}
         className="inline-flex items-center justify-center mr-4 mb-4 rounded-xl bg-primary py-2 px-8 text-center font-medium text-white hover:bg-opacity-90 ">Clear Balance</button>
                
            
      <h2>Workshop Details</h2>
      <div>Name: {workshop.name}</div>
      <div>Number: {workshop?.owner?.number}</div>
      <div>Per Diamond Charge: {workshop.LabourPerDiamond}</div>
      <div>Balance: {workshop.balance}</div>
      <div>address: {workshop.address}</div>
      {workshop.note && <div>Note : {workshop.note}</div>}
      <WorkshopTable data={data2}/>
    </div>
  );
}

export default BrokerDetail;
