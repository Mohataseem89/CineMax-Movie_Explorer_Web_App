# CineMax - Movie Explorer & Watchlist App

A beautiful, fast, and responsive movie browsing app built with **React**, **Vite**, **Tailwind CSS**, and **TMDb API**. CineMax lets you discover trending movies, search by genre, view detailed information, and curate your personal watchlist.


[Cinemax](https://cine-maxapp.vercel.app/)


---

##  Features

*  **Explore Movies** – Browse trending and popular movies from TMDb.
*  **Search & Filter** – Search movies by title and filter by genre.
*  **Detailed View** – Get full movie info: rating, release, runtime, overview, and genres.
*  **Watchlist** – Add/remove movies to your personal watchlist (saved using `localStorage`).
*  **Client-side Routing** – Built with React Router for seamless navigation.
*  **Responsive UI** – Works great on mobile, tablet, and desktop.
*  **Blazing Fast** – Built using Vite and optimized Tailwind CSS.

---

##  Tech Stack

| Tech             | Description                      |
| ---------------- | -------------------------------- |
|  React         | JavaScript library for UI        |
|  React Router | SPA routing                      |
|  Tailwind CSS  | Utility-first CSS framework      |
|  Vite           | Next-generation frontend tooling |
|  TMDb API      | Movie data API                   |

---

##  Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/your-username/cinemax.git
cd cinemax
npm install
```

Start the development server:

```bash
npm run dev
```

---

##  API Key Setup

This app uses the [TMDb API](https://www.themoviedb.org/documentation/api). To run the app:

1. Create a free TMDb account and generate an API key.
2. Replace the hardcoded API key in the fetch URLs:

   ```js
   const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY`);
   ```

> (Optional: Move this to `.env` for better security.)

---

##  Project Structure

```
##  Folder Structure

```bash
CinepMax/
├── node_modules/
│   
├── src/
│   ├── components/
│   │   ├── Banner.jsx
│   │   ├── MovieCards.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── Movies.jsx
│   │   ├── Navbar.jsx
│   │   ├── Pagination.jsx
│   │   └── WatchList.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
├── .gitignore
├── package.json
└── index.html
├── package-lock.json
├── vite.config.js
├── README.md
└── logofav.jpg

```

---

##  Deployment

You can deploy this app easily on:

* [Netlify](https://netlify.com)
* [Vercel](https://vercel.com)

> If you're using **React Router**, don’t forget to add a `_redirects` file for Netlify:

```
/*    /index.html   200
```

---

##  Upcoming Enhancements

*  Lazy loading images for faster performance
*  Dark/light mode toggle
*  Genre-based movie discovery
*  PWA support for offline access

---

##  Acknowledgements

* [TMDb API](https://www.themoviedb.org/)
* [Lucide Icons](https://lucide.dev/)
* [Tailwind UI Inspiration](https://tailwindui.com/)

---

##  Author

**Mohataseem Khan**
 Connect with me: [LinkedIn](https://www.linkedin.com/in/mohataseem-khan/) • [GitHub](https://github.com/Mohataseem89)

---





---

> Made with ❤️ for movie lovers.
