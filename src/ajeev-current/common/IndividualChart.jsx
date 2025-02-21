import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Cookies from "js-cookie";
import { fetchWithTokenRefresh } from "../../helpers/AuthType/backend";

const IndividualChart = (props) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const entityId = JSON.parse(Cookies.get("authUser")).entity_id.entity_id;

  const [value, setValue] = useState([]);
  const [dates, setDates] = useState([]);
  const [percentageLessThan18, setPercentageLessThan18] = useState([]);
  const [percentageBetween19And22, setPercentageBetween19And22] = useState([]);
  const [percentageBetween23And25, setPercentageBetween23And25] = useState([]);
  const [percentageMoreThan30, setPercentageMoreThan30] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchWithTokenRefresh({
          url: `${baseUrl}/api/device-graph/${props.imei}/`,
        });

        setValue(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [baseUrl, props.imei]);

  useEffect(() => {
    if (value.length > 0) {
      setDates(value.map((item) => item.date));
      setPercentageLessThan18(
        value.map((item) => item.percentage_less_than_18)
      );
      setPercentageBetween19And22(
        value.map((item) => item.percentage_between_19_and_22)
      );
      setPercentageBetween23And25(
        value.map((item) => item.percentage_between_23_and_25)
      );
      setPercentageMoreThan30(
        value.map((item) => item.percentage_more_than_30)
      );
    }
  }, [value]);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Less than 18",
        backgroundColor: "rgba(0,128,2, 0.8)",
        borderColor: "rgba(0,128,2, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0,128,2, 0.8)",
        hoverBorderColor: "rgba(0,128,2, 1)",
        data: percentageLessThan18,
      },
      {
        label: "Between 19 and 22",
        backgroundColor: "rgba(0,255,0, 0.8)",
        borderColor: "rgba(0,255,0, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0,255,0, 0.8)",
        hoverBorderColor: "rgba(0,255,0, 1)",
        data: percentageBetween19And22,
      },
      {
        label: "Between 23 and 25",
        backgroundColor: "rgba(255, 255, 1, 0.8)",
        borderColor: "rgba(255, 255, 1, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 255, 1, 0.8)",
        hoverBorderColor: "rgba(255, 255, 1, 1)",
        data: percentageBetween23And25,
      },
      {
        label: "More than 30",
        backgroundColor: "rgba(255, 0, 0, 0.8)",
        borderColor: "rgba(255, 0, 0, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 0, 0, 0.8)",
        hoverBorderColor: "rgba(255, 0, 0, 1)",
        data: percentageMoreThan30,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="container">
      <Bar width={1074} height={800} data={data} options={options} />
    </div>
  );
};

export default IndividualChart;
