let nav = 0;
let clicked = null;

//convert shifts to shifts
let shifts = localStorage.getItem("shifts")
  ? JSON.parse(localStorage.getItem("shifts"))
  : [];
////////////////////////////
const calendar = document.getElementById("calendar");
const newEventModal = document.getElementById("newEventModal");
const deleteEventModal = document.getElementById("deleteEventModal");
const backDrop = document.getElementById("modalBackDrop");
const createNewShift = document.getElementById("createNewShift");
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function openModal(date) {
  clicked = date;
  // store boolean result of checking if day clicked has an event
  const eventForDay = shifts.find((e) => e.date === clicked);

  if (eventForDay) {
    document.getElementById("eventText").innerText = eventForDay.title;
    deleteEventModal.style.display = "block";
  } else {
    newEventModal.style.display = "block";
  }

  backDrop.style.display = "block";
}

function load() {
  //establish framework for date time
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
    "en-us",
    { month: "long" }
  )} ${year}`;

  calendar.innerHTML = "";

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      //Find shifts(shifts) for each day
      const eventForDay = shifts.find((e) => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = "currentDay";
      }
      // WHAT TO DO:  Add shifts when schedule.ejs is rendered through the use of EJS || input the functionality below?
      if (eventForDay) {
        // create divs inside of each day that has a shift
        const eventDiv = document.createElement("div"); // store div object
        eventDiv.classList.add("event"); //give div object a class of: event
        eventDiv.innerText = eventForDay.title; //set the content of the div equal to the day's event(shift) title
        daySquare.appendChild(eventDiv); // add the event(shift)div as a child to the corresponding day square
      }

      daySquare.addEventListener("click", () => openModal(dayString));
    } else {
      daySquare.classList.add("padding");
    }

    calendar.appendChild(daySquare);
  }
  document.getElementById("dateSelect").valueAsDate = new Date();
}

function closeModal() {
  createNewShift.classList.remove("error");
  newEventModal.style.display = "none";
  deleteEventModal.style.display = "none";
  backDrop.style.display = "none";
  createNewShift.value = "";
  clicked = null;
  load();
}

function saveShift() {
  if (createNewShift.value) {
    createNewShift.classList.remove("error");

    shifts.push({
      date: clicked,
      title: createNewShift.value,
    });

    localStorage.setItem("shifts", JSON.stringify(shifts));
    closeModal();
  } else {
    createNewShift.classList.add("error");
  }
}

function deleteEvent() {
  shifts = shifts.filter((e) => e.date !== clicked);
  localStorage.setItem("shifts", JSON.stringify(shifts));
  closeModal();
}

function initButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });

  document.getElementById("saveButton").addEventListener("click", saveShift);
  document.getElementById("cancelButton").addEventListener("click", closeModal);
  document
    .getElementById("deleteButton")
    .addEventListener("click", deleteEvent);
  document.getElementById("closeButton").addEventListener("click", closeModal);
}

initButtons();
load();
