// Current Date
let currentMoment = moment();
// Get Date info
let weekDayName = moment(currentMoment).format('dddd');
let dateInfo = moment(currentMoment).format('MMM DD, YYYY, h:mm:ss a');
let currentHour = moment(currentMoment).format("HH");

// Target elements on the page
let currentDay = document.querySelector('#currentDay');

currentDay.textContent = weekDayName + " " + dateInfo;

let hour0 = document.querySelector('#hour0')
let hour1 = document.querySelector('#hour1')
let hour2 = document.querySelector('#hour2')
let hour3 = document.querySelector('#hour3')
let hour4 = document.querySelector('#hour4')
let hour5 = document.querySelector('#hour5')
let hour6 = document.querySelector('#hour6')
let hour7 = document.querySelector('#hour7')
let hour8 = document.querySelector('#hour8')
// Create array to store recurring targets
let hourList = [hour0,hour1,hour2,hour3,hour4,hour5,hour6,hour7,hour8]
let arrayLength = hourList.length; 

var loadData = function(){
   saveData = JSON.parse(localStorage.getItem("saveData")); 
}

loadData();

if (!saveData) {
    saveData = [
    "Add Task Here",
    "Add Task Here",
    "Add Task Here",
    "Add Task Here",
    "Add Task Here",
    "Add Task Here",
    "Add Task Here",
    "Add Task Here",
    "Add Task Here"
    ];
  }


//functions go here VVV

//function to update the content list
let updateFunction = function(){

    saveData = JSON.parse(localStorage.getItem("saveData")); 

    currentMoment = moment();

    weekDayName = moment(currentMoment).format('dddd');
    dateInfo = moment(currentMoment).format('MMM DD, YYYY, h:mm:ss a');
    currentDay = document.querySelector('#currentDay');
    currentHour = moment(currentMoment).format("HH");

    currentDay.textContent = weekDayName + " " + dateInfo;

    for (let i = 0; i < arrayLength; i++){
        let targetEl = hourList[i];

        let targetText = targetEl.querySelector('p')

        targetText.textContent = saveData[i];

        if (i+9 == currentHour){
            targetEl.classList.add('present')
            targetEl.classList.remove('future')
            targetEl.classList.remove('past')
        } else {
            if (i+9 > currentHour){
                targetEl.classList.add('future')
                targetEl.classList.remove('present')
                targetEl.classList.remove('past')
            } else {
                targetEl.classList.add('past')
                targetEl.classList.remove('future')
                targetEl.classList.remove('present')
            }
        }
     }
  }

// Save function
var saveContent = function(){
    console.log('begin save');

    for (let i = 0; i < arrayLength; i++){
        let targetEl = hourList[i]

        let targetText = targetEl.querySelector(".todoActiveArea");

        saveData[i] = targetText.textContent
        console.log(saveData[i])
    }

    window.localStorage.setItem("saveData", JSON.stringify(saveData));
    
    //updateFunction();
}


//When you click on the content of a timeblock
$( ".todoSection" ).on( "click","p", function() {
     // get current text of p element
  var text = $(this)
  .text()
  .trim();

// replace p element with a new textarea
var textInput = $("<textarea>").addClass(".todoActiveArea").val(text);
$(this).replaceWith(textInput);

// auto focus new element
textInput.trigger("focus");
  });

  // editable field was un-focused
$(".todoSection").on("blur", "textarea", function() {
    // get current value of textarea
    var text = $(this).val();
  
    // recreate p element
    var taskP = $("<p>")
      .addClass("todoActiveArea")
      .text(text);
  
    // replace textarea with new content
    $(this).replaceWith(taskP);

    console.log('finished')
  });




//let resetBtn = document.querySelector('#resetBtn');

//resetBtn.addEventListener("click", updateFunction);

// Listen for save buttons
if (document.addEventListener) {
    document.addEventListener("click", handleClick, false);
}
else if (document.attachEvent) {
    document.attachEvent("onclick", handleClick);
}

function handleClick(event) {
    event = event || window.event;
    event.target = event.target || event.srcElement;

    var element = event.target;

    // Climb up the document tree from the target of the event
    while (element) {
        if (element.nodeName === "BUTTON" && /saveBtn/.test(element.className)) {
            // The user clicked on a <button> or clicked on an element inside a <button>
            // with a class name called "foo"
            saveContent(element);
            break;
        }
        element = element.parentNode;
    }
}




// run Update on page load
updateFunction();