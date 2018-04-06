export const actionProfile = (fName) => {
    console.log("You will set store's firstName to: ", fName);
    return{
        type: "SET_FNAME",
        payload: fName //will set state to this variable
    }
}