// Asynchronous BubbleSort function
async function QuickSort(delay = 100, callback) {
    startTimer();
    var blocks = document.querySelectorAll(".block");
    quickSort(blocks, 0, blocks.length - 1, delay).then(() => {
        stopTimer();
        callback("quick_sort");
    })
}

async function quickSort(columns, low, high, delay = 100) {
    if (low < high) {
        var pi = await partition(columns, low, high, delay)
        await quickSort(columns, low, pi - 1, delay);
        await quickSort(columns, pi + 1, high, delay);
    }
}

async function partition(columns, low, high, delay = 100) {
    var pivot = high;
    var i = low - 1;
    columns[high].style.backgroundColor = "red";
    for (j = low; j <= high - 1; j++) {
        columns[j].style.backgroundColor = "darkblue";
        incrementIterations();
        if (Number(columns[j].childNodes[0].innerHTML) < Number(columns[pivot].childNodes[0].innerHTML)) {
            await swap(columns[++i], columns[j], delay);
            columns = document.querySelectorAll(".block");
            if (i != j) {
                columns[j].style.backgroundColor = "grey";
            } else {
                columns[j].style.backgroundColor = "grey";
            }
        }
    }
    await swap(columns[++i], columns[pivot], delay);
    columns = document.querySelectorAll(".block");
    columns[high].style.backgroundColor = "pink";
    columns[i].style.backgroundColor = "green";
    for (var k = 0; k < columns.length; k++)
        columns[k].style.backgroundColor = "#13CE66";
    return i;
}