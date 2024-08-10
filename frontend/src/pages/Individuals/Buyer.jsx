import React, { useEffect, useState } from "react";
import Card_buyer from "../../components/Card_buyer";
import axios from "axios";
import { useAuth } from "../../store/auth";
import { BASE_URL } from '../../store/variable';


const Buyer = () => {
    const [data, setData] = useState([]);
    const { getTokenFromLS } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            const header = {
                Authorization: 'Bearer ' + getTokenFromLS(),
            }
            try {
                const response = await axios.get(`${BASE_URL}/api/individual/getAllBuyer`, { headers: header });
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

            <div className="inline-flex items-center text-4xl justify-center mb-4 rounded-xl py-2 text-center font-bold text-white hover:bg-opacity-90">Buyer</div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2 xl:grid-cols-3 2xl:gap-4">
                <Card_buyer data={data} />
            </div>
        </>
    )
}

export default Buyer;