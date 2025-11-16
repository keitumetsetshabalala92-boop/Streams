function playSample() {
  alert("Playing a sample track from Streams...");
}

function toggleAuth() {
  const modal = document.getElementById("authModal");
  modal.classList.toggle("hidden");
}

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user && pass) {
    alert(`Welcome back, ${user}!`);
    toggleAuth();
  } else {
    alert("Please enter both username and password.");
  }
}

// Simulated playlist from Apple Music, Spotify, and Tidal
const tracks = [
  { title: "Blinding Lights", artist: "The Weeknd", source: "Apple Music" },
  { title: "Levitating", artist: "Dua Lipa", source: "Spotify" },
  { title: "Family Feud", artist: "Jay-Z", source: "Tidal" }
];

const trackList = document.getElementById("trackList");
tracks.forEach(track => {
  const li = document.createElement("li");
  li.textContent = `${track.title} - ${track.artist} [${track.source}]`;
  trackList.appendChild(li);
});const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Mock API endpoints
app.get('/api/apple-music', (req, res) => {
  res.json([
    { title: 'Midnight Rain', artist: 'Taylor Swift', source: 'Apple Music' },
    { title: 'Peaches', artist: 'Justin Bieber', source: 'Apple Music' }
  ]);
});

app.get('/api/spotify', (req, res) => {
  res.json([
    { title: 'As It Was', artist: 'Harry Styles', source: 'Spotify' },
    { title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', source: 'Spotify' }
  ]);
});

app.get('/api/tidal', (req, res) => {
  res.json([
    { title: 'Apeshit', artist: 'The Carters', source: 'Tidal' },
    { title: 'Ultralight Beam', artist: 'Kanye West', source: 'Tidal' }
  ]);
});

app.listen(PORT, () => {
  console.log(`Streams backend running at http://localhost:${PORT}`);
}async function fetchTracks() {
  const sources = ['apple-music', 'spotify', 'tidal'];
  const trackList = document.getElementById("trackList");
  trackList.innerHTML = '';

  for (const source of sources) {
    const res = await fetch(`/api/${source}`);
    const data = await res.json();
    data.forEach(track => {
      const li = document.createElement("li");
      li.textContent = `${track.title} - ${track.artist} [${track.source}]`;
      trackList.appendChild(li);
    });
  }
}

window.onload = fetchTracks;async function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const res = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    alert('Signup successful! You can now log in.');
  } else {
    alert('Signup failed.');
  }
}

async function checkUser() {
  const res = await fetch('/api/user');
  if (res.ok) {
    const data = await res.json();
    document.getElementById("welcomeMsg").textContent = `Welcome, ${data.user}!`;
    document.getElementById("dashboard").classList.remove("hidden");
  }
}

async function logout() {
  await fetch('/api/logout');
  location.reload();
}

window.onload = () => {
  fetchTracks();
  checkUser();
};