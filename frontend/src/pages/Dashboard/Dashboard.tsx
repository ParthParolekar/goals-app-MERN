import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { GoalForm } from "../../components";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <>
      <section className="heading">
        <h1>Welcome, {user && user.name}!</h1>
        <p>Goal Dashboard</p>
        <GoalForm />
      </section>
    </>
  );
};

export default Dashboard;
