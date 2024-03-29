import axios from "axios";
import { GoalData } from "./goalSlice";

const API_URL = "/api/goals";

//Create new goal
const createGoal = async (goalData: GoalData, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};

//get all goals
const getGoals = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

//delete goal
const deleteGoal = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
};

export default goalService;
