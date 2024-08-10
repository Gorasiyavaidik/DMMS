import React, { useEffect } from 'react';
import { Calendar, ConfigProvider, Badge } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../store/auth';
import { BASE_URL } from '../store/variable';
import moment from 'moment';

function MyCalendar() {
    const [recivable, setRecivable] = useState([]);
    const [payable, setPayable] = useState([]);
    const recivablearray = [];
    const payablearray = [];
    

    const { getTokenFromLS } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            const header = {
              Authorization: 'Bearer ' + getTokenFromLS(),
            }
            try {
                const response = await axios.get(`${BASE_URL}/api/payment/receivable`, { headers: header });
                setRecivable(response.data.data);
            }
            catch (error) {
                if (error.response && error.response.status === 400) {
                    // console.log(error.response.data.message);
                } else {
                    console.error('Error fetching data: ', error);
                }
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const header = {
              Authorization: 'Bearer ' + getTokenFromLS(),
            }
            try {
                const response = await axios.get(`${BASE_URL}/api/payment/payable`, { headers: header });
                setPayable(response.data.data);
            }
            catch (error) {
                if (error.response && error.response.status === 400) {
                    // console.log(error.response.data.message);
                } else {
                    console.error('Error fetching data: ', error);
                }
            }
        }
        fetchData();
    }, []);

    recivable.forEach(item => {
        recivablearray.push({
            date: item.date,
            title: `Buyer: ${item.buyer.name}` 
        });
    });

    payable.forEach(item => {
        payablearray.push({
            date: item.date,
            title: `Seller: ${item.seller.name}` 
        });
    });

    const getListData = (date) => {
      const listData = [];
      
      recivablearray.forEach(item => {
          if (moment(item.date).isSame(date, 'day')) {
              listData.push({
                  type: 'success',
                  content: item.title
              });
          }
      });
  
      payablearray.forEach(item => {
          if (moment(item.date).isSame(date, 'day')) {
              listData.push({
                  type: 'error',
                  content: item.title
              });
          }
      });
  
      return listData;
  };
  

    const getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    };
    // // console.log(payablearray)

    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value) => {
        const listData = getListData(value.format('YYYY-MM-DD'));
        return (
            <ul className="events">
                {listData.map((item, index) => (
                    <li key={index}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Calendar: {
                        itemActiveBg: '#283232',
                        colorText: '#000000',
                        colorBgContainer: '#FFFFFF',
                    },
                },
            }}
        >
            <Calendar
                cellRender={cellRender}
            />
        </ConfigProvider>
    );
}

export default MyCalendar;
