import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const WeeklyExpensesBarChart = ({ weeklyExpenses }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: weeklyExpenses.map((item) => item._id),
        datasets: [
          {
            label: "Weekly Expenses",
            data: weeklyExpenses.map((item) => item.totalAmount),
            backgroundColor: ["#00509d"],
            borderWidth: 1,
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

export default WeeklyExpensesBarChart;
