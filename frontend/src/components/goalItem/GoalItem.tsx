import React from "react";

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
  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-UK")}</div>
      <h2>{goal.text}</h2>
    </div>
  );
};

export default GoalItem;
