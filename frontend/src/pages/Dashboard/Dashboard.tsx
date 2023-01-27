import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../app/store";
import { GoalForm, GoalItem, Spinner } from "../../components";
import { getGoals, reset } from "../../features/goals/goalSlice";

type Goal = {
  _id: string;
  user: string;
  text: string;
  createdAt: string;
  updateAt: string;
  __v: number;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { goals, isError, isLoading, message } = useSelector(
    (state: RootState) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    if (user) {
      dispatch(getGoals());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome, {user && user.name}!</h1>
        <p>Goal Dashboard</p>
        <GoalForm />
        <section className="content">
          {goals.length > 0 ? (
            <div className="goals">
              {goals.map((goal: Goal) => {
                return <GoalItem key={goal._id} goal={goal} />;
              })}
            </div>
          ) : (
            <h3>You did not set any goals</h3>
          )}
        </section>
      </section>
    </>
  );
};

export default Dashboard;
