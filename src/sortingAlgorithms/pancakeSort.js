export async function pancakeSort() {
    this.shouldStop = false;
    let arr = this.state.array;
    let start = 0;
    let end = arr.length - 1;
    this.numOperations = 3;
    while(end >= 0) {
        if(this.shouldStop) {
            return this.stopSort(arr, true);
        }
        let maxIdx = findBiggestElement(arr, start, end);
        this.numOperations += end-start+1;
        arr = await this.flip(arr, maxIdx);
        arr = await this.flip(arr, end);
        --end;
        this.numOperations += 4;
    }
    return arr;
}

export async function flip(arr, i) {
    let start = 0;
    if(this.shouldStop) {
        return this.stopSort(arr,true);
    }
    while(start < i) {
        if(this.shouldStop) {
            return this.stopSort(arr, true);
        }
        this.swap(arr, i, start);
        await this.update(arr, [start, i], 100);
        ++start;
        --i;
        this.numOperations += 5;
    }
    return arr
}

function findBiggestElement(arr, start, end) {
    let idx = start;
    for(let i = start; i <= end; i++) {
        if(arr[i] > arr[idx]) {
            idx = i;
        }
    }
    return idx;

}