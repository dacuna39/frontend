export const loadProfile = (user) => {
    return{
        type: "UPDATE_PROFILE",
        payload: user //will set state to this variable
    }
}