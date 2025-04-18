import React, { useState, useEffect } from "react";
import {
  RiCalendar2Line,
  RiMoneyRupeeCircleLine,
  RiQuestionLine,
  RiStickyNoteLine,
  RiTimeLine,
} from "@remixicon/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import {
  getExpenseById,
  updateExpense,
  getAvailableCategories,
} from "../../api/expenseApi";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const UpdateExpense = ({ id, onExpenseUpdated, showModal, setShowModal }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    time: "",
    date: "",
    amount: "",
    categoryId: "",
    description: "",
  });

  useEffect(() => {
    if (showModal) {
      fetchCategories();
      fetchExpenseData();
    }
  }, [showModal, id]);

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await getAvailableCategories(token);
      if (data.status) {
        setCategories(data.data);
      } else {
        toast.error("Failed to load categories");
      }
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  const fetchExpenseData = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await getExpenseById(id, token);
      if (data?.status) {
        setFormData({
          time: dayjs.utc(data.data.dateTime).local().format("HH:mm"),
          date: dayjs.utc(data.data.dateTime).local().format("YYYY-MM-DD"),
          amount: data.data.amount,
          categoryId: data.data.categoryId,
          description: data.data.description,
        });
      }
    } catch (error) {
      console.error("Error fetching expense:", error);
      toast.error("Failed to load expense data");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const payload = {
        amount: formData.amount,
        categoryId: formData.categoryId,
        description: formData.description,
        date: formData.date,
        time: formData.time,
      };

      const { data } = await updateExpense(id, payload, token);

      if (data?.status) {
        toast.success(data.message || "Expense Updated Successfully!");
        onExpenseUpdated();
        setShowModal(false);
      } else {
        toast.error(data?.message || "Error Updating Expense.");
      }
    } catch (error) {
      if (error.response?.data?.message?.includes("exceeds budget")) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response?.data?.message || "Something went wrong.");
      }
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const today = dayjs().format("YYYY-MM-DD");

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={() => setShowModal(false)}
      ></div>

      <div
        className="modal fade show animate__animated animate__fadeInUp animate__faster"
        id="editModel"
        tabIndex="-1"
        aria-labelledby="editModelLabel"
        aria-hidden={!showModal}
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-fullscreen-lg-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModelLabel">
                Edit Expense
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
                    value={formData.time}
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
                    value={formData.date}
                    onChange={handleChange}
                    className="form-control"
                    aria-label="date"
                    max={today}
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
                    value={formData.amount}
                    onChange={handleChange}
                    className="form-control"
                    aria-label="amount"
                    required
                  />
                </div>
                <div className="input-group flex-nowrap mb-2">
                  <span className="input-group-text">
                    <RiQuestionLine />
                  </span>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="form-control custom-select rounded-1"
                    aria-label="categoryId"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.categoryName}
                        </option>
                      ))
                    ) : (
                      <option value="">No Categories Found</option>
                    )}
                  </select>
                </div>
                <div className="input-group flex-nowrap mb-4">
                  <span className="input-group-text">
                    <RiStickyNoteLine />
                  </span>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Add a description"
                    aria-label="description"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Expense"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateExpense;
