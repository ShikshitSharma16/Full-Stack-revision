import express from "express";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use("/users", userRouter);

app.use((err, request, response, next)=>{
    console.log("Error:", err.message);

    response.status(500).send("Internal Server Error");
});


/*app.use((request, response, next)=>{
    console.log("Method:", request.method);
    console.log("URL:", request.url);
    next();
});

app.get("/", (request, response)=>{
    console.log("Route executed");

    response.send("Home Page");
});*/

function checkAuth(request, response, next){
    const isAuthenticated = true;

    if(!isAuthenticated){
        return response.status(401).send("Unauthorize");
    }

    next();
}

app.get("/profile", checkAuth, (request, response)=>{
    response.send("Welcome to profile page");
});


app.use((request, response)=> {
    response.status(404).send("404 - Page not found")
});

app.listen(3000, () => {
    console.log("Express Server listening on port 3000")
});