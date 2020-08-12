export async function bubbleSort() {
    this.numOperations = 0;
    let arr = this.state.array;
    this.shouldStop = false;
    this.resetSelectedValues();
    for(let i = 0; i < arr.length; ++i) {
        for(let j = 0; j < arr.length - i; ++j) {
            if(arr[j+1] < arr[j])
            {
                if(this.shouldStop === true)
                    return this.stopSort();
                this.swap(arr, j, j+1)
                await this.update(arr, [j],1);
                this.numOperations += 4;  //3 for sorting, 1 for comparison
            }
        }
        if(i >= arr.length - 3) {
            this.status = "";
        }
    }
    return arr;
}