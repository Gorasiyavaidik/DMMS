import React,{useState,useEffect} from "react";
import Card_staff from "../../components/Card_staff";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import axios from "axios";


const Staff = () => {
    const [data, setData] = useState([]);
    const { getTokenFromLS } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            const header = {
                Authorization: 'Bearer ' + getTokenFromLS(),
            }
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/staff/getAllStaff", { headers: header });
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
    // console.log(data)
    return (
        <>
            <Link
              to="/staff/addstaff"
              className="inline-flex items-center justify-center mr-4 mb-4 rounded-xl bg-primary py-2 px-8 text-center font-medium text-white hover:bg-opacity-90 "
            >
              Add Staff
            </Link>
            <Link
              to="/staff/addattandance"
              className="inline-flex items-center justify-center mb-4 rounded-xl bg-primary py-2 px-8 text-center font-medium text-white hover:bg-opacity-90 "
            >
              Add Attandance
            </Link>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2 xl:grid-cols-3 2xl:gap-4">
                <Card_staff data ={data} />
            </div>
        </>
    )
}

export default Staff;
