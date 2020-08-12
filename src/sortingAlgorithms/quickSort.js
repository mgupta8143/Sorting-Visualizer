export async function quickWrapper() {
    this.shouldStop = false;
    this.numOperations = 0;
    let arr = this.state.array;
    this.resetSelectedValues();
    this.setState({array: await this.quickSort(arr, 0, arr.length -1)});
}

export async function quickSort(arr, left, right) {
    if (arr.length > 1) {
        let index = await this.partition(arr, left, right);
        if(this.shouldStop === true)
            return this.stopSort(arr, true);
        if (this.shouldStop === false) {
            if (left < index - 1) {
                this.quickSort(arr, left, index - 1);
                this.numOperations += 2;
            }
            if (index < right) {
                this.quickSort(arr, index, right);
                this.numOperations += 2;
            }
        }
        else if (left === 0 && right === arr.length - 1) {
            this.shouldStop = false;
        }
    }
    return arr
}   

export async function partition(arr, left, right) {
    var pivot = arr[Math.floor((right + left) / 2)], i = left, j = right;
    this.numOperations += 3;
    while (i <= j) {
        if(this.shouldStop === true) {
            break;
        }
        while (arr[i] < pivot) {
            ++i;
            this.numOperations += 1;
        }
        while (arr[j] > pivot) {
            --j;
            this.numOperations += 1;
        }
        if (i <= j) {
            this.swap(arr, i, j);
            this.setState({array:arr});
            await this.update(arr, [i,j], 50);
            ++i;
            --j;
            this.numOperations += 5;
        }
    }
    return i;
}