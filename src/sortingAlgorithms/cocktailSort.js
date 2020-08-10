/*FIX STOP*/

export async function cocktailSort() {
    let arr = this.state.array;
    let start = 0;
    let end = arr.length;
    this.shouldStop = false;
    for(let n = 0; n < arr.length; n++) {
        if(n % 2 === 0)  {
            let idx = start;
            while(idx !== end - 1) {
                if(arr[idx + 1] < arr[idx]) {
                    this.swap(arr, idx, idx + 1);
                    await this.update(arr, [idx, idx+1], 100);
                    if(this.shouldStop)
                        return this.stopSort(arr);
                }
                ++idx;
            }
            --end;
        }
        else {
            let idx = end - 1;
            while(idx !== start) {
                if(arr[idx - 1] > arr[idx]) {
                    this.swap(arr, idx, idx-1);
                    await this.update(arr, [idx, idx-1], 100);
                    if(this.shouldStop)
                        return this.stopSort(arr);
                }
                --idx;
            }
            ++start;
        }
    }
    return arr;
}

/*
export async function cocktailSort() {
    let arr = this.state.array;
    let start = 0;
    let end = arr.length;
    for(let n = 0; n < arr.length; n++) {
        if(n % 2 === 0)  {
            end = await this.moveBar(1, start, end)[1];
        }
        else {
            start = await this.moveBar(-1, start, end)[0];
        }
    }
    return arr;
}

export async function moveBar(direction, start, end) {
    let arr = this.state.array;
    let idx = 0, stopIdx = 0;
    if(direction === 1) {idx = start; stopIdx = end-1;}
    if(direction === -1) {idx = end-1; stopIdx = start;}
    while(idx != stopIdx) {
        if(giveDirectionConditional(arr, direction, idx)) {
            this.swap(arr, idx, idx + direction);
            await this.update(arr, [idx, idx+direction], 100);
        }
        idx = idx + direction;
    }
    if(direction === 1) --end;
    if(direction === -1) ++start;
    return [start, end];

}

function giveDirectionConditional(arr, direction, idx) {
    if(direction == 1) return arr[idx+direction] < arr[idx];
    if (direction == -1) return arr[idx+direction] > arr[idx];
}
*/