import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Data = () => {
 
  const [filtedData, setFilteredData] = useState([]);

  const navigate=useNavigate();

  const fetchData=async()=>{
    try {
      const {data}=await axios.get(`${process.env.REACT_APP_HOST}/api/v1/chart/dataCountryWise`)
      handleFilteredData(data.data)
    
    } catch (error) {
      console.log(error)
    }
  }
  const handleFilteredData = (data) => {
    let arr = [];
    let obj = {};
    let cn = data[0].CountryName;
    data.map((ele) => {
      if (ele.CountryName === cn) {
        obj[ele.Year] = parseInt(ele.Value);
      } else {
        obj["CountryName"] = cn;
        cn = ele.CountryName;
        arr.push(obj);
        obj = {};
        obj[ele.Year] = parseInt(ele.Value);
      }
    });
    setFilteredData(arr);
   
  };
  useEffect(() => {
  
    fetchData();
    let success = JSON.parse(localStorage.getItem("auth"))?.success;
    if (!success) {
      navigate("/login");
    }
     // eslint-disable-next-line
  }, []);

  return (
    <div className="relative overflow-x-auto">
       <h1 className="text-center text-[#05494F] pb-10 text-3xl font-roboto font-extrabold">
        Population Table (2001-2010)
      </h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 font-roboto py-3">
              country
            </th>
            {[...Array(10)]?.map((_, i) => {
              return (
                <th key={i} className="px-6 font-roboto py-3">
                 {i===9?`2010`:`200${i+1}`} 
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
        {
          filtedData?.map((item)=>{
            return (
              <tr key={item.CountryName} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-inter font-medium text-black whitespace-nowrap dark:text-white"
              >
              {  item.CountryName.substr(0,10)}
              </th>
              <td className="px-6 py-4">{Math.floor(item[2001]/1000000)}M</td>
              <td className="px-6 py-4">{Math.floor(item[2002]/1000000)}M</td>
              <td className="px-6 py-4">{Math.floor(item[2003]/1000000)}M</td>
              <td className="px-6 py-4">{Math.floor(item[2004]/1000000)}M</td>
              <td className="px-6 py-4">{Math.floor(item[2005]/1000000)}M</td>
              <td className="px-6 py-4">{Math.floor(item[2006]/1000000)}M</td>
              <td className="px-6 py-4">{Math.floor(item[2007]/1000000)}M</td>
              <td className="px-6 py-4">{Math.floor(item[2008]/1000000)}M</td>
              <td className="px-6 py-4">{Math.floor(item[2009]/1000000)}M</td>
              <td className="px-6 py-4">{Math.floor(item[2010]/1000000)}M</td>
              
            </tr>
            )
          })
        }
         


        </tbody>
      </table>
    </div>
  );
};

export default Data;
