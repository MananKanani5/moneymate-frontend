import React, { useEffect, useState, useContext } from "react";
import AfterNavbar from "../components/AfterNavbar";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import AddExpense from "../components/AddExpense";

import Entertainment from "../assets/categories/Entertainment.jpg";
import Food from "../assets/categories/Food.jpg";
import MISC from "../assets/categories/MISC.jpg";
import Personal from "../assets/categories/Personal.jpg";
import Transport from "../assets/categories/Transport.jpg";
import logo from "../assets/logo.svg";
import Loading from "../components/Loading";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";

const categoryColorMap = {
  Food: "#1f4e79",
  Transport: "#3a6ea5",
  Entertainment: "#5f9ea0",
  Personal: "#84ade3",
  MISC: "#bebebe",
};

const DashboardPage = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [refreshData, setRefreshData] = useState(false);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/api/dashboard", { withCredentials: true })
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((err) => {
        setError(
          err.response ? err.response.data.message : "Error fetching data"
        );
      });
  };

  useEffect(() => {
    fetchData();
  }, [refreshData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!dashboardData) {
    return <Loading />;
  }

  const categoryImages = {
    Entertainment,
    Food,
    MISC,
    Personal,
    Transport,
  };

  const curruntmonth = () => {
    const date = new Date();
    const options = { month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  return (
    <>
      <AfterNavbar />
      <AddExpense onExpenseAdded={() => setRefreshData((prev) => !prev)} />
      <div className="bg-primary mob-bg d-none"></div>
      <main className="main-content mb-4 animate__animated animate__fadeIn dash">
        <Link
          to={"/dashboard"}
          className="logo d-none mob-block position-relative mb-4 mt-3 text-center"
        >
          <img src={logo} className="img-fluid w-50" alt="logo" />
        </Link>

        <div className="d-flex justify-content-between">
          <h4 className="fw-bold mt-2 mb-4 hide-mob">
            Hello, <span>{user.username}</span>
          </h4>
          <h4 className="fw-bold mt-2 mb-4 hide-mob">
            <span>{curruntmonth()}</span>
          </h4>
        </div>

        <div className="grids">
          {/* Total Spent Amount */}
          <div className="card p-4 d-flex flex-row justify-content-between money widItem">
            <div className="left">
              <h2 className="fw-bold text-primary">
                ₹{dashboardData.totalSpentAmount}
              </h2>
              <h6>Spent</h6>
            </div>

            <div className="right">
              <h2 className="fw-bold text-primary text-end">₹6000</h2>
              <h6 className="text-end">Budget</h6>
            </div>
          </div>

          {/* Pie Chart (Expenses by Category) */}
          <div className="card p-4 pie widItem">
            <div className="d-flex justify-content-center align-items-center">
              {dashboardData.expensesByCategory &&
              dashboardData.expensesByCategory.length > 0 ? (
                <PieChart
                  data={dashboardData.expensesByCategory}
                  colors={categoryColorMap}
                />
              ) : (
                <p className="text-center">Add an expense to view the chart</p>
              )}
            </div>
          </div>

          {/* Recent Expenses */}
          <div className="card p-4 spend widItem">
            <h5 className="mb-4 fw-bold">Recent Expenses</h5>
            {dashboardData.lastThreeTransactions &&
            dashboardData.lastThreeTransactions.length > 0 ? (
              dashboardData.lastThreeTransactions.map((transaction, index) => {
                const categoryImage =
                  categoryImages[transaction.category] || MISC;
                return (
                  <div
                    key={index}
                    className="d-flex align-items-center w-100 mb-3"
                  >
                    <img
                      src={categoryImage}
                      className="rounded-2"
                      alt={transaction.category}
                      loading="lazy"
                    />
                    <div className="flex-grow-1 d-flex justify-content-between">
                      <div className="spending-details ms-2">
                        <h6 className="m-0">{transaction.category}</h6>
                        <p className="spending-date">{transaction.datetime}</p>
                      </div>
                      <p className="fw-medium">₹{transaction.amount}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No recent expenses.</p>
            )}
            <div className="text-end">
              <Link to="/expenses" className="text-primary fw-medium">
                See More
              </Link>
            </div>
          </div>

          {/* Weekly Expenses Section */}
          <div className="card p-4 chart widItem">
            <div className="d-flex justify-content-center align-items-center">
              {dashboardData.weeklyExpenses &&
              dashboardData.weeklyExpenses.length > 0 ? (
                <BarChart weeklyExpenses={dashboardData.weeklyExpenses} />
              ) : (
                <p className="text-center">
                  Add an expense to view the weekly expenses chart
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
