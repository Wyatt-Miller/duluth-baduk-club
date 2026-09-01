/* ==========================================================================
   Duluth Baduk Club — the only JavaScript on the site.

   Three small, independent jobs:
     1. Mobile menu ......... show/hide the nav on narrow screens
     2. Proverb of the day .. pick a Go proverb, with an "another one" button
     3. Next meeting ........ work out the next 1st/3rd Wednesday and show it

   Everything else on the page is plain HTML/CSS. If this file fails to load,
   the page still works — you just get the fallback text that's written into
   the HTML.
   ========================================================================== */


/* -- 1. MOBILE MENU ------------------------------------------------------- */

const menuButton = document.getElementById("nav-toggle");
const menu = document.getElementById("nav-menu");

menuButton.addEventListener("click", function () {
  // toggle() adds the class if missing, removes it if present, and returns
  // true when the class is now on. The CSS does the actual showing/hiding.
  const isOpen = menu.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", isOpen);
});

// Tapping any link in the menu closes it, so it isn't left covering the page.
menu.addEventListener("click", function (event) {
  if (event.target.tagName === "A") {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});


/* -- 2. GO PROVERB OF THE DAY ------------------------------------------- */

// Classic Go proverbs. Add or remove freely — nothing else needs changing.
const proverbs = [
  "Lose your first fifty games as quickly as possible.",
  "Play urgent points before big points.",
  "The enemy's key point is your key point.",
  "Make a fist before striking.",
  "Don't try to cut bamboo joints.",
  "A rich man should not pick quarrels.",
  "Sacrifice plums for peaches.",
  "Corner, then side, then centre.",
  "Hane at the head of two stones.",
  "There is death in the hane.",
  "When in doubt, tenuki.",
  "Even a moron connects against a peep.",
  "Ponnuki is worth thirty points.",
  "Don't follow proverbs blindly.",
  "If you have lost your fighting spirit, you have lost everything.",
  "Beware of going back to patch up.",
  "Play fast, lose fast.",
];

const proverbText = document.getElementById("proverb");
const proverbButton = document.getElementById("proverb-next");

// Which proverb is "today's"? Use the day of the year so it's the same all day
// for everyone, and moves along on its own each day.
function dayOfYear(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const millisPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((date - startOfYear) / millisPerDay);
}

// We keep an index and step it forward when the button is clicked.
let proverbIndex = dayOfYear(new Date()) % proverbs.length;

function showProverb() {
  proverbText.textContent = proverbs[proverbIndex];
}

proverbButton.addEventListener("click", function () {
  proverbIndex = (proverbIndex + 1) % proverbs.length;
  showProverb();
});

showProverb(); // set the starting proverb on page load


/* -- 3. NEXT MEETING DATE --------------------------------------------- */

// The club meets the 1st and 3rd Wednesday of each month.
// Plan: build the list of 1st/3rd Wednesdays for this month and next month,
// then return the earliest one that hasn't already passed.

const WEDNESDAY = 3; // Sun = 0, Mon = 1, ... Wed = 3

// The date of the Nth Wednesday of a given month (nth = 1 means the first).
function nthWednesday(year, month, nth) {
  const first = new Date(year, month, 1);
  const shiftToFirstWednesday = (WEDNESDAY - first.getDay() + 7) % 7;
  const dayOfMonth = 1 + shiftToFirstWednesday + (nth - 1) * 7;
  return new Date(year, month, dayOfMonth);
}

function nextClubMeeting(fromDate) {
  const candidates = [];

  // this month and next month, first and third Wednesday of each
  for (let monthOffset = 0; monthOffset <= 1; monthOffset++) {
    const year = fromDate.getFullYear();
    const month = fromDate.getMonth() + monthOffset;
    candidates.push(nthWednesday(year, month, 1));
    candidates.push(nthWednesday(year, month, 3));
  }

  // earliest candidate that is today or later
  return candidates
    .sort(function (a, b) { return a - b; })
    .find(function (date) { return date >= startOfDay(fromDate); });
}

// Strip the time part so "today" counts as not-yet-passed.
function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

const nextMeetingEl = document.getElementById("next-meeting");
const meeting = nextClubMeeting(new Date());

if (meeting) {
  nextMeetingEl.textContent = meeting.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
