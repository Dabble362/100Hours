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
  createShift: async (req, res) => {
    try {
      await Entries.create({
        entry: req.body.entry,
        date: req.body.date,
        title: req.body.title,
        mood: req.body.mood,
        userId: req.user.id,
      });
      console.log("Entry has been added!");
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  },
};
