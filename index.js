const scrapeIt = require("scrape-it")
const Json2csvParser = require('json2csv').Parser;


let cars = ["https://www.marktplaats.nl/a/auto-s/peugeot/m1359760299-peugeot-108-1-0evti-active.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr",
    "https://www.marktplaats.nl/a/auto-s/alfa-romeo/m1357267299-alfa-romeo-mito-0-9-twinair-distinctive-bj-2012-6-bak-lmv.html?c=efb2ef4dc323389c4f92ed10afa33e3a&previousPage=lr"
];
let table = [];

//https://stackoverflow.com/questions/38362231/how-to-use-promise-in-foreach-loop-of-array-to-populate-an-object

cars.forEach((car) => {
    scrapeIt(car, {
        title: ".header h1",
        price: ".header .price",
        dataTable: {
            selector: ".car-feature-table",
            listItem: '.spec',
            data: {
                key: '.key',
                value: '.value'
            }
        },
        fields: {
            listItem: '.spec .key'
        }
    }).then(({
        data,
        response
    }) => {
        console.log(`Status Code: ${response.statusCode}`)
        let newObject = {};
        data.dataTable.forEach(rowObject => {
            newObject[rowObject.key] = rowObject.value;
        });
        table.push(newObject);
        console.log(table);
    })
});

// Should only log if it has both the cars retrieved from marktplaats. How do I do this?
console.log(table);

// // example
// let numArr = [1, 2, 3, 4, 5];
// let nums = [];

// let promiseList = new Promise(function (resolve, reject) {
//     setTimeout(() => {
//         numArr.forEach((val) => {
//             nums.push(val);
//         });
//         resolve(nums);
//     }, 5000)
// })


// Promise.all([promiseList]).then((arrList) => {
//     arrList.forEach((array) => {
//         console.log("Array return from promiseList object ", array);
//     })
// });