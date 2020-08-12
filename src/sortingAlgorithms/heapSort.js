export async function heapify(arr, n, i) {
    let max = i;
    let left = 2*i + 1;
    let right = 2*i + 2;
    this.numOperations += 3;

    if(left < n && arr[left] > arr[max]) {
        max = left;
        this.numOperations += 1;
    }
    if(right < n && arr[right] > arr[max]) {
        max = right;
        this.numOperations += 1;
    }

    if(max !== i) {
        this.swap(arr, max, i);
        this.numOperations += 4;
        await this.heapify(arr, n, max);
    }

    await this.update(arr, [max, i], 1000);
}

export async function maxHeapify(arr) {
    for(let i = Math.floor(arr.length/2); i >= 0; --i) {
        this.numOperations += 1;
        await this.heapify(arr, arr.length, i);
        if(this.shouldStop) {
            this.resetSelectedValues()
            this.status = "";
            return arr;
        }
    }
    return arr;
}

export async function heapSort() {
    this.numOperations = 0;
    let arr = this.state.array;
    this.shouldStop = false;
    arr = await this.maxHeapify(arr);
    for(let n = arr.length-1; n >= 0; --n) {
        this.numOperations += 1;
        if(this.shouldStop) {
            this.shouldStop = false;
            this.resetSelectedValues()
            this.status = "";
            return arr;
        }
        this.swap(arr, n, 0);
        this.numOperations += 3;
        await this.heapify(arr, n, 0);
    }
    return arr;
}