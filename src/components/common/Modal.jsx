import React, { useEffect, useState } from "react";
import { setBudget } from "../../api/budgetApi";
import { toast } from "react-toastify";

const Modal = ({ showModal, setShowModal, fetchData, token }) => {
  const [newBudget, setNewBudget] = useState("");

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const handleSubmit = async () => {
    try {
      await setBudget({ amount: newBudget }, token);
      toast.success("Budget set successfully");
      fetchData();
      setShowModal(false);
    } catch (error) {
      toast.error(error.response.data.message || "Error setting budget");
      console.error("Error setting budget:", error);
    }
  };

  if (!showModal) return null;

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={() => setShowModal(false)}
      ></div>

      <div
        className="modal fade show animate__animated animate__fadeInUp animate__faster"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-fullscreen-lg-down">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Set Budget</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="number"
                className="form-control"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                placeholder="Enter new budget"
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
