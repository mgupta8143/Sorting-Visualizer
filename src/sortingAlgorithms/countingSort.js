export async function countingSort() {
    this.resetSelectedValues();
    this.shouldStop = false;
    let arr = this.state.array;
    let min = this.state.minQuantity;
    let max = this.state.maxQuantity;
    let count = [];
    let j = 0;
    this.numOperations = 5;
    for(let i = min; i <= max; ++i) {
        count[i] = 0;
        this.numOperations += 1;
    }
    for(let i = 0; i <= arr.length; ++i) {
        count[arr[i]] += 1;
        this.numOperations += 1;
    }
    for(let i = min; i <= max; ++i) {
        while(count[i] > 0) {
            if(this.shouldStop === true) {
                return this.stopSort(arr)
            }
            arr[j] = i;
            await this.update(arr, [j], 50);
            this.setState({array:arr});
            ++j;
            --count[i];
            this.numOperations += 3;
        }
    }
    return arr
}