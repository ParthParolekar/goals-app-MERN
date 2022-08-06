//@desc     Get goals
//@route    GET /api/goals
//@access   PRIVATE
const getGoals = (req, res) => {
  res.status(200).json({ message: "Get Goals" });
};

//@desc     Set goal
//@route    POST /api/goals
//@access   PRIVATE
const setGoal = (req, res) => {
  res.status(200).json({ message: "Set Goal" });
};

//@desc     Update goal
//@route    PUT /api/goals/:id
//@access   PRIVATE
const updateGoal = (req, res) => {
  res.status(200).json({ message: `Update Goal ${req.params.id}` });
};

//@desc     Delete goals
//@route    DELETE /api/goals/:id
//@access   PRIVATE
const deleteGoal = (req, res) => {
  res.status(200).json({ message: `Delete Goal ${req.params.id}` });
};

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
