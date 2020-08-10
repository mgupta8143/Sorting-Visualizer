export async function quickWrapper() {
    this.shouldStop = false;
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
            }
            if (index < right) {
                this.quickSort(arr, index, right);
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
    while (i <= j) {
        if(this.shouldStop === true) {
            break;
        }
        while (arr[i] < pivot) {
            ++i;
        }
        while (arr[j] > pivot) {
            --j;
        }
        if (i <= j) {
            this.swap(arr, i, j);
            this.setState({array:arr});
            await this.update(arr, [i,j], 50);
            ++i;
            --j;
        }
    }
    return i;
}