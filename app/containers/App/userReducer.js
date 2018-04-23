export default function (state=
    
    {
        userId: 0,
		userName: "userName",
		email: "default@tutorfind.com",
		password: "default",
		salt: "",
        userType: [],
        subjects: [],
        
        legalFirstName: "first",
        legalLastName: "last",
        bio: "",
		img: "https:d30y9cdsu7xlg0.cloudfront.net/png/1095867-200.png",
		active: true,

		major: "", //student props
		minor: "",
		creationDate: 100000000000000,

		degrees: "", //tutor props
		links: "",
		timestamp: 100000000000000,
		rating: {"0":"0"}
    }

    , action){
    switch(action.type) {
        
        case "UPDATE_PROFILE":

            if (action.payload.userId == null){
                console.log("payloadId is undefined");
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
                state.subjects = action.payload.subjects;

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
                state.rating = action.payload.rating;

                //if (action.payload.rating == null){
                //    state.rating = {"0":"0"};
                //}
            }

            console.log("updated state: ", state);
            return state;

    }
    return state;
}