const STORAGE_KEY = "cinescope_Favorites";

//Haalt de lijst met favorieten op
export const getFavorite = () => {
  const opgeslagenData = localStorage.getItem(STORAGE_KEY);
  return opgeslagenData ? JSON.parse(opgeslagenData) : [];
};
 
//Film toevoegen of verwijderen
export const toggleFavorite = (movie) => {
  let Favorites = getFavorite();
  
  //Zit de film al in de lijst?
  const isAlFavorite = Favorites.some(item => item.id === movie.id);

  if (isAlFavorite) {
    // Verwijder de film
    Favorites = Favorites.filter(item => item.id !== movie.id);
  } else {
    // Voeg de film toe aan de lijst
    Favorites.push(movie);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(Favorites));
};

//Controleert of een specifieke film is opgeslagen 
export const isFavorite = (movieId) => {
  const Favorites = getFavorite();
  return Favorites.some(item => item.id === movieId);
};