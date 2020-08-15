export async function stoogeWrapper() {
    console.log("Hi");
    this.shouldStop = false;
    this.numOperations = 0;
    this.resetSelectedValues();
    let arr = this.state.array;
    this.setState({array:await this.stoogeSort(arr, 0, arr.length -1)});
}


export async function stoogeSort(arr, low, high) {
    if(low >= high) {
        return;
    }
    if(arr[low] > arr[high]) {
        this.swap(arr, low, high);
        await this.update(arr, [low, high], 500);
    }
    let numElements = (high-low+1)
    if(numElements > 2) {
        let thirdShift = Math.floor((high-low+1)/3);
        await this.stoogeSort(arr, low, high-thirdShift);
        await this.stoogeSort(arr, low + thirdShift, high);
        await this.stoogeSort(arr, low, high-thirdShift);
        
    }
    return arr;
}