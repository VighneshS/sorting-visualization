var container = document.getElementById("array");
var total_iterations_div = document.getElementById("total_iterations");
var time_taken_div = document.getElementById("time_taken");
var start;
var timerControl;

function checkAndReset() {
    var max_val = document.getElementById('max')
    var size_val = document.getElementById('size')
    var speed_val = document.getElementById('speed')

    max_val.value = (!max_val.value) ? parseInt(max_val.min) : (parseInt(max_val.max) < parseInt(max_val.value)) ? parseInt(max_val.max) :
        (parseInt(max_val.min) > parseInt(max_val.value)) ? parseInt(max_val.min) : parseInt(max_val.value)
    size_val.value = (!size_val.value) ? parseInt(size_val.min) : (parseInt(size_val.max) < parseInt(size_val.value)) ? parseInt(size_val.max) :
        (parseInt(size_val.min) > parseInt(size_val.value)) ? parseInt(size_val.min) : parseInt(size_val.value)
    speed_val.value = (!speed_val.value) ? parseInt(speed_val.min) : (parseInt(speed_val.max) < parseInt(speed_val.value)) ? parseInt(speed_val.max) :
        (parseInt(speed_val.min) > parseInt(speed_val.value)) ? parseInt(speed_val.min) : parseInt(speed_val.value)
}


function reset() {
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
generateArray(10, 5);

function output(number) {
    time_taken_div.innerHTML = number + " seconds";
}

function startTimer(){
    start = Date.now();
    timerControl = setInterval(function() {
        var delta = Date.now() - start; // milliseconds elapsed since start
        output(delta / 1000); // in seconds
    }, 1); // update about every milli second
}

function stopTimer() {
    clearInterval(timerControl);
}

// Calling BubbleSort function
function sort(delay = 100) {
    document.getElementsByClassName('output hide')[0].classList.remove('hide');
    BubbleSort(delay);
}