export const updateUser = (user) => {
    console.log("updating: ", user);
    return{
        type: "UPDATE_USER",
        payload: user
    }
}