
import ReactApexChart from 'react-apexcharts';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/auth";
import { set } from 'date-fns';



const ChartOne = () => {

  const [production, setProduction] = useState([]);
  const { getTokenFromLS } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const header = {
        Authorization: 'Bearer ' + getTokenFromLS(),
      }
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/production/lastYearProduction", { headers: header });
        setProduction(response.data.data);
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
  const counts = [];
  for (let i = 0; i < production.length; i++) {
    const monthName = new Date(Date.UTC(2000, production[i].month - 1, 1)).toLocaleString('en', { month: 'long' });
    months.push(monthName);
    counts.push(production[i].Count);
  }

  const options = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: months,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      min: 0,
      max: Math.max(...counts) + 10000,
    },
  };
  
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Production</p>
            </div>
          </div>
          
              
            
          
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={[{ name: 'production', data: counts }]}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
