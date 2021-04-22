async function HeapSort(delay = 100, callback) {
    startTimer();
    blocks = document.querySelectorAll(".block");
    heapSort(blocks, delay).then(() => {
        stopTimer();
        callback("heap_sort");
    })
}

async function Heapify(n, i, delay = 100) {
    var blocks = document.querySelectorAll(".block");
    var largest = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;

    if (
        l < n &&
        Number(blocks[l].childNodes[0].innerHTML) >
        Number(blocks[largest].childNodes[0].innerHTML)
    )
        largest = l;

    if (
        r < n &&
        Number(blocks[r].childNodes[0].innerHTML) >
        Number(blocks[largest].childNodes[0].innerHTML)
    )
        largest = r;

    if (largest != i) {
        await swap(blocks[i], blocks[largest], delay);
        blocks = document.querySelectorAll(".block");

        await Heapify(n, largest, delay);
    }
}

async function heapSort(columns, delay = 100) {
    for (var i = columns.length / 2 - 1; i >= 0; i--) {
        await Heapify(columns.length - 1, i);
    }

    for (var i = columns.length - 1; i > 0; i--) {
        await swap(blocks[0], blocks[i], delay);
        blocks = document.querySelectorAll(".block");

        await Heapify(i, 0, delay);
    }
}