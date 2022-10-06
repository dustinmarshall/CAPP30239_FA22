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

// Loop through each item in the array with its index
arr.forEach((item, i) => console.log(i + " " + item));

let obj1 = {
    name: "Jill",
    age: 85,
    job: "Cactus Hunter",
};

console.log(obj1.name);
console.log(obj1["name"]);

obj1.job = "Barista";

console.log(obj1);

for (let key in obj1) {
    let value = obj1[key];
    console.log('${key}: ${value}');
}

console.log("hello " + obj1["name"] + " " + num);

console.log(`hello ${obj1["name"]} ${num}`); // string template literal

for (let i = 0; i < 10; i++) {
    console.log()
}

if (x < 50) {
    console.log("Above Average");
}

// ternary operator (aka inline if else)
let y = (x > 50) ? "Abovr Average" : "Below Average";

// traverse the DOM
let example = document.getElementById("example");

example.innerHTML += "Hello world!";