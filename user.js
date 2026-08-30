function createUser(name) {
    return `User ${name} created`;
}

function deleteUser(name) {
    return `User ${name} deleted`;
}

export default createUser;

export{
    deleteUser
};