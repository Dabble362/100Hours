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
      await Entries.create({
        entry: req.body.entry,
        date: req.body.date,
        title: req.body.title,
        mood: req.body.mood,
        userId: req.user.id,
      });
      console.log("A shift has been added!");
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  },
};
