export async function insertionSort() {
    let arr = this.state.array;
    for (let i = 1; i < arr.length; ++i) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j -= 1;
            if(this.shouldStop === true)
            {
                break;
            }
            await this.update(arr, [key,j], 10);
        }
        if(this.shouldStop === true)
        {
            this.shouldStop = false;
            break;
        }
        arr[j + 1] = key;
    }
    return arr;
}