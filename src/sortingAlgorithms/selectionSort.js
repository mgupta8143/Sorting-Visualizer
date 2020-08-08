export async function selectionSort() {
    let arr = this.state.array;
    if(this.checkSorted(arr))
        return;
    this.resetSelectedValues();
    for(let i = 0; i < arr.length - 1; ++i) {
        let minIdx = getMinIndex(arr, i);
        this.swap(arr, minIdx, i);
        if(this.shouldStop === true) {
            this.shouldStop = false;
            break;
        }
        await this.update(arr, [minIdx, i], 100);
        this.setState({array:arr});
    }
    return arr;
}

function getMinIndex(arr, beginIdx = 0) {
    let idx = beginIdx
    for(let i = beginIdx + 1; i < arr.length; ++i) 
        if(arr[i] < arr[idx]) 
            idx = i;
    return idx;
}