import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Link } from "react-router-dom";
import ExpenseItem from "../expense/ExpenseItem";
dayjs.extend(utc);
dayjs.extend(timezone);

const RecentExpenses = ({ RecentExpenses }) => {
  return (
    <div className="card p-4 spend widItem">
      <h5 className="mb-4 fw-bold">Recent Expenses</h5>

      {RecentExpenses && RecentExpenses.length > 0 ? (
        RecentExpenses.map((expenseItem) => (
          <ExpenseItem key={expenseItem.id} expense={expenseItem} />
        ))
      ) : (
        <p>No recent expenses.</p>
      )}

      {RecentExpenses && RecentExpenses.length > 0 ? (
        <div className="text-end">
          <Link to="/expenses" className="text-primary fw-medium">
            See More
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default RecentExpenses;
