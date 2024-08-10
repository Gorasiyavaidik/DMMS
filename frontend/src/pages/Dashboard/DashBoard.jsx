import CardFour from '../../components/CardFour.jsx';
import CardOne from '../../components/CardOne.jsx';
import CardThree from '../../components/CardThree.jsx';
import CardTwo from '../../components/CardTwo.jsx';
import ChartOne from '../../components/ChartOne.jsx';
import ChartThree from '../../components/ChartThree.jsx';
import ChartTwo from '../../components/ChartTwo.jsx';
import { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth.jsx';
import axios from 'axios';

const DashBoard = () => {
  

  
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardFour />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        
      </div>
    </>
  );
};

export default DashBoard;
