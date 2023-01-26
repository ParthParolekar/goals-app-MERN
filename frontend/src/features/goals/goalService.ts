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

const goalService = {
  createGoal,
};

export default goalService;
