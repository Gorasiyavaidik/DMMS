import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../store/auth';
import StaffTable from '../../components/StaffTable';

const Staffdetail = () => {
  const { id } = useParams();
  const [staff, setStaff] = useState([]);
  const [data, setData] = useState([]);
  const { getTokenFromLS } = useAuth();
  useEffect(() => {
      const fetchData = async () => {
          const header = {
              Authorization: 'Bearer ' + getTokenFromLS(),
          }
          try {
              const response = await axios.get(`http://127.0.0.1:8000/api/staff/getIndividualStaff/${id}`, { headers: header });
              setStaff(response.data.data);
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
            const response = await axios.get(`http://127.0.0.1:8000/api/attandance/getStaffAttendance/${id}`, { headers: header });
            setData(response.data.data);
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
    return (
      <div>
        <h2>Staff Details</h2>
        <div>Name: {staff.name}</div>
        <div>Number: {staff.number}</div>
        <div>Salary: {staff.salary}</div>
        <div>address: {staff.address}</div>
        <StaffTable data={data} salary={staff.salary} />
      
    </div>
  );
}

export default Staffdetail;
