import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ weeklyExpenses }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: weeklyExpenses.map((item) => item.day),
        datasets: [
          {
            label: "Weekly Expenses",
            data: weeklyExpenses.map((item) => item.amount),
            backgroundColor: ["#00509d"],
            borderRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "none",
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (tooltipItem) => `₹ ${tooltipItem.raw}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [weeklyExpenses]);

  return <canvas ref={chartRef} id="myBarChart"></canvas>;
};

export default BarChart;
