import React from "react";
import Food from "../assets/categories/Food.jpg";
import Transport from "../assets/categories/Transport.jpg";
import Entertainment from "../assets/categories/Entertainment.jpg";
import Personal from "../assets/categories/Personal.jpg";
import MISC from "../assets/categories/MISC.jpg";

const ExpenseItem = ({ expenses, onEdit }) => {
  const categoryImages = {
    Food,
    Transport,
    Entertainment,
    Personal,
    MISC,
  };

  const categoryPath = categoryImages[expenses.category] || MISC;

  const [time, date] = expenses.datetime.split(" ");

  const handleEdit = () => {
    onEdit({
      time: time.trim(),
      date: date.trim(),
      amount: expenses.amount,
      category: expenses.category,
      note: expenses.note,
      id: expenses._id,
    });
  };

  return (
    <div className="mb-2">
      <a
        href="#"
        onClick={handleEdit}
        className="spending-item mb-2 d-flex justify-content-between"
      >
        <div className="d-flex align-items-center w-100">
          <img
            src={categoryPath}
            className="rounded-2"
            alt={expenses.category}
            loading="lazy"
          />
          <div className="flex-grow-1 d-flex justify-content-between">
            <div className="spending-details ms-2">
              <h6 className="m-0">{expenses.category}</h6>
              <p className="spending-date">{expenses.datetime}</p>
              <p className="spending-date">{expenses.note}</p>
            </div>
            <p className="fw-medium">₹{expenses.amount}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ExpenseItem;
