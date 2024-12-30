import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  RiAddLargeFill,
  RiCalendar2Line,
  RiMoneyRupeeCircleLine,
  RiQuestionLine,
  RiStickyNoteLine,
  RiTimeLine,
} from "@remixicon/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddExpense = ({ onExpenseAdded }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [expenseData, setExpenseData] = useState({
    time: "",
    date: "",
    amount: "",
    category: "",
    note: "",
  });

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  const handleChange = (e) => {
    setExpenseData({
      ...expenseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const selectedDate = new Date(expenseData.date);

    if (selectedDate > currentDate) {
      toast.error("You cannot add an expense for a future date!");
      return;
    }
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await axios.post(`${apiUrl}/expenses`, expenseData, {
        withCredentials: true,
      });
      if (response.status === 201) {
        toast.success("Expense added successfully");
        setExpenseData({
          time: "",
          date: "",
          amount: "",
          category: "",
          note: "",
        });

        setShowModal(false);

        if (onExpenseAdded) {
          onExpenseAdded(response.data);
        } else {
          setTimeout(() => {
            navigate("/dashboard");
          }, 500);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Error adding expense!");
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" newestOnTop pauseOnHover />
      <div>
        <button
          className="position-fixed add-exp"
          onClick={() => setShowModal(true)}
        >
          <RiAddLargeFill />
        </button>
      </div>

      {showModal && (
        <>
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowModal(false)}
          ></div>

          <div
            className="modal fade show animate__animated animate__fadeInUp animate__faster"
            id="addModel"
            tabIndex="-1"
            aria-labelledby="addModelLabel"
            aria-hidden={!showModal}
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-fullscreen-lg-down">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addModelLabel">
                    Add Expense
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form id="expenseForm" onSubmit={handleSubmit}>
                    <div className="input-group flex-nowrap mb-2">
                      <span className="input-group-text">
                        <RiTimeLine />
                      </span>
                      <input
                        type="time"
                        name="time"
                        value={expenseData.time}
                        onChange={handleChange}
                        className="form-control"
                        aria-label="time"
                        required
                      />
                    </div>
                    <div className="input-group flex-nowrap mb-2">
                      <span className="input-group-text">
                        <RiCalendar2Line />
                      </span>
                      <input
                        type="date"
                        name="date"
                        value={expenseData.date}
                        onChange={handleChange}
                        className="form-control"
                        aria-label="date"
                        required
                      />
                    </div>
                    <div className="input-group flex-nowrap mb-2">
                      <span className="input-group-text">
                        <RiMoneyRupeeCircleLine />
                      </span>
                      <input
                        type="number"
                        name="amount"
                        value={expenseData.amount}
                        onChange={handleChange}
                        className="form-control"
                        min="1"
                        max="200"
                        aria-label="amount"
                        required
                      />
                    </div>
                    <div className="input-group flex-nowrap mb-2">
                      <span className="input-group-text">
                        <RiQuestionLine />
                      </span>
                      <select
                        name="category"
                        value={expenseData.category}
                        onChange={handleChange}
                        className="form-control custom-select rounded-1"
                        aria-label="category"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Personal">Personal</option>
                        <option value="MISC">Misc</option>
                      </select>
                    </div>
                    <div className="input-group flex-nowrap mb-4">
                      <span className="input-group-text">
                        <RiStickyNoteLine />
                      </span>
                      <textarea
                        name="note"
                        value={expenseData.note}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Add a Note"
                        aria-label="note"
                      ></textarea>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">
                        Add Expense
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddExpense;
