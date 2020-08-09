import React from 'react';
import ReactDOM from 'react-dom';
import {insertionSort} from './sortingAlgorithms/insertionSort.js';
import {bubbleSort} from './sortingAlgorithms/bubbleSort.js';
import {quickSort, quickWrapper, partition} from './sortingAlgorithms/quickSort.js';
import {countingSort} from './sortingAlgorithms/countingSort.js';
import {radixSort} from './sortingAlgorithms/radixSort.js';
import {selectionSort} from './sortingAlgorithms/selectionSort.js';
import {heapSort, heapify, maxHeapify} from './sortingAlgorithms/heapSort.js';
import {mergeWrapper, mergeSort, merge} from './sortingAlgorithms/mergeSort.js';
import {cocktailSort} from "./sortingAlgorithms/cocktailSort.js";
import {pancakeSort, flip} from "./sortingAlgorithms/pancakeSort.js";

class SortingVisualizer extends React.Component {
    constructor(props) {
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
        this.selectionSort = selectionSort.bind(this);
        this.heapSort = heapSort.bind(this);
        this.heapify = heapify.bind(this);
        this.maxHeapify = maxHeapify.bind(this);
        this.cocktailSort = cocktailSort.bind(this);
        this.pancakeSort = pancakeSort.bind(this);
        this.flip = flip.bind(this);
    

        this.resetArray = this.resetArray.bind(this);
        this.stopState = this.stopState.bind(this);
        this.getInitialSpeed = this.getInitialSpeed.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
        this.resetSelectedValues = this.resetSelectedValues.bind(this);
        this.update = this.update.bind(this);

        this.state = {array: [1,3,2,9,10,12,3,45,3,70], arraySize: 100, minQuantity: 1, maxQuantity: 70, sortingSpeed: 50, resetSpeed: 1}
        this.shouldStop = false;
        this.status = "";
        this.selectedValues = [];
        this.swappedValues = [];
        
    }

    resetSelectedValues() {
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
        return (
            <div class = "row content-wrapper">
                <div class = "col-2" id = "navbar">
                    <ul id = "sortList">
                        <input type="range" min="1" max={this.state.arraySize/2} value={this.state.sortingSpeed}  onChange = {this.handleSpeedChange} class="slider" id="myRange"></input>
                        <li>
                            <button class="btn btn-outline-primary btn-block" onClick = {this.insertionSort}>Insertion Sort</button>
                        </li>
                        <li>
                            <button class="btn btn-outline-primary btn-block" onClick = {this.bubbleSort}>Bubble Sort</button>
                        </li>
                        <li>
                            <button class="btn btn-outline-primary btn-block" onClick = {this.quickWrapper}>Quick Sort</button>
                        </li>
                        <li>
                            <button class="btn btn-outline-primary btn-block" onClick = {this.countingSort}>Counting Sort</button>
                        </li>
                        <li>
                            <button class="btn btn-outline-primary btn-block" onClick = {this.radixSort}>Radix Sort</button>
                        </li>
                        <li>
                            <button class="btn btn-outline-primary btn-block" onClick = {this.selectionSort}>Selection Sort</button>
                        </li>
                        <li>
                            <button class="btn btn-outline-primary btn-block" onClick = {this.heapSort}>Heap Sort</button>
                        </li>
                        <li>
                            <button class="btn btn-outline-primary btn-block" onClick = {this.mergeWrapper}>Merge Sort</button>
                        </li>
                        <li>
                            <button class="btn btn-outline-primary btn-block" onClick = {this.cocktailSort}>Cocktail Sort</button>
                        </li>
                        <li>
                            <button class="btn btn-outline-primary btn-block" onClick = {this.pancakeSort}>Pancake Sort</button>
                        </li>
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
                    <ul className = "stack">
                        {array.map((quantity, idx) => {
                            let backgroundColor = "hsla(" + (100+quantity*2).toString() + ", 100%, 50%, 1)";
                            if(this.selectedValues[idx] === 1) {
                                backgroundColor = "hsla(0, 100%, 50%, 1)"
                            }
                            const style = {
                                height: quantity.toString() + "vh",
                                marginTop: (-1 * (quantity - 5)/2).toString() + "vh",
                                width: (70/this.state.arraySize).toString() + "vw",
                                backgroundColor: backgroundColor
                            };
                            return <div style={style} className = "array-bar" key = {idx}></div>
                        })}
                    </ul>
                </div>
            </div>
        );

    }
}



ReactDOM.render(<SortingVisualizer />, document.getElementById('root'));
