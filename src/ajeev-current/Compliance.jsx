import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Cookies from "js-cookie";
const Compliance = ({ compliant, nonCompliant, dates }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const entityId = JSON.parse(Cookies.get("authUser")).entity_id.entity_id;

  const data = {
    labels: dates || [],
    datasets: [
      {
        label: "Collected Houses",
        backgroundColor: "rgba(52, 195, 143, 0.8)",
        borderColor: "rgba(52, 195, 143, 0.8)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(52, 195, 143, 0.9)",
        hoverBorderColor: "rgba(52, 195, 143, 0.9)",
        data: compliant || [],
      },
      {
        label: "Not-Collected Houses",
        backgroundColor: "rgba(255, 0, 0,0.8)",
        borderColor: "rgba(255, 0,0,0.8)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.9)",
        hoverBorderColor: "rgba(255, 99, 132, 0.9)",
        data: nonCompliant || [],
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
            beginAtZero: true, // Start from zero
            stepSize: 10000,   // Define the interval between ticks
            min: 0,            // Ensure the scale starts at 0
            max: 150000,        // Define the maximum value of the scale (adjust as needed)
          },
        },
      ],
    },
  };
  

  return (
    <div className="container">
      <Bar width={474} height={300} data={data} options={options} />
    </div>
  );
};

export default Compliance;
