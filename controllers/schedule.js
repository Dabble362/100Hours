const Shift = require("../models/shift");

module.exports = {
  getSchedule: async (req, res) => {
    try {
      //grab shifts by the logged-in user's id
      const shifts = await Shift.find({ user: req.user.id });
      //render the page with logged-in user's shifts
      res.render("schedule.ejs", { shifts: shifts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createShift: async (req, res) => {
    try {
      await Shift.create({
        department: req.body.department,
        employee: req.body.employee,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        madeBy: req.body.madeBy,
        createdAt: req.body.createdAt,
        tradeable: req.body.tradeable,
        userId: req.user.id,
      });
      console.log("A shift has been added!");
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  },
};
