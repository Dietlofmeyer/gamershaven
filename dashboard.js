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
	child,
	get,
	onValue,
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
const dbRef = ref(database);

auth.onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in, get the UID
		const currentUserUid = user.uid;
		console.log("Current User UID:", currentUserUid);

		// Fetch user profile data
		get(child(dbRef, "users/" + currentUserUid))
			.then((snapshot) => {
				if (snapshot.exists()) {
					const dataContainer = document.getElementById("data-container");
					const userData = snapshot.val();
					console.log("User Data:", userData);

					// Display the user profile data
					dataContainer.innerHTML = formatUserData(userData);

					// Fetch booking data
					const bookingsRef = ref(
						database,
						"users/" + currentUserUid + "/bookings"
					);
					onValue(bookingsRef, (bookingSnapshot) => {
						if (bookingSnapshot.exists()) {
							const bookings = bookingSnapshot.val();
							const bookingHtml = formatBookingData(bookings);
							dataContainer.innerHTML += bookingHtml;
						} else {
							const noBookingsHtml = `
                                <div class="card my-5 p-3">
                                    <h5>No bookings made yet.</h5>
                                </div>
                            `;
							dataContainer.innerHTML += noBookingsHtml;
						}

						// Add booking button
						const bookingButton = document.createElement("a");
						bookingButton.href = "booking.html";
						bookingButton.className = "btn btn-primary m-3";
						bookingButton.textContent = "Make a Booking";
						dataContainer.appendChild(bookingButton);
						dataContainer.style.marginTop = "4rem"; // Adjust the value according to your header height
					});
				} else {
					console.log("No data available");
				}
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
			});
	} else {
		// User is signed out
		console.log("User is signed out");
		const dataContainer = document.getElementById("data-container");
		dataContainer.innerHTML = `
            <div class="alert alert-warning" role="alert">
                You need to be logged in to view your profile and bookings. <a href="login.html" class="alert-link">Login here</a>.
            </div>
        `;
	}
});

function formatUserData(userData) {
	let html = "";

	if (userData) {
		let userHtml = "";

		if (userData.username) {
			userHtml += `<h5 class="card-title text-center">${userData.username}</h5>`;
		}

		if (userData.phone) {
			userHtml += `<h5 class="card-title"> Phone number: ${userData.phone}</h5>`;
		}

		if (userData.steamtag) {
			userHtml += `<h5 class="card-title">Steam Tag:  ${userData.steamtag}</h5>`;
		}

		if (userData.psntag) {
			userHtml += `<h5 class="card-title">PSN Tag:  ${userData.psntag}</h5>`;
		}

		if (userData.xboxtag) {
			userHtml += `<h5 class="card-title">Xbox LIVE Tag: ${userData.xboxtag}</h5>`;
		}

		if (userData.wowtag) {
			userHtml += `<h5 class="card-title">Wow main:  ${userData.wowtag}</h5>`;
		}

		// Render the card
		html += `
            <div class="card  border-0 bg-light rounded-3 shadow w-25 m-3">
                <div class="card-body">
                    ${userHtml}
                    <button type="button" id="button" class="btn btn-primary w-100 text-white">
                        <a href="dashboardEdit.html" class="text-white">Edit Profile</a>
                    </button>
                </div>
            </div>
        `;
	}

	return html;
}

function formatBookingData(bookings) {
	let bookingHtml = "";
	Object.keys(bookings).forEach((key) => {
		const booking = bookings[key];
		bookingHtml += `
            <div class="booking-item card w-25 m-3 p-3">
                <h5>Booking Details</h5>
                <p>Date: ${booking.date}</p>
                <p>Time: ${booking.time}</p>
                <p>Number of People: ${booking.numberOfPeople}</p>
                <p>Console: ${booking.consoleType}</p>
            </div>
        `;
	});

	return bookingHtml;
}

auth.onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in, get the UID
		const currentUserUid = user.uid;
		console.log("Current User UID:", currentUserUid);

		// Fetch user profile data
		get(child(dbRef, "users/" + currentUserUid))
			.then((snapshot) => {
				if (snapshot.exists()) {
					const dataContainer = document.getElementById("data-container");
					const userData = snapshot.val();
					console.log("User Data:", userData);

					// Display the user profile data
					dataContainer.innerHTML = formatUserData(userData);

					// Fetch booking data
					const bookingsRef = ref(
						database,
						"users/" + currentUserUid + "/bookings"
					);
					onValue(bookingsRef, (bookingSnapshot) => {
						if (bookingSnapshot.exists()) {
							const bookings = bookingSnapshot.val();
							const bookingHtml = formatBookingData(bookings);
							dataContainer.innerHTML += bookingHtml;
						} else {
							const noBookingsHtml = `
                                <div class="card my-5 p-3">
                                    <h5>No bookings made yet.</h5>
                                </div>
                            `;
							dataContainer.innerHTML += noBookingsHtml;
						}

						// Add booking button
						const bookingButton = document.createElement("a");
						bookingButton.href = "booking.html";
						bookingButton.className = "btn btn-primary m-3";
						bookingButton.textContent = "Make a Booking";
						dataContainer.appendChild(bookingButton);
						dataContainer.style.marginTop = "4rem"; // Adjust the value according to your header height
					});

					// Add sign-out button
					const signOutButton = document.createElement("button");
					signOutButton.textContent = "Sign Out";
					signOutButton.className = "btn btn-danger ";
					signOutButton.addEventListener("click", () => {
						signOut(auth)
							.then(() => {
								// Sign-out successful.
								console.log("User signed out successfully.");
								window.location.href = "index.html"; // Redirect to index.html after sign-out
							})
							.catch((error) => {
								// An error happened.
								console.error("Error signing out:", error);
							});
					});
					dataContainer.appendChild(signOutButton);
				} else {
					console.log("No data available");
				}
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
			});
	} else {
		// User is signed out
		console.log("User is signed out");
		const dataContainer = document.getElementById("data-container");
		dataContainer.innerHTML = `
            <div class="alert alert-warning" role="alert">
                You need to be logged in to view your profile and bookings. <a href="login.html" class="alert-link">Login here</a>.
            </div>
        `;
	}
});
