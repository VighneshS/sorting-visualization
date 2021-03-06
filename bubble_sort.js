// Asynchronous BubbleSort function
async function BubbleSort(delay = 100, callback) {

    startTimer();
    var blocks = document.querySelectorAll(".block");

    // BubbleSort Algorithm
    for (var i = 0; i < blocks.length; i += 1) {
        incrementIterations();
        for (var j = 0; j < blocks.length - i - 1; j += 1) {
            incrementIterations();

            // To change background-color of the
            // blocks to be compared
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";

            // To wait for .1 sec
            await syncUIDelay(delay);

            var value1 = Number(blocks[j].childNodes[0].innerHTML);
            var value2 = Number(blocks[j + 1]
                .childNodes[0].innerHTML);

            // To compare value of two blocks
            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1], delay);
                blocks = document.querySelectorAll(".block");
            }

            // Changing the color to the previous one
            blocks[j].style.backgroundColor = "#6b5b95";
            blocks[j + 1].style.backgroundColor = "#6b5b95";
        }

        //changing the color of greatest element
        //found in the above traversal
        blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
    }
    stopTimer();
    callback("bubble_sort")
}