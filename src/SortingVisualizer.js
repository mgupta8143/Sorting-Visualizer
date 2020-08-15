import React from 'react';
import {insertionSort} from './sortingAlgorithms/insertionSort';
import {bubbleSort} from './sortingAlgorithms/bubbleSort';
import {quickSort, quickWrapper, partition} from './sortingAlgorithms/quickSort';
import {countingSort} from './sortingAlgorithms/countingSort';
import {getDigit, getNumDigits, largestNum, radixSort} from './sortingAlgorithms/radixSort';
import {selectionSort} from './sortingAlgorithms/selectionSort';
import {heapSort, heapify, maxHeapify} from './sortingAlgorithms/heapSort';
import {mergeWrapper, mergeSort, merge} from './sortingAlgorithms/mergeSort';
import {cocktailSort} from "./sortingAlgorithms/cocktailSort";
import {pancakeSort, flip} from "./sortingAlgorithms/pancakeSort";
import {bogoSort, shuffle} from "./sortingAlgorithms/bogoSort";
import {stoogeSort, stoogeWrapper} from "./sortingAlgorithms/stoogeSort";
import ArrayBar from "./ArrayBar";

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        /*Changed Format of Sorting Visualizer */
        super(props);
        this.mergeWrapper = mergeWrapper.bind(this);
        this.mergeSort = mergeSort.bind(this);
        this.merge = merge.bind(this);
        this.insertionSort = insertionSort.bind(this);
        this.bubbleSort = bubbleSort.bind(this);
        this.quickWrapper = quickWrapper.bind(this);
        this.quickSort = quickSort.bind(this);
        this.partition = partition.bind(this);
        this.countingSort = countingSort.bind(this);
        this.radixSort = radixSort.bind(this);
        this.getDigit = getDigit.bind(this);
        this.getNumDigits = getNumDigits.bind(this);
        this.largestNum = largestNum.bind(this);
        this.selectionSort = selectionSort.bind(this);
        this.heapSort = heapSort.bind(this);
        this.heapify = heapify.bind(this);
        this.maxHeapify = maxHeapify.bind(this);
        this.cocktailSort = cocktailSort.bind(this);
        this.pancakeSort = pancakeSort.bind(this);
        this.bogoSort = bogoSort.bind(this);
        this.stoogeSort = stoogeSort.bind(this);
        this.stoogeWrapper = stoogeWrapper.bind(this);
        this.shuffle = shuffle.bind(this);
        this.flip = flip.bind(this);
    
        this.resetArray = this.resetArray.bind(this);
        this.stopState = this.stopState.bind(this);
        this.getInitialSpeed = this.getInitialSpeed.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
        this.resetSelectedValues = this.resetSelectedValues.bind(this);
        this.update = this.update.bind(this);

        this.state = {array: [], arraySize: 40, minQuantity: 1, maxQuantity: 70, sortingSpeed: 50, resetSpeed: 1, changer: true}
        this.shouldStop = false;
        this.status = "";
        this.selectedValues = [];
        this.swappedValues = [];
        this.colorBegin = 100;
        this.colorMultiplier = 2;
        this.numOperations = 0;
        this.intializeArray();
        
    }

    /*play(quantity) {
      var playPromise = new Audio('../soundEffects/perc-chirpy.wav');
      playPromise.volume = 0.1;
      let rate = quantity/this.maxQuantity*16
      if(isNaN(rate)) {
          rate = 1;
      }
      playPromise.playbackRate = rate;
      playPromise = playPromise.play();
      if (playPromise !== undefined) {
        playPromise
          .then(_ => {
            // Automatic playback started!
            // Show playing UI.
            console.log("audio played auto");
          })
          .catch(error => {
            // Auto-play was prevented
            // Show paused UI.
            console.log("playback prevented");
          });
      }
    } */

    intializeArray = () => {
        let tempArray = []
        for(let i = 0; i < this.state.arraySize; i++) {
            let max = this.state.maxQuantity;
            let min = this.state.minQuantity;
            let randomizedValue = Math.floor(Math.random() * (max + 1 - min) + min);
            tempArray.push(randomizedValue);
        }
        this.state.array = tempArray;
    }

    forceARender() {
        this.setState({changer: !this.state.changer});
    }

    stopSort(arr, bool = false) {
        this.status = "";
        this.resetSelectedValues();
        this.shouldStop = bool;
        this.numOperations = 0;
        return arr;
    }

    resetSelectedValues() {
        this.forceARender();
        this.selectedValues = [];
        for(let i = 0; i < this.arraySize; ++i) {
            this.selectedValues.push(0);
        }

    }

    checkSorted(arr) {
        for(let i = 0; i < arr.length - 1; ++i) 
            if(arr[i+1] < arr[i])
                return false;
        return true;
    }


    swap(arr, idx1, idx2) {
        let temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }

    
    async resetArray() {
        this.stopState();
        this.status = "Resetting...";
        let tempArray = [];
        this.numOperations = 0;
        for(let i = 0; i < this.state.arraySize; ++i) {
            let max = this.state.maxQuantity;
            let min = this.state.minQuantity;
            let randomizedValue = Math.floor(Math.random() * (max + 1 - min) + min);
            tempArray.push(randomizedValue);
            this.setState({array: tempArray});
            await new Promise(r => setTimeout(r, this.state.resetSpeed));
            if(i === this.state.arraySize - 2) {
                this.status = "";
            }
            if(i % 12 === 0) {
                this.shuffleFlip(this.state.array);
                this.colorBegin = Math.random() * 360;
                this.colorMultiplier = 1 + Math.random();
            }
        }
        this.numOperations = 0;
    }

    async shuffleFlip(arr, i) {
        for(let i = 0; i < arr.length; ++i) {
            let max = this.state.maxQuantity;
            let min = this.state.minQuantity;
            let randomizedValue = Math.floor(Math.random() * (max + 1 - min) + min);
            arr[i] = randomizedValue;
        }
    }

    stopState() {
        this.status = "";
        while(this.shouldStop === false) 
            this.shouldStop = true;
    }

    getInitialSpeed() {
        this.setState({sortingSpeed: 50});
    }

    handleSpeedChange(event) {
        this.setState({sortingSpeed: event.target.value});
    }

    async update(arr, selectedIndices, speedMultiplier) {
        return new Promise(r => {
            setTimeout(r, speedMultiplier/this.state.sortingSpeed);
            this.status = "Sorting...";
            selectedIndices.forEach(index => {
                if(index < arr.length && 0 <= index)
                    this.selectedValues[index] = 1
            });
            if(this.checkSorted(arr)) {
                this.status = "";
                this.resetSelectedValues();
            }
            this.setState({array: arr});
            this.resetSelectedValues();
        });
    }

    render() {
        let array = this.state.array;
        const algorithms =  [
            { algo: this.insertionSort, name: "Insertion Sort" },
            { algo: this.bubbleSort, name: "Bubble Sort" },
            { algo: this.quickWrapper, name: "Quick Sort" },
            { algo: this.countingSort, name: "Counting Sort" },
            { algo: this.radixSort, name: "Radix Sort" },
            { algo: this.selectionSort, name: "Selection Sort" },
            { algo: this.heapSort, name: "Heap Sort" },
            { algo: this.mergeWrapper, name: "Merge Sort" },
            { algo: this.cocktailSort, name: "Cocktail Sort" },
            { algo: this.pancakeSort, name: "Pancake Sort" },
            { algo: this.bogoSort, name: "Bogo Sort"}, 
            { algo: this.stoogeWrapper, name: "Stooge Sort"}
          ];
        return (
            <div class = "row content-wrapper">
                                
                <div class = "col-2" id = "navbar">
                    <ul id = "sortList">
                        <input type="range" min="1" max={this.state.arraySize/2} value={this.state.sortingSpeed}  onChange = {this.handleSpeedChange} class="slider" id="myRange"></input>
                        {
                            //Special Thanks to gimmeslack12 for suggesting this MASSIVE improvement!!!
                        algorithms.map((a) => (
                            <li key={a.name}>
                            <button class="btn btn-outline-info btn-block" onClick={a.algo}>
                                {a.name}
                            </button>
                            </li>
                        ))}
                        <li>
                            <button class="btn btn-outline-info btn-block" onClick = {this.resetArray}>Reset Array</button>
                        </li>
                        <li>
                            <button class="btn btn-outline-danger btn-block" onClick = {this.stopState} >Stop</button>
                        </li>
                    </ul>
                </div>
                <div class = "col-10" id = "visualizer">
                    <h1 id = "status">{this.status}</h1>
                    <h1 id = "operation">{"Operations: " + this.numOperations.toString()}</h1>
                    <ul className = "stack">
                        {
                        array.map((quantity, idx) => {
                            let highlightBar = (e) => {
                                e.target.style.background = "hsla(" + (this.colorBegin -100).toString() + ", 100%, 50%, 1)";
                            }
                            let unhighlightBar = (e) => {
                                e.target.style.background = "hsla(" + (this.colorBegin+quantity*this.colorMultiplier).toString() + ", 100%, 50%, 1)";
                            }
                            let backgroundColor = "hsla(" + (this.colorBegin+quantity*this.colorMultiplier).toString() + ", 100%, 50%, 1)";
                            if(this.selectedValues[idx] === 1) {
                                backgroundColor = "hsla(" + (this.colorBegin -100).toString() + ", 100%, 50%, 1)"
                                //this.play(quantity);
                            }
                            const style = {
                                height: quantity.toString() + "vh",
                                marginTop: (-1 * (quantity - 5)/2).toString() + "vh",
                                width: (70/this.state.arraySize).toString() + "vw",
                                backgroundColor: backgroundColor
                            };
                            return <ArrayBar onMouseEnter = {highlightBar} onMouseLeave = {unhighlightBar} style={style} className = "array-bar" key = {idx}></ArrayBar>
                        })}
                    </ul>
                </div>
            </div>
        );

    }
}

