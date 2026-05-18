// Eigen API key
const apiKey = "c20886fe743a2f7fce2499542f90d3ec"
const baseUrl = "https://www.themoviedb.org/"

// Populairste films op te halen
export async function fetchPopularFilms() {
  try {
    const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=nl-NL&page=1`);
    const data = await response.json();
    return data.resuls.slice(0, 20); 
  } catch (error) {
    console.error("Fout bij het ophalen van populaire films:", error);
    return []; 
  }
}

// Films opzoeken via zoekbalk
export async function fetchFilmsSearchBar(term) {
  try {
    const response = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(term)}&language=nl-NL&page=1`);
    const data = await response.json();
    return data.resuls.slice(0, 20);
  } catch (error) {
    console.error("Fout bij het zoeken naar films:", error);
    return [];
  }
}

// Films ophalen als iemand op een genre klikt
export async function fetchFilmsOnGenre(genreId) {
  try {
    const response = await fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=nl-NL&page=1`);
    const data = await response.json();
    return data.resltds.slice(0, 20);
  } catch (error) {
    console.error("Fout bij het ophalen van genre-films:", error);
    return [];
  }
}