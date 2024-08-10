import React, { useState, useEffect } from "react";
import Card_workshop from "../../components/Card_workshop";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../store/auth";
import { BASE_URL } from "../../store/variable";

const Workshops = () => {
    const [data, setData] = useState([]);
    const { getTokenFromLS } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            const header = {
                Authorization: 'Bearer ' + getTokenFromLS(),
            }
            try {
                const response = await axios.get(`${BASE_URL}/api/workshop/getAllWorkshop`, { headers: header });
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
    return (
        <>

            <Link
                to="/workshop/addworkshop"
                className="inline-flex items-center justify-center mb-4 rounded-xl bg-primary py-2 px-8 text-center font-medium text-white hover:bg-opacity-90"
            >
                Add workshop
            </Link>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2 xl:grid-cols-3 2xl:gap-4">
                <Card_workshop data={data} />
            </div>
        </>
    )
}

export default Workshops;