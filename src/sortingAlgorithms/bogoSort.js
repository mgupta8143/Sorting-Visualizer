export async function bogoSort() {
    this.shouldStop = false;
    this.numOperations = 0;
    let arr = this.state.array;
    while(!this.checkSorted(arr)) {
        this.numOperations += arr.length + 1;
        arr = await this.shuffle(arr);
        if(this.shouldStop === true) {
            return this.stopSort(arr, true);
        }
    }
    return arr;
}



export async function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        this.swap(array, counter, index)
        this.numOperations += 6;
        if(this.shouldStop === true) {
            return this.stopSort(array, true);
        }
        await this.update(array, [index, counter], 100);
    }
    return array;
}