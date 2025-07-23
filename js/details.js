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
      <div class="details__poster">
        <img src="${
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Poster"
        }" alt="${movie.Title}" />
      </div>
      <div class="details__info">
        <h1>${movie.Title}</h1>
        <p>${movie.Year} | ${movie.Reates} | ${movie.Released} | ${
      movie.Runtime
    }</p>
        <p>${movie.Plot}</p>
        <p><strong>Genre :</strong> ${movie.Genre}</p>
        <p><strong>Director :</strong> ${movie.Director}</p>
         <p><strong>Writer :</strong> ${movie.Writer}</p>
        <p><strong>Actors :</strong> ${movie.Actors}</p>
        <p><strong>Languages :</strong> ${movie.Langauge}</p>
        <p><strong>Country :</strong> ${movie.Country}</p>
        <p><strong>Awards :</strong> ${movie.Awards}</p>
        <p><strong>Production :</strong> ${movie.Production}</p>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    detailsContainer.innerHTML = "<p>Error loading details.</p>";
  }
});
