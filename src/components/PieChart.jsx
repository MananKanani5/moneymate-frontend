import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const PieChart = ({ data, colors }) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const labels = data.map((item) => item._id);
      const chartData = data.map((item) => item.totalAmount);
      const chartColors = labels.map((label) => colors[label]);

      chartInstance = new Chart(chartRef.current, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: chartData,
              backgroundColor: chartColors,
              hoverBackgroundColor: chartColors,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data, colors]);

  return (
    <canvas
      ref={chartRef}
      id="myPieChart"
      style={{
        display: "block",
        boxSizing: "border-box",
        height: "415px",
        width: "415px",
      }}
    ></canvas>
  );
};

export default PieChart;
