export async function heapify(arr, n, i) {
    let max = i;
    let left = 2*i + 1;
    let right = 2*i + 2;

    if(left < n && arr[left] > arr[max]) {
        max = left;
    }
    if(right < n && arr[right] > arr[max]) {
        max = right;
    }

    if(max !== i) {
        this.swap(arr, max, i);
        await this.heapify(arr, n, max);
    }

    if(this.shouldStop === true) {
        this.status = "";
        this.resetSelectedValues();
        this.shouldStop = false;
    }
    await this.update(arr, [max, i], 1000);
}

export async function maxHeapify(arr) {
    for(let i = Math.floor(arr.length/2); i >= 0; --i) {
        await this.heapify(arr, arr.length, i);
    }
    return arr;
}

export async function heapSort() {
    let arr = this.state.array;
    arr = await this.maxHeapify(arr);
    for(let n = arr.length-1; n >= 0; --n) {
        if(this.stopState === true) {
            this.status = "";
            this.resetSelectedValues();
            this.stopState = false;
            break;
        }
        this.swap(arr, n, 0);
        await this.heapify(arr, n, 0);
    }
    return arr;
}