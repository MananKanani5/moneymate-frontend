import React from "react";
import PieChart from "../charts/PieChart";

const CategoryChart = ({ categoryChart }) => {
  return (
    <div className="card p-4 pie widItem">
      <div className="d-flex justify-content-center align-items-center">
        {categoryChart && categoryChart.length > 0 ? (
          <PieChart data={categoryChart} />
        ) : (
          <p className="text-center">Add an expense to view the chart</p>
        )}
      </div>
    </div>
  );
};

export default CategoryChart;
