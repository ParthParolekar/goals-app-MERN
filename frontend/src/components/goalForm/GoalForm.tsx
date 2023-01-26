import React, { useState } from "react";
import { useAppDispatch } from "../../app/store";
import { createGoal } from "../../features/goals/goalSlice";

const GoalForm = () => {
  const [text, setText] = useState<string>("");
  const dispatch = useAppDispatch();

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(createGoal({text}));
    setText("");
  };

  return (
    <section className="form">
      <form onSubmit={formSubmitHandler}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e: React.ChangeEvent) =>
              setText((e.target as HTMLInputElement).value)
            }
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add goal
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
