export default function (state=
    
    {
        userId: 1000,
		userName: "ramgav",
		email: "ram@.com",
		password: "yeeezy",
		salt: "1234",
        userType: "student",
        
        legalFirstName: "Ryan",
        legalLastName: "Gaviola",
        bio: "deadass",
		img: "smile.jpg",
		active: true,

		major: "major", //student props
		minor: "minor",
		creationDate: 100000000000000,

		degrees: "Degrees", //tutor props
		links: "links",
		timestamp: 100000000000000,
		ratings: []
    }

    , action){
    switch(action.type) {

        case "SET_FNAME":
            state.legalFirstName = action.payload;
            console.log("SET_FNAME action payload: ", action.payload);
            console.log("state legalFirstName: ", state.legalFirstName);
            console.log("state: ", state);
            return state;
        
        case "UPDATE_USER":
            return action.payload;

    }
    return state;
}