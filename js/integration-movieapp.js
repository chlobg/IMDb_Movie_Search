document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "5b1d78fc";
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const movieList = document.getElementById("movieList");
  const noResult = document.getElementById("noResult");

  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  async function handleSearch() {
    const query = searchInput.value.trim();
    movieList.innerHTML = "";
    noResult.style.display = "none";

    if (!query) return;

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      const data = await response.json();

      if (data.Response === "False") {
        noResult.style.display = "block";
        return;
      }

      data.Search.forEach((movie) => {
        const card = document.createElement("div");
        card.classList.add("movie__card");

        card.innerHTML = `
  <img src="${
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/200x300?text=No+Poster"
  }" alt="${movie.Title}" class="movie__poster"/>
  <h3 class="movie__title">${movie.Title}</h3>
  <div class="movie__footer">
    <span class="movie__year">
      <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 
                 0-2 .9-2 2v16c0 1.1.9 2 2 
                 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 
                 18H4V8h16v13z"></path>
      </svg>
      ${movie.Year}
    </span>
    <button class="movie__fav">
      <svg class="MuiSvgIcon-root" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21.35l-1.45-1.32C5.4 
                 15.36 2 12.28 2 8.5 2 5.42 4.42 
                 3 7.5 3c1.74 0 3.41.81 4.5 
                 2.09C13.09 3.81 14.76 3 16.5 3 
                 19.58 3 22 5.42 22 8.5c0 
                 3.78-3.4 6.86-8.55 11.54L12 
                 21.35z"></path>
      </svg>
    </button>
  </div>`;

        movieList.appendChild(card);
      });
    } catch (error) {
      console.error("Fetch error:", error);
      noResult.style.display = "block";
      noResult.textContent = "An error occurred while fetching data.";
    }
  }
});
