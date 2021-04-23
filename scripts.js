const memory = window.sessionStorage;

const HISTORIES_KEY = "histories";
const TYPE_KEY = "Sorting Type"
const TOTAL_ITERATIONS_KEY = "Total Iterations"
const ARRAY_LENGTH_KEY = "Array size"
const ARRAY_KEY = "Array"
const TIME_TAKEN_KEY = "Time taken"
const SPEED_KEY = "Animation Speed"

let container = document.getElementById("array");
let total_iterations_div = document.getElementById("total_iterations");
let time_taken_div = document.getElementById("time_taken");
let speed_div = document.getElementById('speed');
let sort_type_selector = document.getElementById("sort-type");
let histories_table = document.getElementById("hist-table");
let result_div = document.getElementsByClassName('output hide')

let start;
let timerControl;
let unsorted_array = [];
let total_iterations = 0;

// Used to reset input values if input exceeds the max an min value
function checkAndReset() {
    let max_val = document.getElementById('max')
    let size_val = document.getElementById('size')
    let speed_val = document.getElementById('speed')

    max_val.value = (!max_val.value) ? parseInt(max_val.min) : (parseInt(max_val.max) < parseInt(max_val.value)) ? parseInt(max_val.max) :
        (parseInt(max_val.min) > parseInt(max_val.value)) ? parseInt(max_val.min) : parseInt(max_val.value)
    size_val.value = (!size_val.value) ? parseInt(size_val.min) : (parseInt(size_val.max) < parseInt(size_val.value)) ? parseInt(size_val.max) :
        (parseInt(size_val.min) > parseInt(size_val.value)) ? parseInt(size_val.min) : parseInt(size_val.value)
    speed_val.value = (!speed_val.value) ? parseFloat(speed_val.min) : (parseFloat(speed_val.max) < parseFloat(speed_val.value)) ? parseFloat(speed_val.max) :
        (parseFloat(speed_val.min) > parseFloat(speed_val.value)) ? parseFloat(speed_val.min) : parseFloat(speed_val.value)
}

// Used to reset values UI values
function reset() {
    document.getElementsByClassName('output')[0].classList.add('hide');
    total_iterations_div.innerHTML = ""
    container.innerHTML = ""
    time_taken_div.innerHTML = ""
    stopTimer()
}

// Used to generate UI bar elements based on the generated array
function generate_blocks(value, i) {

    // Creating element div
    let array_ele = document.createElement("div");

    // Adding class 'block' to div
    array_ele.classList.add("block");

    // Adding style to div
    array_ele.style.height = `${value * 3}px`;
    array_ele.style.transform = `translate(${i * 30}px)`;

    // Creating label element for displaying
    // size of particular block
    let array_ele_label = document.createElement("label");
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
    for (let i = 0; i < size; i++) {
        let value = Math.ceil(Math.random() * max);
        unsorted_array.push(value);
        generate_blocks(value, i);
    }
}

// Used to reset the sorted array
function reset_sort() {
    reset();
    unsorted_array.forEach((element, index) => {
            generate_blocks(element, index)
        }
    );
}

// Used to output seconds value in the UI.
function output(number) {
    time_taken_div.innerHTML = number + " seconds";
}

// Used to Start the timer.
function startTimer() {
    start = Date.now();
    timerControl = setInterval(function () {
        let delta = Date.now() - start; // milliseconds elapsed since start
        output(delta / 1000); // in seconds
    }, 1); // update about every milli second
}

// Used to Stop the timer.
function stopTimer() {
    clearInterval(timerControl);
}

// Used to Clear history table
function clearHistories() {
    let histories = []
    memory.setItem(HISTORIES_KEY, histories)
    createHistoriesTable(histories)
}

// Used to Save history table
function saveHistory(type) {
    let histories = memory.getItem(HISTORIES_KEY)
    if (!histories) {
        histories = []
    } else {
        histories = JSON.parse(histories)
    }
    let history = {}
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

// Used to Create the history table
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
    let tr = histories_table.insertRow(-1);

    for (i = 0; i < cols.length; i++) {

        // Create the table header th element
        let threader = document.createElement("th");
        threader.innerHTML = cols[i];

        // Append columnName to the table row
        tr.appendChild(threader);
    }

    // Adding the data to the table
    for (i = 0; i < histories.length; i++) {

        // Create a new row
        trow = histories_table.insertRow(-1);
        for (let j = 0; j < cols.length; j++) {
            let cell = trow.insertCell(-1);

            // Inserting the cell at particular place
            cell.innerHTML = histories[i][cols[j]];
        }
    }
}

// Async function to swap two blocks
function swap(el1, el2, delay = 100) {
    return new Promise((resolve) => {

        window.requestAnimationFrame(function () {

            // For waiting for .25 sec
            setTimeout(() => {
                let temp1 = el1.style.height;
                let temp2 = el1.childNodes[0].innerText;
                el1.style.height = el2.style.height;
                el2.style.height = temp1;
                el1.childNodes[0].innerText = el2.childNodes[0].innerText;
                el2.childNodes[0].innerText = temp2;
                resolve();
            }, delay);
        });
    });
}

// Async function to create a delay while the functions are processing the UI
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

// Calling BubbleSort function
function sort() {
    let speed = 100 / speed_div.value
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
        case "selection_sort":
            SelectionSort(speed, saveHistory);
            break;
        case "quick_sort":
            QuickSort(false, speed, saveHistory);
            break;
        case "three_median_quick_sort":
            QuickSort(true, speed, saveHistory);
            break;
        case "merge_sort":
            MergeSort(speed, saveHistory);
            break;
        case "heap_sort":
            HeapSort(speed, saveHistory);
            break;
    }
}

function init() {
    generateArray(100, 40);
    let histories = memory.getItem(HISTORIES_KEY)
    if (!histories) {
        histories = []
    } else {
        histories = JSON.parse(histories)
    }
    createHistoriesTable(histories)
}

init()