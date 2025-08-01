document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "5b1d78fc";
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const movieList = document.getElementById("movieList");
  const noResult = document.getElementById("noResult");

  let currentQuery = "man";
  let currentPage = 1;
  let isLoading = false;
  let totalPages = 1;

  showSkeletons(10);
  loadMovies(currentQuery, currentPage);

  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
      !isLoading &&
      currentPage < totalPages
    ) {
      currentPage++;
      showSkeletons(10);
      loadMovies(currentQuery, currentPage);
    }
  });

  async function loadMovies(query, page) {
    isLoading = true;

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`
      );
      const data = await response.json();

      if (data.Response === "False") {
        if (page === 1) {
          movieList.innerHTML = "";
          noResult.style.display = "block";
        }
        return;
      }

      noResult.style.display = "none";

      document
        .querySelectorAll(".movie__skeleton")
        .forEach((el) => el.remove());

      displayMovies(data.Search);

      totalPages = Math.ceil(data.totalResults / 10);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
      noResult.style.display = "block";
      noResult.textContent = "Movie not found!";
    } finally {
      isLoading = false;
    }
  }
  function showSkeletons(count = 10) {
    noResult.style.display = "none";
    for (let i = 0; i < count; i++) {
      const skeleton = document.createElement("div");
      skeleton.classList.add("movie__skeleton");
      skeleton.innerHTML = `
      <div class="movie__skeleton-poster"></div>
      <div class="movie__skeleton-title"></div>
      <div class="movie__skeleton-footer">
        <span></span>
        <button></button>
      </div>
    `;
      movieList.appendChild(skeleton);
    }
  }

  function displayMovies(movies) {
    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.classList.add("movie__card");

      const detailsPageUrl = `details.html?id=${movie.imdbID}`;

      card.innerHTML = `
      <img src="${
        movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/200x300?text=No+Poster"
      }" alt="${movie.Title}" class="movie__poster"/>
      
      <!-- Titre cliquable qui mène vers la page de détails -->
      <h3 class="movie__title">
        <a href="${detailsPageUrl}" style="color:white; text-decoration:none;">
          ${movie.Title}
        </a>
      </h3>

      <div class="movie__footer">
        <span class="movie__year">
          <svg viewBox="0 0 24 24"><path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 
                   0-2 .9-2 2v16c0 1.1.9 2 2 
                   2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 
                   18H4V8h16v13z"></path></svg>
          ${movie.Year}
        </span>
        <button class="movie__fav">
          <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 
                   15.36 2 12.28 2 8.5 2 5.42 4.42 
                   3 7.5 3c1.74 0 3.41.81 4.5 
                   2.09C13.09 3.81 14.76 3 16.5 3 
                   19.58 3 22 5.42 22 8.5c0 
                   3.78-3.4 6.86-8.55 11.54L12 
                   21.35z"></path></svg>
        </button>
      </div>
    `;

      movieList.appendChild(card);
    });
  }

  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  async function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    currentQuery = query;
    currentPage = 1;
    movieList.innerHTML = "";
    showSkeletons(10);
    await loadMovies(currentQuery, currentPage);
  }
});
