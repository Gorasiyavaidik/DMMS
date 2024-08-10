import React , {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import BTableTwo from '../../components/IndividualTables/BTableTwo';
import axios from "axios";
import { BASE_URL } from '../../store/variable';
import { useAuth } from "../../store/auth";
import BTableOne from '../../components/IndividualTables/BTableOne';

const BrokerDetail = () => {
const { id } = useParams();
const [broker, setBroker] = useState([]);
const { getTokenFromLS } = useAuth();
const [data, setData] = useState();
const [data2 , setData2] = useState();
useEffect(() => {
    const fetchData = async () => {
        const header = {
            Authorization: 'Bearer ' + getTokenFromLS(),
        }
        try {
            const response = await axios.get(`${BASE_URL}/api/individual/getSingleIndividual/${id}`, { headers: header });
            setBroker(response.data.data);
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
            const response = await axios.get(`${BASE_URL}/api/diamond/getBrokerDiamond/${id}`, { headers: header });
            setData(response.data.data.diamonddata);
            setData2(response.data.data.diamonddata2);
            
        } catch (error) {
            if (error.response && error.response.status === 400) {
            } else {
                console.error('Error fetching data: ', error);
            }
        }
    };
    fetchData();
}, []);

  return (
    <div>
      <h2>Broker Details</h2>
      <div>Name: {broker.name}</div>
      <div>Number: {broker.number}</div>
      <div>address: {broker.address}</div>
      <div>Note : {broker.note}</div>
      <BTableTwo data={data}/>
      <BTableOne data={data2}/>
    </div>
  );
}

export default BrokerDetail;
