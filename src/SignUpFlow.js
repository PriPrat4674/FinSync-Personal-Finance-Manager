import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function SignUpFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    emailID: "",
    password: "",
    monthlyIncome: "",
    financialGoals: [],
    budgetAllocation: [],
  });

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => Math.max(1, prevStep - 1));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: checked
        ? [...prevData[name], value]
        : (prevData[name] || []).filter((item) => item !== value),
    }));
  };
  const handleSubmit = () => {
    navigate("/Dashboard");
  };
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h3 className="mb-4">Sign Up</h3>
        {step === 1 && (
          <div className="d-flex justify-content-center align-items-center">
            <div
              className="card p-4 shadow-sm w-100"
              style={{ maxWidth: "400px" }}
            >
              <form>
                <div class="form-group mb-4">
                  <label>Full Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>
                <div class="form-group mb-4">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="emailID"
                    class="form-control"
                    value={formData.emailID}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                  />
                </div>
                <div class="form-group mb-4">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    class="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                  />
                </div>
              </form>
            </div>
          </div>
        )}
        {step === 2 && (
          <Form.Group className="mb-3">
            <Form.Label>Monthly Income</Form.Label>
            <Form.Control
              type="text"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              placeholder="Enter your monthly income"
            ></Form.Control>
          </Form.Group>
        )}
        {step === 3 && (
          <Form.Group className="mb-3">
            <Form.Label>Financial Goals</Form.Label>
            {["Savings", "Investments"].map((goal) => (
              <Form.Check
                key={goal}
                type="checkbox"
                label={goal}
                value={goal}
                name="financialGoals"
                checked={formData.financialGoals.includes(goal)}
                onChange={handleCheckboxChange}
              />
            ))}
          </Form.Group>
        )}
        {step === 4 && (
          <Form.Group className="mb-3">
            <Form.Label>Budget Allocations</Form.Label>
            {[
              "Groceries",
              "Vehicle - Maintenance",
              "Vehicle - Fuel",
              "Electricity Bills",
              "Recharge Bills",
            ].map((goal) => (
              <Form.Check
                key={goal}
                type="checkbox"
                label={goal}
                value={goal}
                name="budgetAllocation"
                checked={formData.budgetAllocation.includes(goal)}
                onChange={handleCheckboxChange}
              />
            ))}
          </Form.Group>
        )}
        <div className="d-flex justify-content-between">
          {step > 1 && (
            <Button variant="secondary" onClick={handlePrev}>
              Back
            </Button>
          )}
          {step < 4 ? (
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="success" onClick={handleSubmit}>
              Finish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUpFlow;
