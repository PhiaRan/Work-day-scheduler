function updateTime() {
    //updates current time
    let today = moment();
  $("#currentDay").text(today.format("dddd, MMMM Do YYYY, h:mm:ss a"));

    // For coloring the past, present, and future time blocks
    let now = moment().format("kk");
    for (let i = 0; i < scheduleElArray.length; i++) {
        scheduleElArray[i].removeClass("future past present");

        if (now > scheduleElArray[i].data("hour")) {
            scheduleElArray[i].addClass("past");

        } else if (now === scheduleElArray[i].attr("data-hour")) {
            scheduleElArray[i].addClass("present");

        } else {

            scheduleElArray[i].addClass("future");
        }
    }
}

// differant varibles for time slots
let saveBtn = $(".save-icon");
let containerEl = $(".container");
let schedule9 = $("#9AM");
let schedule10 = $("#10AM");
let schedule11 = $("#11AM");
let schedule12 = $("#12PM");
let schedule1 = $("#1PM");
let schedule2 = $("#2PM");
let schedule3 = $("#3PM");
let schedule4 = $("#4PM");
let schedule5 = $("#5PM");


//combines varibles into one array
const scheduleElArray = [ schedule9, schedule10, schedule11,schedule12, schedule1, schedule2, schedule3, schedule4, schedule5,];

//calls functions
renderLastRegistered();
updateTime();
setInterval(updateTime, 1000); 

// schedule saved in local storage
function renderLastRegistered() {
    for (let el of scheduleElArray) {
        el.val(localStorage.getItem("time block " + el.data("hour")));

    }
}


// function saving
function handleFormSubmit(event) {
    event.preventDefault();

    let btnClicked = $(event.currentTarget);

    let targetText = btnClicked.siblings("textarea");
 
    let targetTimeBlock = targetText.data("hour");

    localStorage.setItem("time block " +  targetTimeBlock, targetText.val());
}

saveBtn.on("click", handleFormSubmit);