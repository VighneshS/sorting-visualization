// Asynchronous BubbleSort function
async function InsertionSort(delay = 100, callback) {

    startTimer();
    var blocks = document.querySelectorAll(".block");

    // BubbleSort Algorithm
    for (var i = 1; i < blocks.length; ++i) {

        incrementIterations();
        var j = i - 1;
        var selectedElementHeight = blocks[i].style.height
        var selectedElementValue = Number(blocks[i].childNodes[0].innerHTML)

        blocks[i].style.backgroundColor = "darkblue";

        await syncUIDelay(delay);

        // To compare value of two blocks
        while (j >= 0 && (Number(blocks[j].childNodes[0].innerHTML) > selectedElementValue)) {
            incrementIterations();
            blocks[j].style.backgroundColor = "darkblue";
            blocks[j + 1].style.height = blocks[j].style.height;
            blocks[j + 1].childNodes[0].innerText = blocks[j].childNodes[0].innerText;
            --j;
            await syncUIDelay(delay);
            for (var k = i; k >= 0; k--) {
                blocks[k].style.backgroundColor = "#13CE66";
            }
        }
        blocks[j + 1].style.height = selectedElementHeight;
        blocks[j + 1].childNodes[0].innerHTML = selectedElementValue;
        blocks[j + 1].style.backgroundColor = "#13CE66";
        await syncUIDelay(delay);
    }
    stopTimer();
    callback("insertion_sort")
}