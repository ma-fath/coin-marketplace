import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

function LineChart({ historicData }) {
  const labels = new Array(historicData.length);
  const options = {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Historic Data",
        data: historicData,
        pointRadius: 0,
        // tension: 0.4,
        fill: {
          target: "origin", // 3. Set the fill options
          // above: "rgba(75, 192, 192, 0.25)",
        },
        borderColor: ["rgb(75, 192, 192)"],
        borderWidth: 1,
        // borderColor: gradient2, // Add custom color border (Line)
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 30, 0, 170);
          gradient.addColorStop(1, "rgba(11, 20, 66, 1)");
          gradient.addColorStop(0, "rgba(75, 192, 192, 0.2)");
          return gradient;
        },
      },
    ],
  };

  return <Line data={data} options={options} />;
}

export default LineChart;
