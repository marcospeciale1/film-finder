// function to call API

async function getData(titolo) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
        titolo
      )}`
    );
    return await response.json();
  } catch (error) {
    console.error("Errore nella richiesta:", error);
    return null;
  }
}

//fucntion to append data to html
function appendData(data) {
  const container = document.getElementById("film-container");

  if (!data || !data.Title) {
    container.innerHTML += "<p>❌ Film non trovato</p>";
  } else {
    container.innerHTML += `
      <div class="card">
        <h2>${data.Title}</h2>
        <img src="${data.Poster}" alt="${data.Title}">
        <p>${data.Plot}</p>
        <p><strong>Genere:</strong> ${data.Genre}</p>
        <p><strong>Durata:</strong> ${data.Runtime}</p>
        <p><strong>Voto IMDb:</strong> ${data.imdbRating}</p>
        <p><strong>Lingua:</strong> ${data.Language}</p>
      </div>
    `;
  }
}
// function to search film

async function searchFilm() {
  const searchBar = document.querySelector('input[type="search"]');
  const titolo = searchBar.value.trim();

  if (!titolo) return;

  const data = await getData(titolo);
  document.getElementById("film-container").innerHTML = ""; // svuota prima
  appendData(data);
}

document.addEventListener("DOMContentLoaded", () => {
  appendData();
  searchFilm();
});
