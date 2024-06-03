import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
	getAuth,
	signOut,
	onAuthStateChanged,
	sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
	getDatabase,
	ref,
	set,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
const database = getDatabase(app);

const havenTag = document.getElementById("haven-tag");
const nameTag = document.getElementById("name-tag");
const numberTag = document.getElementById("number-tag");
const xboxTag = document.getElementById("xbox-tag");
const psnTag = document.getElementById("psn-tag");
const steamTag = document.getElementById("steam-tag");
const wowTag = document.getElementById("wow-tag");
const submitBttn = document.getElementById("submit");

let uId = havenTag.value;
let uName = nameTag;
let uNumber = numberTag;
let uXbox = xboxTag;

// onAuthStateChanged(auth, function (user) {
// 	if (user) {
// 		const currentUser = auth.currentUser;
// 		document.getElementById("email").value = currentUser.email;
// 		document.getElementById("username").value = currentUser.displayName;
// 	} else {
// 		window.location.href = "index.html";
// 	}
// });

// const logout = document.getElementById("logout");
// logout.addEventListener("click", function (event) {
// 	event.preventDefault();
// 	signOut(auth)
// 		.then(function () {
// 			alert("Logging out...");
// 			window.location.href = "signup.html";
// 		})
// 		.catch(function () {
// 			alert("Error, can't logout...");
// 		});
// });

const confirmReset = document.getElementById("info-save");
confirmReset.addEventListener("click", function (event) {
	event.preventDefault();
	console.log(
		havenTag.value,
		numberTag.value,
		xboxTag.value,
		psnTag.value,
		steamTag.value,
		wowTag.value
	);
	writeUserData(
		havenTag.value,
		numberTag.value,
		xboxTag.value,
		psnTag.value,
		steamTag.value,
		wowTag.value
	);
	alert("created database")
		.then(function () {
			alert("created database");
		})
		.catch(function (error) {
			alert(error.message);
		});
});

function writeUserData(uName, uNumber, uXbox, uPsn, uSteam, uWow) {
	const db = getDatabase();
	const user = auth.currentUser;
	if (user) {
		const userId = user.uid; // Get the Firebase Authentication UID
		set(ref(db, "users/" + userId), {
			username: uName,
			phone: uNumber,
			xboxtag: uXbox,
			psntag: uPsn,
			steamtag: uSteam,
			wowtag: uWow,
		});
	} else {
		console.error("User not authenticated.");
		// Handle the case where the user is not authenticated
	}
}
