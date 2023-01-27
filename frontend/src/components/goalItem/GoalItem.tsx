import React from "react";
import { useAppDispatch } from "../../app/store";
import { deleteGoal } from "../../features/goals/goalSlice";

type Goal = {
  _id: string;
  user: string;
  text: string;
  createdAt: string;
  updateAt: string;
  __v: number;
};

type GoalItemProps = {
  goal: Goal;
};

const GoalItem = ({ goal }: GoalItemProps): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-UK")}</div>
      <h2>{goal.text}</h2>
      <button className="close" onClick={() => dispatch(deleteGoal(goal._id))}>
        X
      </button>
    </div>
  );
};

export default GoalItem;
