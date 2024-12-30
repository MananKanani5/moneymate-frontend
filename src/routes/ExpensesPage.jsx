import React, { useEffect, useState } from "react";
import AfterNavbar from "../components/AfterNavbar";
import AddExpense from "../components/AddExpense";
import Loading from "../components/Loading";
import axios from "axios";
import ExpenseItem from "../components/ExpenseItem";
import EditExpense from "../components/EditExpense";

const ExpensesPage = () => {
  const [expense, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/expenses`, {
          withCredentials: true,
        });
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleEditExpense = (expenseData) => {
    setSelectedExpense(expenseData);
  };

  const handleExpenseUpdated = (updatedExpense) => {
    console.log("Expense Updated:", updatedExpense);
    setSelectedExpense(null);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <AfterNavbar />
      <AddExpense onExpenseAdded={() => setRefreshData((prev) => !prev)} />
      <div className="bg-primary mob-bg d-none"></div>
      <main className="main-content mb-4 animate__animated animate__fadeIn dash">
        <div className="d-none mob-block position-relative text-center text-white my-4">
          <h2>Expenses</h2>
        </div>
        <div className="grids mt-2">
          <div className="account widItem py-3 mob-pt-1 px-4 mob-mt-4 mob-px-3 z-3 card text-center">
            <h3 className="mt-2">Total Spent: ₹{expense.totalSpent}</h3>
          </div>
          <div className="account widItem pt-2 mob-pt-1 pb-2 px-4 mob-px-3 z-3 card-custom ">
            <div className="py-3">
              {expense.expenses.length > 0 ? (
                expense.expenses.map((expenseitem) => (
                  <ExpenseItem
                    key={expenseitem._id}
                    expenses={expenseitem}
                    onEdit={handleEditExpense}
                  />
                ))
              ) : (
                <p>There are no recent expenses.</p>
              )}
              {selectedExpense && (
                <EditExpense
                  initialData={selectedExpense}
                  onExpenseAdded={handleExpenseUpdated}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ExpensesPage;
