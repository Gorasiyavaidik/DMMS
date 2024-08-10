import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TableOne from '../../components/IndividualTables/TableOne';
import { useAuth } from '../../store/auth';
import axios from 'axios';
import { BASE_URL } from '../../store/variable';

const BuyerDetail = () => {
  const { id } = useParams();
  const [buyer, setBuyer] = useState([]);
  const { getTokenFromLS } = useAuth();
  const [data2, setData2] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const header = {
        Authorization: 'Bearer ' + getTokenFromLS(),
      }
      try {
        const response = await axios.get(`${BASE_URL}
/api/individual/getSingleIndividual/${id}`, { headers: header });
        setBuyer(response.data.data);
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
        const response = await axios.get(`http://127.0.0.1:8000/api/diamond/getBuyerDiamond/${id}`, { headers: header });
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
      <h2>Buyer Details</h2>
      <div>Name: {buyer.name}</div>
      <div>Number: {buyer.number}</div>
      <div>address: {buyer.address}</div>
      <TableOne data={data2} />
    </div>
  );
}

export default BuyerDetail;
