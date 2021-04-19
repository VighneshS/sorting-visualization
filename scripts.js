var container = document.getElementById("array");
var total_iterations_div = document.getElementById("total_iterations");
var time_taken_div = document.getElementById("time_taken");
var sort_type_selector = document.getElementById("sort-type");
var result_div = document.getElementsByClassName('output hide')
var start;
var timerControl;
var unsorted_array = [];
var total_iterations = 0;

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
    unsorted_array = [];
    document.getElementsByClassName('output')[0].classList.add('hide');
    total_iterations_div.innerHTML = ""
    container.innerHTML = ""
    time_taken_div.innerHTML = ""
    stopTimer()
}

// Function to generate the array of blocks
function generateArray(max, size) {
    reset();
    for (var i = 0; i < size; i++) {

        // Return a value from 1 to 100 (both inclusive)
        var value = Math.ceil(Math.random() * max);
        unsorted_array.push(value);

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
}

// Calling generatearray function
generateArray(100, 5);

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
function sort(delay = 100) {
    total_iterations = 0
    if (result_div.length > 0){
        result_div[0].classList.remove('hide');
    }
    switch (sort_type_selector.value) {
        case "bubble_sort":
            BubbleSort(delay);
            break;
        case "insertion_sort":
            InsertionSort(delay);
            break;
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