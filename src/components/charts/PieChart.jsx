import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const PieChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const labels = data.map((item) => item.categoryName);
      const chartData = data.map((item) => parseFloat(item.totalAmount));
      const chartColors = data.map((item) => item.categoryColor);

      // Create new chart
      chartInstance.current = new Chart(chartRef.current, {
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
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

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
