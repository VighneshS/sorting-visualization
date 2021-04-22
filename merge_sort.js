// Asynchronous BubbleSort function
let blocks = [];
let blocksParsed = [];

async function MergeSort(delay = 100, callback) {
    startTimer();
    blocks = document.querySelectorAll(".block");
    blocks.forEach(e => {
        blocksParsed.push(Number(e.childNodes[0].innerHTML))
    });
    console.log(blocks.length, blocksParsed);
    mergeSort(blocksParsed, 0, blocksParsed.length - 1, delay).then(() => {
        stopTimer();
        callback("merge_sort");
    })
}

async function mergeSort(array, start, end, delay) {
    if (end - start <= 1) {
        return
    }
    let mid = Math.floor((end - start) / 2)
    await mergeSort(array, start, mid, delay)
    await mergeSort(array, mid + 1, end, delay)
    await mergeArray(array, start, mid, delay)
}

async function mergeArray(array, start, end, mid, delay) {
    let i = start, j = mid;
    while (i < end && j < end) {
        if (array[i] > array[j]) {
            let t = array[j];
            array.splice(j, 1);
            array.splice(i, 0, t);
            j++;
        }
        i++;
        if (i === j) j++;

        // copy back the current state of the sorting
        array.slice();
    }
}