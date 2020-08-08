export async function countingSort() {
    this.resetSelectedValues();
    let arr = this.state.array;
    let min = this.state.minQuantity;
    let max = this.state.maxQuantity;
    let count = [];
    let j = 0;
    for(let i = min; i <= max; ++i) {
        count[i] = 0;
    }
    for(let i = 0; i <= arr.length; ++i) {
        count[arr[i]] += 1;
    }
    for(let i = min; i <= max; ++i) {
        if(this.stopState === true) {
            this.stopState = false;
            break;
        }
        while(count[i] > 0) {
            arr[j] = i;
            await this.update(arr, [j], 50);
            this.setState({array:arr});
            ++j;
            --count[i];
            if(this.stopState === true) {
                break;
            }
        }
    }
    return arr
}