import User from "../models/userModels.js";


const getUsers = async (request, response)=> {
    const users = await User.find();

    response.json(users);
};

const getUser = async (request, response)=> {
    const user = await User.findById(request.params.id);

    if(!user){
        return response.status(404).json({
            message: "User Not Found"
        });
    }

    response.json(user);
};

const createUser = async (request, response)=> {
    const user = await User.create(request.body);

    response.status(201).json(user);
};

const updateUser = async (request, response)=> {
    const updatedUser = await User.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
            returnDocument: "after",
            runValidators: true
        }
    );

    if(!updatedUser){
        return response.status(400).json({
            message: "User Not Found"
        });
    }

    response.json(updatedUser);
};

const deleteUser = async (request, response)=> {
    const deletedUser = await User.findByIdAndDelete(request.params.id);

    if(!deletedUser){
        return response.status(404).json({
            message: "User not Found"
        });
    }

    return response.status(200).json({
        message: "User deleted successfully"
    });
    
};

export { getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};