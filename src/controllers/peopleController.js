import User from "../models/User.js";

/**
 * GET /people
 * Fetches and returns a list of all users in the database.
 * @route GET /people
 * @access Public
 * */
const getPeople = async (req, res, next) => {
  try {
    let people = await User.find({}).lean();
    people = people.map((p) => ({ name: p.name }));
    res.json({
      success: true,
      data: people,
      message: "People fetched successfully",
    });
  } catch (err) {
    next(err);
  }
};

export default { getPeople };

