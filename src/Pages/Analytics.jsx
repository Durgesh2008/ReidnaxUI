import React, { useEffect, useState } from "react";
import {
  Chart as Chartjs,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const options = {
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  legend: {
    labels: {
      fontSize: 26,
    },
  },
};
Chartjs.register(CategoryScale, LinearScale, BarElement);
const Analytics = () => {
  const [Data, setdata] = useState([]);
  const [chartdata, setchartdata] = useState([]);
  const [labels, setlabels] = useState([]);
  const [chart, setchart] = useState({
    labels: labels,
    datasets: [{ data: chartdata, borderWidth: 1 }],
  });
  const [selected, setSelected] = useState("India");
  const [countries, setCountries] = useState([]);

  const HandleChange = (e) => {
    setSelected(e.target.value);
  };
  const fetchdata = async () => {
    try {
      console.log(selected);
      const res = await axios.get(
        `${process.env.REACT_APP_HOST}/api/v1/chart/chatdata/${selected}`
      );
      const resdata = await res.data;

      if (resdata) {
       
        setdata(resdata.data);
        updateChartData(resdata.data);
      } else {
        console.error("Response data is undefined.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCountries = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_HOST}/api/v1/chart/allCountry`
      );
      const resdata = await res.data;

      if (resdata) {
        // Check if resdata is defined before accessing its properties
        setCountries(resdata.distinctCountries);
      } else {
        console.error("Response data is undefined.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateChartData = (data) => {
    let value = [];
    let lab = [];
    data?.map((item) => {
      value.push(parseInt(item.Value));
      lab.push(item.Year);
    });

    setchart({
      labels: lab,
      datasets: [{ data: value, borderWidth: 1 }],
    });
  };

  useEffect(() => {
    fetchdata();
  }, [selected]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    let success = JSON.parse(localStorage.getItem("auth"))?.success;
    if (!success) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <h1 className="text-center text-[#05494F] text-3xl font-roboto font-extrabold">
        Population Chart (2001-2010)
      </h1>
      <div className="flex gap-4 items-center">
        <label className="block mb-2 text-base font-inter capitalize my-3 font-semibold text-gray-900 dark:text-white">
          Select an Country
        </label>
        <select
          onChange={HandleChange}
          className="bg-gray-100 border overflow-y-auto my-5 p-2  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[8%]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option disabled selected>
            {selected}
          </option>

          {countries?.map((ele, i) => {
            return (
              <option key={i} className="font-inter text-xs p-1 " value={ele}>
                {ele}
              </option>
            );
          })}
        </select>
      </div>
      {console.log(chartdata)}
      <div>
        <Bar data={chart} height={400} options={options} />
      </div>
    </>
  );
};

export default Analytics;
