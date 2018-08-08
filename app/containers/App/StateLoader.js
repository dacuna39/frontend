class StateLoader {

	loadState() {
		try {
			let serializedState = localStorage.getItem("TutorFind:state");

			if (serializedState === null) {
				return this.initializeState();
			}

			return JSON.parse(serializedState);
		}
		catch (err) {
			return this.initializeState();
		}
	}

	saveState(state) {
		try {
			let serializedState = JSON.stringify(state);
			localStorage.setItem("TutorFind:state", serializedState);

		}
		catch (err) {
		}
	}

	initializeState() {
		return {
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
			rating: { "0": "0" }
		}
	};
}


export default StateLoader;