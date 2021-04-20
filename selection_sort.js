// Asynchronous BubbleSort function
async function SelectionSort(delay = 100, callback) {

    startTimer();
    var blocks = document.querySelectorAll(".block");

    // BubbleSort Algorithm
    for (var i = 0; i < blocks.length; ++i) {

        incrementIterations();
        var minimumElementIndex = i

        blocks[minimumElementIndex].style.backgroundColor = "yellow";

        await syncUIDelay(delay);
        for (var j = i + 1; j < blocks.length; ++j) {
            incrementIterations();
            blocks[j].style.backgroundColor = "darkblue";
            await syncUIDelay(delay)
            if (Number(blocks[j].childNodes[0].innerHTML) < Number(blocks[minimumElementIndex].childNodes[0].innerHTML)) {
                blocks[minimumElementIndex].style.backgroundColor = "#6b5b95";
                blocks[j].style.backgroundColor = "yellow";
                minimumElementIndex = j
            } else {
                blocks[j].style.backgroundColor = "#6b5b95";
            }
        }
        await swap(blocks[i], blocks[minimumElementIndex], delay);
        blocks = document.querySelectorAll(".block");
        blocks[minimumElementIndex].style.backgroundColor = "#6b5b95"
        blocks[i].style.backgroundColor = "#13CE66"

    }
    stopTimer();
    callback("selection_sort")
}