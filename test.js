import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js"
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import {
	getDatabase,
	onValue,
	push,
	ref
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js"

const firebaseConfig = {
	apiKey: "AIzaSyAgp_HJevPfp5aCBAKSGG6315DSroJAZuY",

	authDomain: "fireabase-example.firebaseapp.com",

	databaseURL: "https://fireabase-example-default-rtdb.firebaseio.com",

	projectId: "fireabase-example",

	storageBucket: "fireabase-example.appspot.com",

	messagingSenderId: "855794910735",

	appId: "1:855794910735:web:9f0af264cbd9a24c79c57a",

	measurementId: "G-KLVZLXEPW0"
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth()

// Dom elements
const loginBtn = document.querySelector("#login-btn")
const logoutBtn = document.querySelector("#logout-btn")
const usernameDiv = document.querySelector("#username")

// Leaflet setup
const map = L.map("map").setView([-25.754, 28.229], 18)

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 19,
	attribution: "© OpenStreetMap"
}).addTo(map)

let username = ""

loginBtn.addEventListener("click", () => {
	signInWithPopup(auth, new GoogleAuthProvider()).then((result) => {
		const user = result.user
		username = user.displayName
		usernameDiv.innerHTML = user.displayName
	})
})

// Logout
logoutBtn.addEventListener("click", () => {
	signOut(auth)
	username = ""
	usernameDiv.innerHTML = "Goodbye"
})

let marker = null

map.addEventListener("click", (event) => {
	// Create marker
	if (username) {
		const coords = event.latlng
		marker = L.marker()
		marker.setLatLng(event.latlng).addTo(map)

		// Save to DB
		push(ref(db, `users/${username}`), {
			coords
		})
	} else {
		alert("Please Login")
	}
})
