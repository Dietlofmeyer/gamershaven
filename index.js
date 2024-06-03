import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
	getAuth,
	onAuthStateChanged,
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to update navbar based on authentication status
const updateNavbar = (user) => {
	const navbarOptions = document.getElementById("navbarSupportedContent");
	navbarOptions.innerHTML = ""; // Clear existing navbar options

	const navList = document.createElement("ul");
	navList.classList.add("navbar-nav", "me-auto", "mb-2", "mb-lg-0");

	if (user) {
		// User is signed in
		const myAccountOption = document.createElement("li");
		myAccountOption.classList.add("nav-item");
		myAccountOption.innerHTML = `
            <a class="nav-link active text-white fw-bold mt-1" href="dashboard.html">My Account</a>
        `;
		navList.appendChild(myAccountOption);
	} else {
		// User is not signed in
		const registerOption = document.createElement("li");
		registerOption.classList.add("nav-item");
		registerOption.innerHTML = `
            <a class="nav-link active text-white fw-bold mt-1" href="signup.html">Register</a>
        `;
		navList.appendChild(registerOption);

		const loginOption = document.createElement("li");
		loginOption.classList.add("nav-item");
		loginOption.innerHTML = `
            <a class="nav-link active text-white fw-bold mt-1" href="signin.html">Login</a>
        `;
		navList.appendChild(loginOption);
	}

	navbarOptions.appendChild(navList);
};

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
	updateNavbar(user); // Update navbar based on authentication status
});

// Check if user is logged in and update button text and onclick accordingly
auth.onAuthStateChanged((user) => {
	const button = document.getElementById("index-button");
	if (user) {
		button.textContent = "Book Now";
		button.onclick = () => {
			window.location.href = "booking.html";
		};
	} else {
		button.textContent = "Get started";
		button.onclick = () => {
			window.location.href = "signup.html";
		};
	}
});
