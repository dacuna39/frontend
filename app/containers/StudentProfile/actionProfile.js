export const actionProfile = (fName) => {
    console.log("You clicked on user (props): ", fName);
    return{
        type: "USER_SELECTED",
        payload: fName
    }
}