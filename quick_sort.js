// Asynchronous BubbleSort function
async function QuickSort(isThreeMedian, delay = 100, callback) {
    const blocks = document.querySelectorAll(".block");
    if (!isThreeMedian) {
        startTimer();
        quickSort(blocks, 0, blocks.length - 1, delay).then(() => {
            stopTimer();
            callback("quick_sort");
        })
    } else {
        threeMedianQuickSort(blocks, 0, blocks.length - 1, delay).then(() => {
            stopTimer();
            callback("three_median_quick_sort");
        })
    }
}

async function quickSort(columns, low, high, delay = 100) {
    if (low < high) {
        const pi = await partition(columns, low, high, delay);
        await quickSort(columns, low, pi - 1, delay);
        await quickSort(columns, pi + 1, high, delay);
    }
}

async function partition(columns, low, high, delay = 100) {
    const pivot = high;
    let i = low - 1;
    columns[high].style.backgroundColor = "red";
    for (let j = low; j <= high - 1; ++j) {
        columns[j].style.backgroundColor = "darkblue";
        incrementIterations();
        if (Number(columns[j].childNodes[0].innerHTML) < Number(columns[pivot].childNodes[0].innerHTML)) {
            await swap(columns[++i], columns[j], delay);
            columns = document.querySelectorAll(".block");
            if (i !== j) {
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
    for (let k = 0; k < columns.length; k++)
        columns[k].style.backgroundColor = "#13CE66";
    return i;
}

async function threeMedianQuickSort(columns, low, high, delay = 100) {
    if (low >= high)
        return;

    await medianPivot(columns, low, high, delay)

    if (low < high) {
        startTimer();
        await quickSort(columns, low, high, delay);
    }
}

async function medianPivot(columns, low, high, delay = 100) {
    const mid = Math.floor(high / 2);

    const sortingArr = [Number(columns[low].childNodes[0].innerHTML), Number(columns[mid].childNodes[0].innerHTML), Number(columns[high].childNodes[0].innerHTML)];

    sortingArr.sort(function (a, b) {
        return a - b;
    });

    const middleValue = sortingArr[1];

    // swap with the last to serve as pivot
    if (middleValue === Number(columns[low].childNodes[0].innerHTML)) {
        columns[low].style.backgroundColor = "red";
        await swap(columns[high], columns[low], delay);
        columns = document.querySelectorAll(".block");
    } else if (middleValue === Number(columns[mid].childNodes[0].innerHTML)) {
        columns[mid].style.backgroundColor = "red";
        await swap(columns[high], columns[mid], delay);
        columns = document.querySelectorAll(".block");
    } else {
        columns[high].style.backgroundColor = "red";
    }
    return partition(columns, low, high, delay);
}