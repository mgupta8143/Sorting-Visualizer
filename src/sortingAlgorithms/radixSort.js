function getDigit(num, idx) {
    let digit = num % 10;
    while(idx > 0) {
        num = (num - (num % 10))/10;
        idx -= 1;
        digit = num % 10;
    }
    return digit;
}

function getNumDigits(num) {
    if(num === 0)
        return 1;
    let count = 0;
    while(num > 0) {
        num = (num - (num % 10))/10;
        count += 1;
    }
    return count;
}

function largestNum(arr) {
    let largest = 0;
    arr.forEach(val => {
        if(val > largest) {
            largest = val;
        }
    });
    return getNumDigits(largest);
}

export async function radixSort() {
    this.shouldStop = false;
    let arr  = this.state.array;
    let maxLength = largestNum(arr);
    for (let i = 0; i < maxLength; ++i) {
        let buckets = Array.from({ length: 10 }, () => []);
        for (let j = 0; j < arr.length; ++j) {
            if(this.shouldStop === true) {
                return this.stopState(arr);
            }
            let num = getDigit(arr[j], i);
            if (num !== undefined)
              buckets[num].push(arr[j]);
        };
        arr = buckets.flat();
        if(this.shouldStop === true) {
            return this.stopState(arr);
        }
        await this.update(arr, [], 30000)
        this.setState({array:arr});
    };
    return arr;
}