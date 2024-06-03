import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBGxN3XrSl28rVhgZOPUHuIB-S7loRGYN0",
	authDomain: "gamers-haven-ba139.firebaseapp.com",
	databaseURL:
		"https://gamers-haven-ba139-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "gamers-haven-ba139",
	storageBucket: "gamers-haven-ba139.appspot.com",
	messagingSenderId: "912156742128",
	appId: "1:912156742128:web:ed9ec5ee16a6be32dc8d35",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
auth.languageCode = "en";

const google = document.getElementById("google");
google.addEventListener("click", function () {
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			window.location.href = "dashboard.html";
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
			alert(errorMessage);
		});
});
