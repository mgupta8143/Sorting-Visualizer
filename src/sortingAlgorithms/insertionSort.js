export async function insertionSort() {
    this.numOperations = 0;
    let arr = this.state.array;
    this.shouldStop = false;
    for (let i = 1; i < arr.length; ++i) {
        let key = arr[i];
        let j = i - 1;
        this.numOperations += 2
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j -= 1;
            this.numOperations += 2
            if(this.shouldStop === true)
                return this.stopSort();
            await this.update(arr, [key,j], 10);
        }
        arr[j + 1] = key;
        this.numOperations += 1
    }
    return arr;
}