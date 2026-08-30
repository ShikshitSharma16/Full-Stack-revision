import fs from "node:fs/promises";

/*async function readFiles() {
    try{
    const user = await fs.readFile("users.txt", "utf8");
    const message = await fs.readFile("message.txt", "utf8");
    console.log(user);
    console.log(message);
    } catch(error) {
        console.log("Error:", error);
    }
}

readFiles();*/

async function readFiles() {
    try{
        const [user, message] = await Promise.all([
            fs.readFile("users.txt", "utf8"),
            fs.readFile("message.txt", "utf8")
        ]);
        console.log(user);
        console.log(message);
    } catch(error) {
        console.log("Error:", error);
    }
}
readFiles();