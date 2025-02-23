import React, { useEffect, useRef, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useLocation } from "react-router-dom";
import { Dropdown } from "bootstrap";
import { Link } from "react-router-dom";
import UserToasts, { showToast } from "./UserToasts";
import searchImage from "./search-1.jpg";
import searchImage2 from "./search-2.jpg";
import searchImage3 from "./search-3.jpg";
import searchImage4 from "./search-4.jpg";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function Dashboard() {
  const location = useLocation();
  const name = location.state?.name || location.state?.email;

  useEffect(() => {
    if (name) {
      showToast(`Welcome, ${name}! 🎉`, "info", {
        autoClose: 3000,
      });
    }
  }, [name]);

  const dropdownRef = useRef(null);
  const today = new Date();
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showIncomeTable, setShowIncomeTable] = useState(false);
  const [incomeSource, setincomeSource] = useState("");
  const [incomeAmount, setincomeAmount] = useState("");
  const [incomeDetail, setIncomeDetail] = useState([]);

  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showExpenseTable, setShowExpenseTable] = useState(false);
  const [expenseSource, setExpenseSource] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDetail, setExpenseDetail] = useState([]);

  const [monthChart, setMonthChart] = useState(false);
  const [dayChart, setDayChart] = useState(false);

  useEffect(() => {
    if (dropdownRef.current) {
      new Dropdown(dropdownRef.current);
    }
  }, []);

  //Setting data for Chart
  const [incomeChartData, setIncomeChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Monthly Income",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  });

  useEffect(() => {
    if (incomeDetail.length > 0) {
      updateIncomeChart();
    }
  }, [incomeDetail]);

  const toggleDropdown = () => {
    const dropdown = new Dropdown(dropdownRef.current);
    dropdown.toggle();
  };

  const toggleIncomeForm = (e) => {
    e.preventDefault();
    setShowIncomeForm((prev) => !prev); //Setting visibility
  };

  const toggleIncomeTable = (e) => {
    e.preventDefault();
    setShowIncomeTable((prev) => !prev); //Setting visibility
  };

  const getIncomeDetails = (e) => {
    e.preventDefault();

    if (incomeSource !== "" && incomeAmount !== "") {
      const newIncome = { incomeSource, incomeAmount: parseInt(incomeAmount) };

      setIncomeDetail((prevIncome) => [...prevIncome, newIncome]);

      setincomeSource("");
      setincomeAmount("");

      setShowIncomeForm(false);
    }
  };

  const updateIncomeChart = () => {
    const monthlyIncome = {};

    incomeDetail.forEach((income) => {
      if (monthlyIncome[income.incomeSource]) {
        monthlyIncome[income.incomeSource] += income.incomeAmount;
      } else {
        monthlyIncome[income.incomeSource] = income.incomeAmount;
      }
    });

    setIncomeChartData({
      labels: Object.keys(monthlyIncome),
      datasets: [
        {
          label: "Monthly Income",
          data: Object.values(monthlyIncome),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    });
    setMonthChart(true);
  };

  const updateIncomeDetails = (index, field, value) => {
    setIncomeDetail((prevIncome) =>
      prevIncome.map((income, i) =>
        i === index ? { ...income, [field]: value } : income
      )
    );
  };

  //Expense Setting
  //Setting data for Chart
  const [expenseChartData, setExpenseChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Daily Expense",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  });

  useEffect(() => {
    if (expenseDetail.length > 0) {
      updateExpenseChart();
    }
  }, [expenseDetail]);

  const toggleExpenseForm = (e) => {
    e.preventDefault();
    setShowExpenseForm((prev) => !prev); //Setting visibility
  };

  const toggleExpenseTable = (e) => {
    e.preventDefault();
    setShowExpenseTable((prev) => !prev); //Setting visibility
  };

  const getExpenseDetails = (e) => {
    e.preventDefault();

    if (expenseSource !== "" && expenseAmount !== "") {
      const newExpense = {
        expenseSource,
        expenseAmount: parseInt(expenseAmount),
      };

      setExpenseDetail((prevExpense) => [...prevExpense, newExpense]);

      setExpenseSource("");
      setExpenseAmount("");

      setShowExpenseForm(false);
    }
  };

  const updateExpenseChart = () => {
    const monthlyExpense = {};

    expenseDetail.forEach((expense) => {
      if (monthlyExpense[expense.expenseSource]) {
        monthlyExpense[expense.expenseSource] += expense.expenseAmount;
      } else {
        monthlyExpense[expense.expenseSource] = expense.expenseAmount;
      }
    });

    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
    ];

    setExpenseChartData({
      labels: Object.keys(monthlyExpense),
      datasets: [
        {
          label: "Expense Distribution",
          data: Object.values(monthlyExpense),
          backgroundColor: colors.slice(0, Object.keys(monthlyExpense).length),
        },
      ],
    });
    setDayChart(true);
  };

  const updateExpenseDetails = (index, field, value) => {
    setExpenseDetail((prevExpense) =>
      prevExpense.map((expense, i) =>
        i === index ? { ...expense, [field]: value } : expense
      )
    );
  };
  return (
    <>
      <UserToasts />
      <div>
        <header style={{ backgroundColor: "#112D4E", color: "#FFFFFF" }}>
          <nav className="navbar navbar-expand-lg navbar-dark justify-content-center">
            <div>
              <ul className="navbar-nav" style={{ backgroundColor: "#112D4E" }}>
                <li className="nav-item">
                  <Link
                    className="nav-link m-1"
                    to=""
                    style={{
                      color: "#FFFFFF",
                    }}
                    onClick={(e) => e.preventDefault()}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item m-1">
                  <Link
                    className="nav-link"
                    onClick={toggleIncomeForm}
                    style={{ color: "#FFFFFF" }}
                  >
                    Income Source Set Up
                  </Link>
                </li>
                <li className="nav-item m-1">
                  <Link
                    className="nav-link"
                    onClick={toggleExpenseForm}
                    style={{ color: "#FFFFFF" }}
                  >
                    Expense Account Set Up
                  </Link>
                </li>
                <li className="nav-item m-1">
                  <Link
                    className="nav-link"
                    onClick={toggleIncomeTable}
                    style={{ color: "#FFFFFF" }}
                  >
                    Update Income
                  </Link>
                </li>
                <li className="nav-item m-1">
                  <Link
                    className="nav-link"
                    onClick={toggleExpenseTable}
                    style={{ color: "#FFFFFF" }}
                  >
                    Update Expense
                  </Link>
                </li>
                <li className="nav-item m-1">
                  <Link
                    className="nav-link"
                    to="#"
                    style={{ color: "#FFFFFF" }}
                  >
                    Update Reference
                  </Link>
                </li>
                <div className="d-flex">
                  <div className="dropdown">
                    <button
                      ref={dropdownRef}
                      className="btn pt-2 nav-item mt-1 text-white dropdown-toggle"
                      type="button"
                      id="userDropdown"
                      data-bs-toggle="dropdown"
                      onClick={toggleDropdown}
                      aria-expanded="false"
                    >
                      {name}
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="userDropdown"
                    >
                      <li>
                        <a className="dropdown-item" href="/">
                          Profile
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          Change Password
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/Login">
                          Sign Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </ul>
            </div>
          </nav>
        </header>
      </div>

      {showIncomeForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="text-center">Income Source Set Up</h3>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter your monthly income source"
              value={incomeSource}
              id="incomeSource"
              onChange={(e) => setincomeSource(e.target.value)}
              required
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter your monthly income amount"
              value={incomeAmount}
              id="incomeAmount"
              onChange={(e) => setincomeAmount(e.target.value)}
              required
            />
            <div className="text-center mt-4">
              <button
                className="btn btn-success me-2"
                onClick={getIncomeDetails}
              >
                Save
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setShowIncomeForm(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showIncomeTable && (
        <div className="modal-overlay">
          <div>
            <h3 className="text-center">Update Income</h3>
            <table className="table">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Income Source</th>
                <th className="p-2">Reference</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Remarks</th>
              </tr>
              {incomeDetail?.map((income, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="date"
                      value={today.toISOString().split("T")[0]}
                      className="form-control mt-3"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={income.incomeSource || ""}
                      className="form-control mt-3"
                      onChange={(e) =>
                        updateIncomeDetails(
                          index,
                          "incomeSource",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={income.incomeSource}
                      className="form-control mt-3"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id="incomeAmount"
                      value={income.incomeAmount}
                      className="form-control mt-3"
                      required
                      onChange={(e) =>
                        updateIncomeDetails(
                          index,
                          "incomeAmount",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control mt-3"
                      placeholder="Add remarks"
                      required
                    />
                  </td>
                </tr>
              ))}
            </table>

            <div className="text-center mt-4">
              <button
                className="btn btn-success me-2"
                onClick={() => showToast("Income Updated!", "success")}
              >
                Save
              </button>
              <button className="btn btn-danger" onClick={toggleIncomeTable}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Managing Expense */}
      {showExpenseForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="text-center">Expense Source Set Up</h3>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter your monthly expense category"
              value={expenseSource}
              id="expenseSource"
              onChange={(e) => setExpenseSource(e.target.value)}
              required
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter your monthly expense amount"
              value={expenseAmount}
              id="expenseAmount"
              onChange={(e) => setExpenseAmount(e.target.value)}
              required
            />
            <div className="text-center mt-4">
              <button
                className="btn btn-success me-2"
                onClick={getExpenseDetails}
              >
                Save
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setShowExpenseForm(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showExpenseTable && (
        <div className="modal-overlay">
          <div>
            <h3 className="text-center">Update Expense</h3>
            <table className="table">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Expense Source</th>
                <th className="p-2">Reference</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Remarks</th>
              </tr>
              {expenseDetail?.map((expense, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="date"
                      value={today.toISOString().split("T")[0]}
                      className="form-control mt-3"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={expense.expenseSource || ""}
                      className="form-control mt-3"
                      onChange={(e) =>
                        updateExpenseDetails(
                          index,
                          "expenseSource",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={expense.expenseSource}
                      className="form-control mt-3"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id="expenseAmount"
                      value={expense.expenseAmount}
                      className="form-control mt-3"
                      requiredonChange={(e) =>
                        updateExpenseDetails(
                          index,
                          "expenseAmount",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control mt-3"
                      placeholder="Add remarks"
                      required
                    />
                  </td>
                </tr>
              ))}
            </table>

            <div className="text-center mt-4">
              <button
                className="btn btn-success me-2"
                onClick={() => showToast("Expense Updated!", "success")}
              >
                Save
              </button>
              <button className="btn btn-danger" onClick={toggleExpenseTable}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 p-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <h4 className="card-title">Day Wise Expense</h4>
                <img src={searchImage} className="img-fluid w-50" alt="" />
              </div>
            </div>
          </div>
          <div className="col-md-5 p-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <h4 className="card-title">Month Wise Income Trend</h4>
                {monthChart ? (
                  <Bar data={incomeChartData} />
                ) : (
                  <img src={searchImage2} className="img-fluid w-50" alt="" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-5 p-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <h4 className="card-title">Income v/s Expense</h4>
                <img src={searchImage3} className="img-fluid w-50" alt="" />
              </div>
            </div>
          </div>
          <div className="col-md-5 p-4">
            <div className="card h-100 text-center">
              <div className="card-body">
                <h4 className="card-title">Category Wise Expense</h4>
                <img src={searchImage4} className="img-fluid w-50" alt="" />
                {/* {dayChart ? (
                  <Pie data={expenseChartData} />
                ) : (
                  <img src={searchImage4} className="img-fluid w-50" alt="" />
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
            .modal-overlay {
            position: fixed;
            top:0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgb(248, 242, 222, 0.5);
            display: flex;
            align-items: center;
            justify-content:center;
            backdrop-filter: blur(5px);
            z-index: 1000;
            }

            .modal-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            width: 350px;
            text-align: center;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            border: 2px solid #112D4E;
            }
            `}
      </style>
    </>
  );
}

export default Dashboard;
