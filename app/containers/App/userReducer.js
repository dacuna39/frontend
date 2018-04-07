export default function (state=
    
    {
        userId: 0,
		userName: "userName",
		email: "default@tutorfind.com",
		password: "default",
		salt: "",
        userType: "",
        
        legalFirstName: "first",
        legalLastName: "last",
        bio: "",
		img: "",
		active: true,

		major: "", //student props
		minor: "",
		creationDate: 100000000000000,

		degrees: "", //tutor props
		links: "",
		timestamp: 100000000000000,
		ratings: []
    }

    , action){
    switch(action.type) {
        
        case "UPDATE_PROFILE":

            if (action.payload.userId == undefined){
                alert("Invalid Login");
                console.log("state: ", state);
                return state;
            }
            else {
                state.userId = action.payload.userId;
                state.userName = action.payload.userName;
                state.email = action.payload.email;
                state.password = action.payload.passhash;
                state.salt = action.payload.salt;
                state.userType = action.payload.userType;

                state.legalFirstName = action.payload.legalFirstName;
                state.legalLastName = action.payload.legalLastName;
                state.bio = action.payload.bio;
                state.img = action.payload.img;
                state.active = action.payload.active;

                state.major = action.payload.major; //student info
                state.minor = action.payload.minor;
                state.creationDate = action.payload.creationDate;

                state.degrees = action.payload.degrees; //tutor info
                state.links = action.payload.links;
                state.timestamp = action.payload.timestamp;
                state.ratings = action.payload.ratings;
            }

            console.log("state: ", state);
            return state;

    }
    return state;
}