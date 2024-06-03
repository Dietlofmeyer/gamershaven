import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
	getAuth,
	signInWithEmailAndPassword,
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

const submit = document.getElementById("submit");

submit.addEventListener("click", function (event) {
	event.preventDefault();

	// Get email and password values after clicking the submit button
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	// Check if email and password are not empty
	if (email.trim() === "" || password.trim() === "") {
		alert("Email and password cannot be empty");
		return;
	}

	// Check if the email is in the correct format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		alert("Invalid email format");
		return;
	}

	// Check if the password is at least 6 characters long
	if (password.length < 6) {
		alert("Password must be at least 6 characters long");
		return;
	}

	// Create user with email and password
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed up
			const user = userCredential.user;
			alert("logging in...");
			window.location.href = "dashboard.html";
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			alert(errorMessage);
			// ..
		});
});
