export async function mergeWrapper() {
   this.shouldStop = false;
   await this.mergeSort(this.state.array, 0, this.state.array.length);
}


export async function mergeSort(arr, begin, end) {
   if(end-begin <= 1) {
      return [begin, end];
   }
   let middle = Math.floor((begin + end)/2)
   if(this.shouldStop) {
      this.stopSort(arr, true)
      return [begin, end];
   }
   let left = await this.mergeSort(arr, begin, middle);
   let right = await this.mergeSort(arr, middle, end);
   let temp = await this.merge(arr, left[0], middle, right[1]);
   while(this.checkSorted(arr.slice(left[0], right[1])) === false) {
      if(this.shouldStop) {
         this.stopSort(arr, true)
         return [begin, end];
      }
      temp = await this.merge(arr, left[0], middle, right[1]);
   }
   return temp;
}

/* IN-PLACE MERGE */
export async function merge(arr, begin, middle, end) {
   let i = begin;
   let j = middle;
   while(i < end && j < end) {
      if(this.shouldStop) {
         this.stopSort(arr, true)
         return [begin, end];
      }
      await this.update(arr,[i,j], 10);
      if(arr[i] <= arr[j]) {
         ++i;
      }
      else if(arr[i] > arr[j]) {
         this.swap(arr, i, j);
         j = findMin(arr,j,j+1);
         ++i;
      }
      if(i === j) {
         ++j;
      }
   }
   return [begin, end]; 
}


function findMin(arr, j, k) {
  if(arr[k] < arr[j])
    return k;
  else
    return j;
}
