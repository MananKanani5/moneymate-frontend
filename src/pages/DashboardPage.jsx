import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import Loading from "../components/common/Loading";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import BudgetOverview from "../components/Dashboard/BudgetOverview";
import CategoryChart from "../components/Dashboard/CategoryChart";
import RecentExpenses from "../components/Dashboard/RecentExpenses";
import WeeklyChart from "../components/Dashboard/WeeklyChart";
import { getDashboardData } from "../api/expenseApi";
import { AuthContext } from "../context/AuthContext";
import AddExpense from "../components/expense/AddExpense";
dayjs.extend(utc);
dayjs.extend(timezone);

const DashboardPage = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await getDashboardData(localStorage.getItem("token"));
      setDashboardData(data?.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <AddExpense onExpenseAdded={fetchData} />
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
            Hello, {user.firstName}
            <span></span>
          </h4>
          <h4 className="fw-bold mt-2 mb-4 hide-mob">
            <span>{dayjs().format("MMMM YYYY")}</span>
          </h4>
        </div>

        <div className="grids">
          <BudgetOverview budgetOverview={dashboardData} />
          <CategoryChart categoryChart={dashboardData.categoryData} />
          <RecentExpenses RecentExpenses={dashboardData.lastTransactions} />
          <WeeklyChart WeeklyChart={dashboardData.weeklySummary} />
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
