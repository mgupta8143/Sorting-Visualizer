export async function selectionSort() {
    this.numOperations = 0;
    this.shouldStop = false;
    let arr = this.state.array;
    if(this.checkSorted(arr))
        return;
    this.resetSelectedValues();
    for(let i = 0; i < arr.length - 1; ++i) {
        let tempArr = getMinIndex(arr, i);
        let minIdx = tempArr[0];
        this.numOperations += tempArr[1];
        this.swap(arr, minIdx, i);
        this.numOperations += 3
        if(this.shouldStop === true) {
            return this.stopSort(arr);
        }
        await this.update(arr, [minIdx, i], 100);
        this.setState({array:arr});
    }
    return arr;
}

function getMinIndex(arr, beginIdx = 0) {
    let idx = beginIdx
    let val = 0;
    for(let i = beginIdx + 1; i < arr.length; ++i) {
        val += 1;
        if(arr[i] < arr[idx]) {
            idx = i;
            val += 1;
        }
    }
    return [idx, val];
}