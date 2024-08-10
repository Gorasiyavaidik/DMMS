import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import TableTwo from '../../components/IndividualTables/TableTwo';
import { useAuth } from '../../store/auth';
import axios from 'axios';

const SellerDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const { getTokenFromLS } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            const header = {
                Authorization: 'Bearer ' + getTokenFromLS(),
            }
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/individual/getSingleIndividual/${id}`, { headers: header });
                setData(response.data.data);
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
                const response = await axios.get(`http://127.0.0.1:8000/api/diamond/getSellerDiamond/${id}`, { headers: header });
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
  

  return (
    <div>
      <h2>Broker Details</h2>
      <div>Name: {data.name}</div>
      <div>Number: {data.number}</div>
      <div>address: {data.address}</div>
      <TableTwo data={data2}/>
    </div>
  );
}

export default SellerDetail;
