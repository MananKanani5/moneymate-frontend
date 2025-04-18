import React, { useEffect, useState } from "react";
import Loading from "../components/common/Loading";
import ExpenseItem from "../components/expense/ExpenseItem";
import { getAllExpenses } from "../api/expenseApi";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import AddExpense from "../components/expense/AddExpense";

const ExpensesPage = () => {
  const [expense, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchExpenses = async (e, isSearch = false) => {
    e?.preventDefault();
    if (isSearch) {
      setIsSearching(true);
    } else {
      setLoading(true);
    }
    try {
      if (formData.startDate > formData.endDate) {
        toast.error("Start date cannot be greater than end date");
        return;
      }

      const { data } = await getAllExpenses(
        token,
        currentPage,
        10,
        formData.startDate,
        formData.endDate
      );
      if (data.status) {
        setExpenses({
          totalAmount: data.data.totalAmount || { _sum: { amount: 0 } },
          data: data.data.data || [],
        });
        setTotalPages(data.data.totalPages || 1);
        if (e) toast.success(data.message || "Expenses fetched successfully");
      } else {
        toast.error(data.message || "Error fetching expenses");
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      if (isSearch) {
        setIsSearching(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [currentPage]);

  return (
    <>
      <AddExpense onExpenseAdded={fetchExpenses} />
      <div className="bg-primary mob-bg d-none"></div>
      <main className="main-content mb-4 animate__animated animate__fadeIn animate__fast dash">
        <div className="d-none mob-block position-relative text-center text-white my-4">
          <h2>Expenses</h2>
        </div>
        <div className="grids mt-2 mb-5">
          <div className="account widItem py-3 mob-pt-1 px-4 mob-mt-4 mob-px-3 z-3 card">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <h3 className="mt-2">
                Total Spent: ₹ {expense?.totalAmount?._sum?.amount || 0}
              </h3>

              <form
                onSubmit={fetchExpenses}
                className="dateRangeForm d-flex flex-column flex-md-row gap-3 align-items-md-end mt-2"
              >
                <div>
                  <label htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div>
                  <label htmlFor="startDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <button className="btn btn-primary" disabled={isSearching}>
                  {isSearching ? "Searching..." : "Search"}
                </button>
              </form>
            </div>
          </div>

          <div className="account widItem pt-2 mob-pt-1 pb-2 px-4 mob-px-3 z-3 card-custom ">
            <div className="my-3">
              {loading ? (
                <Loading />
              ) : expense?.data?.length > 0 ? (
                expense.data.map((expenseitem) => (
                  <ExpenseItem
                    key={expenseitem.id}
                    expense={expenseitem}
                    isExpense={true}
                    expenseId={expenseitem.id}
                  />
                ))
              ) : (
                <p>There are no expenses.</p>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center my-5">
              <button
                className="btn btn-primary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
              <span className="mx-3">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-primary"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ExpensesPage;
