# 🚀 CryptoTracker

CryptoTracker is a modern, fully responsive React web application that allows users to track real-time cryptocurrency prices, compare coins, visualize detailed coin statistics, and maintain a personalized watchlist. Built using React, Framer Motion, and CoinGecko's public API, it delivers an interactive user experience with beautiful dark UI styling.

---

## ✨ Features

### 🔘 Home Page
- Modern landing page with animated heading using *CSS stroke effects* and *Framer Motion*
- Highlights the core purpose of the app
- Navigation buttons to Dashboard and Share
- Share feature to share the app on social platforms

### 📊 Dashboard
- View coins in both *card* and *list* formats
- Each coin shows:
  - Current price
  - Price change in the last 24 hours (with color-coded up/down)
  - Market Cap
  - Total Volume
- *Star icon* to add/remove coins from Watchlist
- *Clicking on a coin* navigates to its detailed page

### 🔍 Coin Page
- Detailed coin description (expandable with "Read More"/"Read Less")
- Interactive chart using react-chartjs-2:
  - Time range: 1 Day, 7 Days, 30 Days, 1 Year
  - Data types: Price, Market Cap, Total Volume
- Dark-styled chart with smooth transitions and green-themed accent

### ⚖ Compare Page
- Select and compare two coins
- Side-by-side comparison of descriptions and stats
- Download comparison as *PDF*
- Price change timeline: 24h, 7d, 30d, 1y

### ⭐ Watchlist
- View coins marked with star
- Real-time update: removing a coin updates the list without refreshing

### 📱 Responsive
- Fully responsive UI with *mobile drawer navigation*
- Styled with *dark theme and green accent*

---

## 🛠 Built With

- *React.js*
- *Framer Motion* – for smooth animations
- *Chart.js* via react-chartjs-2
- *CoinGecko API* – for real-time crypto data
- *React Router*
- *CSS (with custom dark theme & stroke effects)*

---

## 📁 Folder Structure

src/
│
├── assets/ # Images and icons
├── components/ # Reusable UI components
│ ├── Coin/ # Coin cards, charts, descriptions
│ ├── Common/ # Navbar, Footer, Loader, etc.
│ ├── Compare/ # ComparePage logic
│ ├── Dashboard/ # Grid/List views, Search, Tabs
│ ├── LandingPage/ # Home component
│ └── Share/ # Share popup modal
│
├── functions/ # Utility functions (convert, fetch, etc.)
├── pages/ # Route-based pages
│
├── App.js # Main app layout
├── index.js # App entry point
└── style.css # Global styles

---

📷 Screenshots


<img width="1889" height="921" alt="image" src="https://github.com/user-attachments/assets/f09ac3f0-219d-4b4b-b187-2dd3d42f6cf7" />
<img width="1862" height="891" alt="image" src="https://github.com/user-attachments/assets/e252cfd5-49b4-4bb8-b889-7cde4665d185" />
<img width="1714" height="510" alt="image" src="https://github.com/user-attachments/assets/0c8da17a-5f3e-401f-8234-99fcd04665d1" />


🙌 Acknowledgements
CoinGecko API

Chart.js

Framer Motion

🧑‍💻 Author
Made with (◕‿◕)  by Akash

📌 License
Open-source under MIT License.

Live-link 
cryptotrackerapp-jade.vercel.app
