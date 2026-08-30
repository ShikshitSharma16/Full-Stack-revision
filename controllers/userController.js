const users = [
    {
        id: 1,
        name: "Shikshit",
        age: 24
    },
    {
        id: 2,
        name: "Rahul",
        age: 25
    },
    {
        id: 3,
        name: "Aman",
        age: 23
    }
];

const getUsers = (request, response)=> {
    response.json(users);
};

const getUser = (request, response)=> {
    const id = Number(request.params.id);

    const user = users.find((user)=> user.id === id);
    if(!user){
        return response.status(404).send("User Not Found");
    }

    response.json(user);
};

const createUser = (request, response)=> {
    const user = request.body;

    user.id = users.length + 1;

    users.push(user);

    response.status(201).json(user);
};

const updateUser = (request, response)=> {
    const id = Number(request.params.id);

    const index = users.findIndex((user)=> user.id === id);
    if(index === -1){
        return response.status(404).send("User Not Found");
    }

    const updatedUser = request.body;
    updatedUser.id = id;

    users[index] = updatedUser;

    response.json(updatedUser);
};

const deleteUser = (request, response)=> {
    const id = Number(request.params.id);

    const index = users.findIndex((user)=> user.id === id);
    if(index === -1){
        return response.status(404).send("User not Found");
    }

    users.splice(index, 1);

    response.send("User deleted");
};

export { getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};