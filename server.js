import http from "node:http";

/*const server = http.createServer((request,response)=>{
    response.end("Hello from Node.js");
    console.log(request.method);
    console.log(request.url);
});

server.listen(3000, ()=>{
    console.log("Server listening on port 3000");
});*/



/*const server = http.createServer((request, response) => {

    if (request.url === "/") {
        response.end("Welcome to Home");
    }

    else if (request.url === "/about") {
        response.end("About Page");
    }

    else if (request.url === "/contact") {
        response.end("Contact Page");
    }

    else {
        response.end("404 - Page Not Found");
    }

});

server.listen(3000, () => {
    console.log("Server listening on port 3000");
});*/


/*const server = http.createServer((request, response)=> {
    if(request.method === "GET" && request.url === "/"){
        response.end("Home Page");
    }

    else if(request.method === "GET" && request.url === "/users"){
        response.end("Users Page");
    }

    else if(request.method === "GET" && request.url === "/products"){
        response.end("Products Page");
    }

    else if (request.method === "POST" && request.url === "/users") {

        request.on("data", (chunks)=>{
            console.log(chunks);
        });

        request.on("end", ()=>{
            console.log("Request body completely received");
            response.end("User Data Received");
        });
    }

    else{
        response.end("404- Page not found");
    }
});

server.listen(3000, ()=> {
    console.log("Server listening on port 3000");
});*/


/*const body = '{"name": "Shikshit", "age": 24}';
const user = JSON.parse(body);
console.log(user);
console.log(user.name);
console.log(user.age);
console.log(typeof user);
console.log(typeof body);*/


const users = [];
const server = http.createServer((request, response)=> {
    if(request.method === "GET" && request.url === "/"){
        response.end("Home Page");
    }

    else if(request.method === "GET" && request.url === "/users"){
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify(users));
    }

    else if(request.method === "GET" && request.url.startsWith("/users")){
        
        const parts = request.url.split("/");
        const id = Number(parts[2]);
        const user = users.find((user)=> user.id === id);

        if(!user){
            response.statusCode = 404;
            response.end("User Not Found");
            return;
        }
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify(user));
    }

    else if(request.method === "DELETE" && request.url.startsWith("/users/")){
        const parts = request.url.split("/");
        const id = Number(parts[2]);

        const index = users.findIndex((user) => user.id ===id);
        if(index === -1){
            response.statusCode = 404;
            response.end("User Not Found");
            return;
        }

        users.splice(index, 1);

        response.end("User Deleted");
    }

    else if (request.method === "POST" && request.url === "/users") {
        const chunks = [];
        request.on("data", (chunk)=>{
            chunks.push(chunk);
        });

        request.on("end", ()=>{
            const body = Buffer.concat(chunks).toString("utf8");
            try{
                const user = JSON.parse(body);

                user.id = users.length + 1;

                users.push(user);
                console.log(users);

                console.log("User name:", user.name);
                console.log("User age:", user.age);

                response.statusCode = 201;
                response .end("user created");
            } catch (error) {
                response.statusCode = 400;
                response.end("Invalid JSON");
            }
        });
        
    }

    else if(request.method === "PUT" && request.url.startsWith("/users/")){
        const parts = request.url.split("/");
        const id = Number(parts[2]);

        const index = users.findIndex((user)=> user.id === id);
        if(index === -1){
            response.statusCode = 404;
            response.end("User not found");
            return;
        }

        const chunks = [];
        request.on("data", (chunk)=>{
            chunks.push(chunk);
        });

        request.on("end", ()=>{
            try {
                const body = Buffer.concat(chunks).toString("utf8");
                const updatedUser = JSON.parse(body);

                users[index] = updatedUser;

                response.setHeader("Content-Type", "application/json");
                response.end(JSON.stringify(updatedUser));

            } catch (error) {

                response.statusCode = 400;
                response.end("Invalid JSON");
            }
        });
    }

    else{
        response.statusCode = 404;
        response.end("404 - Page not found");
    }
});

server.listen(3000, ()=> {
    console.log("Server listening on port 3000");
});