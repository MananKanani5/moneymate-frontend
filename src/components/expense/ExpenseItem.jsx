import React, { useState } from "react";
import Food from "../../assets/categories/Food.jpg";
import Transport from "../../assets/categories/Transport.jpg";
import Entertainment from "../../assets/categories/Entertainment.jpg";
import Personal from "../../assets/categories/Personal.jpg";
import MISC from "../../assets/categories/MISC.jpg";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const ExpenseItem = ({ key, expense, isExpense = false }) => {
  const categoryImages = { Entertainment, Food, MISC, Personal, Transport };
  const categoryImage = categoryImages[expense.category.categoryName] || MISC;

  return (
    <>
      <a className="text-black">
        <div
          key={key}
          className="d-flex align-items-center w-100 mb-1 spending-item"
        >
          <img
            src={categoryImage}
            className="rounded-2"
            alt={expense.category}
            loading="lazy"
          />
          <div className="flex-grow-1 d-flex justify-content-between align-items-center">
            <div className="spending-details ms-3">
              <h6 className="m-0">{expense.category.categoryName}</h6>
              <p className="spending-date">
                {dayjs(expense.dateTime)
                  .tz("Asia/Kolkata")
                  .format("DD-MM-YYYY hh:mm A")}
              </p>
              {isExpense ? (
                <p className="spending-description">
                  {expense.description.length >
                  (window.innerWidth < 768 ? 15 : 80)
                    ? `${expense.description.slice(
                        0,
                        window.innerWidth < 768 ? 15 : 80
                      )}...`
                    : expense.description}
                </p>
              ) : (
                ""
              )}
            </div>
            <p className="fw-medium">₹{expense.amount}</p>
          </div>
        </div>
      </a>
    </>
  );
};

export default ExpenseItem;
