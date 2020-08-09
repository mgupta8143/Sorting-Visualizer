export async function pancakeSort() {
    //Reverse from 0 to i 
    //Find the biggest element swap it back
    //Find the sammlest element swap it back
    //
    let arr = this.state.array;
    let start = 0;
    let end = arr.length - 1;
    while(end >= 0) {
        let maxIdx = findBiggestElement(arr, start, end);
        arr = await this.flip(arr, maxIdx);
        arr = await this.flip(arr, end);
        --end;
    }
    return arr;
}

export async function flip(arr, i) {
    let start = 0;
    while(start < i) {
        this.swap(arr, i, start);
        await this.update(arr, [start, i], 100);
        ++start;
        --i;
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