import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useEffect } from 'react';
import axios from 'axios';  
import { useAuth } from '../store/auth';



const ChartTwo = () => {
  const [revenue, setRevenue] = useState([]);
  const [profit, setProfit] = useState([]);
  const { getTokenFromLS } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const header = {
        Authorization: 'Bearer ' + getTokenFromLS(),
      }
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/payment/profitLastSixMonth" , { headers: header }); 
        setProfit(response.data.data);
        // console.log(response.data.data);
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
        const response = await axios.get("http://127.0.0.1:8000/api/payment/Revenue" , { headers: header }); 
        setRevenue(response.data.data);
        // console.log(response.data.data);
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
  

  const months = [];
  const profitarray = [];
  for (let i = 1; i < profit.length; i++) {
    const monthName = new Date(Date.UTC(2000, profit[i].month - 1, 1)).toLocaleString('en', { month: 'long' });
    months.push(monthName);
    profitarray.push(profit[i].profit);
    // console.log(profitarray)
  }
  const revenuearray = [];
  for (let i = 1; i < revenue.length; i++) {
    revenuearray.push(revenue[i].revenue);
  }
// console.log(revenuearray)
const state ={
  series: [
    {
      name: 'Profit',
      data: profitarray,
    },
    {
      name: 'Revenue',
      data: revenuearray,
    },
  ],
};



 

  const options = {
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 335,
      // stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
  
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: '25%',
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: '75%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    dataLabels: {
      enabled: false,
    },
  
    xaxis: {
      categories: months,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',
  
      markers: {
        radius: 99,
      },
    },
    fill: {
      opacity: 1,
    },
  };
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
