document.addEventListener("DOMContentLoaded", async () => {
  const API_KEY = "5b1d78fc";
  const params = new URLSearchParams(window.location.search);
  const imdbID = params.get("id");
  const detailsContainer = document.getElementById("movieDetails");

  if (!imdbID) {
    detailsContainer.innerHTML = "<p>No movie selected.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
    );
    const movie = await response.json();

    if (movie.Response === "False") {
      detailsContainer.innerHTML = "<p>Movie details not found.</p>";
      return;
    }

    detailsContainer.innerHTML = `
 
        <!-- Poster -->
        <div class="details__poster">
          <img src="${
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Poster"
          }" alt="${movie.Title}" />
        </div>

        <!-- Contenu -->
        <div class="details__content">
          <div class="details__header">
            <div class="details__title">${movie.Title}</div>
            <div class="details__rating">
              <svg class="details__star" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24
                         l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46
                         4.73L5.82 21z"></path>
              </svg>
              <div style="    display: flex
;
    flex-direction: column;">
              <span class="details__score">${movie.imdbRating}/10</span>
              <span class="details__votes">${movie.imdbVotes}</span>
              </div>
            </div>
          </div>

          <p class="details__meta">
            ${movie.Year} | ${movie.Rated} | ${movie.Released} | ${
      movie.Runtime
    }
          </p>

          <p class="details__plot">${movie.Plot}</p>

          <dl class="details__info-list">
            <dt>Genre :</dt><dd>${movie.Genre}</dd>
            <dt>Director :</dt><dd>${movie.Director}</dd>
            <dt>Writer :</dt><dd>${movie.Writer}</dd>
            <dt>Actors :</dt><dd>${movie.Actors}</dd>
            <dt>Language :</dt><dd>${movie.Language}</dd>
            <dt>Country :</dt><dd>${movie.Country}</dd>
            <dt>Awards :</dt><dd>${movie.Awards}</dd>
            <dt>Production :</dt><dd>${movie.Production || "N/A"}</dd>
          </dl>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    detailsContainer.innerHTML = "<p>Error loading details.</p>";
  }
});
