/*
This is a javascript example for
week 2.
*/

// inline comment

let num = 100; //integer

function foo() {
    let num2 = 200;
    console.log(num)
};

foo();

// let anonFun = function() {
//     console.log("hello");
// };

let anonFun = () => console.log("hello"); 

(function() {
    console.log("hi")
})();

let person = "Summer";

function people(peopleName) {
    console.log("Hello " + peopleName);
};

people(person);

let arr = ["foo", 123, ["zar", "bar"]];

console.log(arr[1])

// Set item
arr[1] = "barbar";

// Add item to the end of the array
arr.push("car");

// Removing an item from the 
arr.splice(2, 2)
console.log(arr);

for (let item of arr) {
    console.log(item);
}

for (let i in arr) {
    console.log(i + " " + arr[i]);
}