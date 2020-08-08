export async function bubbleSort() {
    let arr = this.state.array;
    this.resetSelectedValues();
    for(let i = 0; i < arr.length; ++i) {
        if(this.shouldStop === true)
        {
            this.shouldStop = false;
            break;
        }
        for(let j = 0; j < arr.length - i; ++j) {
            if(arr[j+1] < arr[j])
            {
                if(this.shouldStop === true)
                    break;
                this.swap(arr, j, j+1)
                await this.update(arr, [j],1);
            }
        }
        if(i >= arr.length - 3) {
            this.status = "";
        }
    }
    return arr;
}