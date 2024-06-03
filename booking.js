import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
	getAuth,
	onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
	getDatabase,
	ref,
	push,
	serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", function () {
	const bookingForm = document.getElementById("bookingForm");

	bookingForm.addEventListener("submit", function (event) {
		event.preventDefault();

		onAuthStateChanged(auth, (user) => {
			if (!user) {
				alert("You need to be logged in to make a booking.");
				return;
			}

			const bookingDate = document.getElementById("bookingDate").value;
			const bookingTime = document.getElementById("bookingTime").value;
			const numberOfPeople = document.getElementById("numberOfPeople").value;
			const consoleType = document.getElementById("consoleType").value;

			const bookingData = {
				date: bookingDate,
				time: bookingTime,
				numberOfPeople: numberOfPeople,
				consoleType: consoleType,
				timestamp: serverTimestamp(),
			};

			const userId = user.uid;
			const bookingsRef = ref(database, "users/" + userId + "/bookings");

			push(bookingsRef, bookingData)
				.then(() => {
					alert("Booking successful!");
					bookingForm.reset();
				})
				.catch((error) => {
					console.error("Error saving booking: ", error);
					alert("Error making booking. Please try again.");
				});
		});
	});
});
