/*async function greet(){
    return "Hello Shikshit";
}

async function main(){
    const result = await greet();
    console.log(result);
}
main();*/

//try/catch

const promise = new Promise((resolve, reject)=>{
    reject("Database connection failed");
});

async function connect(){
    try{
        const result = await promise;
        console.log(result);
    } catch(error){
        console.log("Error: ", error);
    }
}

connect();