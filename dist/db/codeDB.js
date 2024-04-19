"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeDB = void 0;
exports.codeDB = [
    {
        id: "1",
        name: "Square Numbers",
        description: "Implement a function to square each element in an array",
        code: `
function squareNumbers(arr) {
  // implement here...
}
`,
        solution: `
function squareNumbers(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i] * arr[i]);
  }
  return result;
}
`,
    },
    {
        id: "2",
        name: "Filter Positive Numbers",
        description: "Implement a function to filter out negative numbers from an array",
        code: `
function filterPositive(arr) {
  // implement here...
}
`,
        solution: `
function filterPositive(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= 0) {
      result.push(arr[i]);
    }
  }
  return result;
}
`,
    },
    {
        id: "3",
        name: "Sum Array",
        description: "Implement a function to calculate the sum of all elements in an array",
        code: `
function sumArray(arr) {
  // implement here...
}
`,
        solution: `
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
`,
    },
    {
        id: "4",
        name: "Reverse Array",
        description: "Implement a function to reverse the order of elements in an array",
        code: `
function reverseArray(arr) {
  // implement here...
}
`,
        solution: `
function reverseArray(arr) {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }
  return result;
}
`,
    },
];
