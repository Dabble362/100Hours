const Shift = require("../models/shift");

module.exports = {
  getSchedule: async (req, res) => {
    try {
      const shifts = await Shift.find({ user: req.user.id });
      res.render("schedule.ejs", { shifts: shifts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
