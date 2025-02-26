import { RiPencilFill } from "@remixicon/react";
import React, { useState } from "react";

const BudgetOverview = ({ budgetOverview, setShowModal }) => {
  return (
    <div className="card p-4 d-flex flex-row justify-content-between money widItem">
      <div className="left">
        <h2 className="fw-bold text-primary">
          ₹ {budgetOverview.totalExpense}
        </h2>
        <h6>Spent</h6>
      </div>

      <div className="right">
        <h2 className="fw-bold text-primary d-flex text-end">
          <a
            onClick={() => setShowModal(true)}
            className="d-flex align-items-center me-2 text-primary"
            style={{ cursor: "pointer" }}
          >
            <RiPencilFill />
          </a>
          <div>₹ {budgetOverview.budgetAmount}</div>
        </h2>
        <h6 className="text-end">Budget</h6>
      </div>
    </div>
  );
};

export default BudgetOverview;
