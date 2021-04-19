const HISTORIES_KEY = "histories";
const TYPE_KEY = "Sorting Type"
const TOTAL_ITERATIONS_KEY = "Total Iterations"
const ARRAY_LENGTH_KEY = "Array size"
const ARRAY_KEY = "Array"
const TIME_TAKEN_KEY = "Time taken"
const SPEED_KEY = "Animation Speed"

var container = document.getElementById("array");
var total_iterations_div = document.getElementById("total_iterations");
var time_taken_div = document.getElementById("time_taken");
var speed_div = document.getElementById('speed');
var sort_type_selector = document.getElementById("sort-type");
var histories_table = document.getElementById("hist-table");
var result_div = document.getElementsByClassName('output hide')

var start;
var timerControl;
var unsorted_array = [];
var total_iterations = 0;
var memory = window.sessionStorage;

function checkAndReset() {
    var max_val = document.getElementById('max')
    var size_val = document.getElementById('size')
    var speed_val = document.getElementById('speed')

    max_val.value = (!max_val.value) ? parseInt(max_val.min) : (parseInt(max_val.max) < parseInt(max_val.value)) ? parseInt(max_val.max) :
        (parseInt(max_val.min) > parseInt(max_val.value)) ? parseInt(max_val.min) : parseInt(max_val.value)
    size_val.value = (!size_val.value) ? parseInt(size_val.min) : (parseInt(size_val.max) < parseInt(size_val.value)) ? parseInt(size_val.max) :
        (parseInt(size_val.min) > parseInt(size_val.value)) ? parseInt(size_val.min) : parseInt(size_val.value)
    speed_val.value = (!speed_val.value) ? parseFloat(speed_val.min) : (parseFloat(speed_val.max) < parseFloat(speed_val.value)) ? parseFloat(speed_val.max) :
        (parseFloat(speed_val.min) > parseFloat(speed_val.value)) ? parseFloat(speed_val.min) : parseFloat(speed_val.value)
}


function reset() {
    document.getElementsByClassName('output')[0].classList.add('hide');
    total_iterations_div.innerHTML = ""
    container.innerHTML = ""
    time_taken_div.innerHTML = ""
    stopTimer()
}

function generate_blocks(value, i) {

    // Creating element div
    var array_ele = document.createElement("div");

    // Adding class 'block' to div
    array_ele.classList.add("block");

    // Adding style to div
    array_ele.style.height = `${value * 3}px`;
    array_ele.style.transform = `translate(${i * 30}px)`;

    // Creating label element for displaying
    // size of particular block
    var array_ele_label = document.createElement("label");
    array_ele_label.classList.add("block_id");
    array_ele_label.innerText = value;

    // Appending created elements to index.html
    array_ele.appendChild(array_ele_label);
    container.appendChild(array_ele);
}

// Function to generate the array of blocks
function generateArray(max, size) {
    unsorted_array = [];
    reset();
    for (var i = 0; i < size; i++) {
        var value = Math.ceil(Math.random() * max);
        unsorted_array.push(value);
        generate_blocks(value, i);
    }
}

function reset_sort() {
    reset();
    unsorted_array.forEach((element, index) => {
            generate_blocks(element, index)
        }
    );
}

function output(number) {
    time_taken_div.innerHTML = number + " seconds";
}

function startTimer() {
    start = Date.now();
    timerControl = setInterval(function () {
        var delta = Date.now() - start; // milliseconds elapsed since start
        output(delta / 1000); // in seconds
    }, 1); // update about every milli second
}

function stopTimer() {
    clearInterval(timerControl);
}

// Calling BubbleSort function
function sort() {
    var speed  = 100/speed_div.value
    total_iterations = 0
    if (result_div.length > 0) {
        result_div[0].classList.remove('hide');
    }
    switch (sort_type_selector.value) {
        case "bubble_sort":
            BubbleSort(speed, saveHistory);
            break;
        case "insertion_sort":
            InsertionSort(speed, saveHistory);
            break;
    }
}

function clearHistories() {
    var histories = []
    memory.setItem(HISTORIES_KEY, histories)
    createHistoriesTable(histories)
}

function saveHistory(type) {
    var histories = memory.getItem(HISTORIES_KEY)
    if (!histories) {
        histories = []
    } else {
        histories = JSON.parse(histories)
    }
    var history = {}
    history[TYPE_KEY] = type
    history[TIME_TAKEN_KEY] = time_taken_div.innerHTML
    history[TOTAL_ITERATIONS_KEY] = total_iterations_div.innerHTML
    history[ARRAY_LENGTH_KEY] = unsorted_array.length
    history[SPEED_KEY] = speed_div.value
    history[ARRAY_KEY] = unsorted_array
    histories.push(history);
    memory.setItem(HISTORIES_KEY, JSON.stringify(histories))
    createHistoriesTable(histories)
}

function createHistoriesTable(histories) {
    histories_table.innerHTML = ""
    var cols = [];

    for (var i = 0; i < histories.length; i++) {
        for (var k in histories[i]) {
            if (cols.indexOf(k) === -1) {

                // Push all keys to the array
                cols.push(k);
            }
        }
    }

    // Create table row tr element of a table
    var tr = histories_table.insertRow(-1);

    for (var i = 0; i < cols.length; i++) {

        // Create the table header th element
        var theader = document.createElement("th");
        theader.innerHTML = cols[i];

        // Append columnName to the table row
        tr.appendChild(theader);
    }

    // Adding the data to the table
    for (var i = 0; i < histories.length; i++) {

        // Create a new row
        trow = histories_table.insertRow(-1);
        for (var j = 0; j < cols.length; j++) {
            var cell = trow.insertCell(-1);

            // Inserting the cell at particular place
            cell.innerHTML = histories[i][cols[j]];
        }
    }
}

// Promise to swap two blocks
function swap(el1, el2, delay = 100) {
    return new Promise((resolve) => {

        // For exchanging styles of two blocks
        var temp = el1.style.transform;
        el1.style.transform = el2.style.transform;
        el2.style.transform = temp;

        window.requestAnimationFrame(function () {

            // For waiting for .25 sec
            setTimeout(() => {
                container.insertBefore(el2, el1);
                resolve();
            }, delay);
        });
    });
}

async function syncUIDelay(delay) {
    await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, delay)
    );
}

function incrementIterations() {
    total_iterations_div.innerHTML = total_iterations++
}

function init() {
    generateArray(100, 5);
    var histories = memory.getItem(HISTORIES_KEY)
    if (!histories) {
        histories = []
    } else {
        histories = JSON.parse(histories)
    }
    createHistoriesTable(histories)
}

init()