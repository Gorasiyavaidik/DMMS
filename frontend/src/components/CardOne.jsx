import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/auth";

const CardOne = () => {

  const [production, setProduction] = useState();
  const { getTokenFromLS } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const header = {
        Authorization: 'Bearer ' + getTokenFromLS(),
      }
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/production/getProduction", { headers: header });
        setProduction(response.data.data.Count);
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
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <svg className = "fill-primary dark:fill-white" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="22px" height="22px" viewBox="0 0 512 512" xmlSpace="preserve" fill="#f8f7f7" stroke="#f8f7f7"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">    </style> <g> <path className="st0" d="M262.203,224.297H257.5h-99.469L78.672,333.438L260.719,512l7.5-7.359L442.75,333.438l-79.344-109.141H262.203 z M345.813,245.75l-14.656,65.109l-51.859-65.109H345.813z M259.984,251.953l56.422,70.797H204.766L259.984,251.953z M240.75,245.75l-50.563,64.844v0.016l-14.563-64.859H240.75z M159.188,259.156L159.188,259.156l14.297,63.594h-60.547 L159.188,259.156z M179.25,341.75l50.063,109.422L117.75,341.75H179.25z M260.719,474.172L200.125,341.75h121.172L260.719,474.172z M292.109,451.172l50.063-109.422h61.484L292.109,451.172z M347.938,322.75l14.313-63.594l0,0l46.234,63.594H347.938z"></path> <path className="st0" d="M501.219,181.906c-25.906,0-34.859-6.5-39.906-11.531c-5.016-5.047-11.531-14-11.531-39.906 c0-0.984-0.094-3.781-3.188-3.781c-3.078,0-3.188,2.797-3.188,3.781c0,25.906-6.516,34.859-11.547,39.906 c-5.047,5.031-14.016,11.531-39.891,11.531c-1,0-3.781,0.109-3.781,3.203c0,3.078,2.781,3.188,3.781,3.188 c25.875,0,34.844,6.516,39.891,11.547c5.031,5.031,11.547,14,11.547,39.906c0,1,0.109,3.766,3.188,3.766 c3.094,0,3.188-2.766,3.188-3.766c0-25.906,6.516-34.875,11.531-39.906c5.047-5.047,14-11.547,39.906-11.547 c1,0,3.781-0.094,3.781-3.203C505,182.031,502.219,181.906,501.219,181.906z"></path> <path className="st0" d="M115.891,84.656c35.609,0,47.922,8.969,54.844,15.875c6.922,6.922,15.859,19.25,15.859,54.859 c0,1.359,0.188,5.172,4.406,5.172c4.25,0,4.375-3.813,4.375-5.172c0-35.609,8.953-47.938,15.875-54.859 c6.906-6.922,19.219-15.875,54.844-15.875c1.359,0,5.188-0.125,5.188-4.375c0-4.219-3.828-4.406-5.188-4.406 c-35.625,0-47.938-8.938-54.844-15.844c-6.922-6.938-15.875-19.234-15.875-54.844C195.375,3.828,195.25,0,191,0 c-4.219,0-4.406,3.828-4.406,5.188c0,35.609-8.938,47.906-15.859,54.844c-6.922,6.906-19.234,15.844-54.844,15.844 c-1.359,0-5.188,0.172-5.188,4.406C110.703,84.5,114.531,84.656,115.891,84.656z"></path> <path className="st0" d="M114.453,196c0-2.828-2.563-2.938-3.469-2.938c-23.828,0-32.078-5.984-36.703-10.609 c-4.625-4.641-10.625-12.875-10.625-36.703c0-0.906-0.094-3.469-2.938-3.469c-2.813,0-2.938,2.563-2.938,3.469 c0,23.828-5.984,32.063-10.609,36.703c-4.641,4.625-12.891,10.609-36.703,10.609C9.547,193.063,7,193.172,7,196 s2.547,2.938,3.469,2.938c23.813,0,32.063,6,36.703,10.625c4.625,4.625,10.609,12.875,10.609,36.719 c0,0.906,0.125,3.453,2.938,3.453c2.844,0,2.938-2.547,2.938-3.453c0-23.844,6-32.094,10.625-36.719 c4.625-4.641,12.875-10.625,36.703-10.625C111.891,198.938,114.453,198.844,114.453,196z"></path> </g> </g></svg>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {production}
          </h4>
          <span className="text-sm font-medium">Production This month</span>
        </div>

        
      </div>
    </div>
  );
};

export default CardOne;
