import React from "react";

const BudgetOverview = ({ budgetOverview }) => {
  return (
    <div className="card p-4 d-flex flex-row justify-content-between money widItem">
      <div className="left">
        <h2 className="fw-bold text-primary">
          ₹ {budgetOverview.totalExpense}
        </h2>
        <h6>Spent</h6>
      </div>

      <div className="right">
        <h2 className="fw-bold text-primary text-end">
          ₹ {budgetOverview.budgetAmount}
        </h2>
        <h6 className="text-end">Budget</h6>
      </div>
    </div>
  );
};

export default BudgetOverview;
