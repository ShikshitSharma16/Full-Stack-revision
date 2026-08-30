import fs from "node:fs";

/*fs.writeFileSync("message.txt", "Hello from Node.js!\n");
fs.appendFileSync("message.txt", "Second message looged in\n");
fs.appendFileSync("message.txt", "Third message logged in\n");

fs.writeFileSync("users.txt", "Shikshit\n");
fs.appendFileSync("users.txt", "Rahul\n");
fs.appendFileSync("users.txt", "Aman\n");*/

//const data = fs.readFileSync("users.txt", "utf8");
//console.log(data);  This will represent buffer object which represents the bytes

//console.log(data.toString());  this will convert buffer to actual text
// utf8 is standard encodeing using in most text file to represent the text
/*console.log(data);
console.log(typeof data);*/

//Asynchronous function

/*console.log("1");
fs.readFile("users.txt", "utf8", (error, data) => {
    console.log(data);
});
console.log("2");*/


//Callback

/*fs.readFile("users.txt", "utf8", (error,data) => {
    if(error) {
        console.log("Error reading file:", error);
        return;
    }
    console.log(data);
});*/

//Multiple Callbacks

fs.readFile("users.txt", "utf8", (error, data)=> {
    if(error){
        console.log("Error reading file:", error);
        return;
    }
    console.log("Users");
    console.log(data);
    
    fs.readFile("message.txt", "utf8", (error, data)=>{
        if(error){
            console.log("Error reading message.txt file:", error);
            return;
        }
        console.log("Message");
        console.log(data);
    });
});