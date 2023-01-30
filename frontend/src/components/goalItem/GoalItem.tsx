import React from "react";
import { useAppDispatch } from "../../app/store";
import { deleteGoal } from "../../features/goals/goalSlice";
import { FaTrash } from "react-icons/fa";

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
      <div className="btn-container">
        <button onClick={() => dispatch(deleteGoal(goal._id))}>
          <FaTrash size={12} />
        </button>
        {/* <button onClick={() => dispatch(deleteGoal(goal._id))}>
          <FaTrash size={12} />
        </button> */}
      </div>
    </div>
  );
};

export default GoalItem;
