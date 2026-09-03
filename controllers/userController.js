import User from "../models/userModels.js";


const getUsers = async (request, response)=> {
    const { age, minAge, maxAge, search, page = 1, limit = 10, sort } = request.query;

    let filter = {};
    let sortOption = {};

    if(sort){
        if(sort.startsWith("-")){
            sortOption[sort.substring(1)] = -1;
        } else {
            sortOption[sort] = 1;
        }
    }

    if(age){
        filter.age = Number(age);
    }
    else {
        if(minAge || maxAge){
            filter.age = {};
            if(minAge) filter.age.$gte = Number(minAge);
            if(maxAge) filter.age.$lte = Number(maxAge);
        }
    }
    if(search){
        filter.name = { $regex: search, $options: "i"};
    }

    const pageNumber = Number(page);
    if(Number.isNaN(pageNumber) || pageNumber < 1 || !Number.isInteger(pageNumber)){
        return response.status(400).json({
            message: "Invalid page"
        });
    }

    const numberLimit = Number(limit);
    if(Number.isNaN(numberLimit) || numberLimit < 1 || !Number.isInteger(numberLimit)){
        return response.status(400).json({
            message: "Invalid limit"
        });
    }

    if(numberLimit > 100){
        return response.status(400).json({
            message: "Limit cannot be greater than 100"
        });
    }

    const skip = (pageNumber - 1) * numberLimit;


    const users = await User.find(filter).sort(sortOption).skip(skip).limit(numberLimit);

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