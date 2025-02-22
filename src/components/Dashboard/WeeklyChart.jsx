import React from "react";
import BarChart from "../charts/BarChart";

const WeeklyChart = ({ WeeklyChart }) => {
  const formattedData = Object.entries(WeeklyChart).map(([day, amount]) => ({
    day,
    amount,
  }));

  return (
    <div className="card p-4 chart widItem">
      <div className="d-flex justify-content-center align-items-center">
        {formattedData && formattedData.length > 0 ? (
          <BarChart weeklyExpenses={formattedData} />
        ) : (
          <p className="text-center">
            Add an expense to view the weekly expenses chart
          </p>
        )}
      </div>
    </div>
  );
};

export default WeeklyChart;
