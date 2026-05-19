const STORAGE_KEY = "cinescope_favorites";

//Haalt de lijst met favorieten op
export const getFavorite = () => {
  const opgeslagenData = localStorage.getItem(STORAGE_KEY);
  return opgeslagenData ? JSON.parse(opgeslagenData) : [];
};
 
//Film toevoegen of verwijderen
export const toggleFavorite = (movie) => {
  let favorites = getfavorites();
  
  //Zit de film al in de lijst?
  const isAlFavorite = favorites.some(item => item.id === movie.id);

  if (isAlfavorite) {
    // Verwijder de film
    favorites = favorites.filter(item => item.id !== movie.id);
  } else {
    // Voeg de film toe aan de lijst
    favorites.push(movie);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

//Controleert of een specifieke film is opgeslagen 
export const isfavorite = (movieId) => {
  const favorites = getfavorites();
  return favorites.some(item => item.id === movieId);
};