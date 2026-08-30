/*const promise = new Promise((resolve, reject)=> {
    resolve("Operation successful");
});
console.log(promise);*/

/*const promise = new Promise((resolve, reject)=> {
    resolve("Data loaded successfully");
});
promise.then((result)=> {
    console.log(result);
});*/

const promise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve("Data loaded successfully");
    },2000);
});
promise.then((result)=> {
    console.log(result);
});