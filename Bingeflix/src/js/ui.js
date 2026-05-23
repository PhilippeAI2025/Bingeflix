import { isFavorite, toggleFavorite } from './storage.js';

// Tekent de lijst met films op het scherm
export function renderFilms(movies) {
  const filmContainer = document.querySelector(".films");
  
  filmContainer.innerHTML = ''; // Maakt container leeg bij nieuwe zoekopdracht

  // Melding als er geen resultaten zijn
  if (movies.length === 0) {
    filmContainer.innerHTML = '<p class="geen-resultaat">Geen films gevonden.</p>';
    return;
  }

  movies.forEach(function(movie) {
    if (!movie.poster_path) return; // Negeert films zonder poster

    // Maakt een nieuw HTML-element voor de filmkaart
    const filmCard = document.createElement("div");
    filmCard.classList.add("film-card");
    
    // Check opslagstatus voor het juiste knop-icoontje
    const isAlreadySaved = isFavorite(movie.id);
    
    // Vult de kaart met data 
    filmCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" loading="lazy" />
      <div class="film-info">
        <div class="film-header">
          <span class="titel-text">${movie.title}</span>
          <span class="save-btn ${isAlreadySaved ? 'saved' : ''}" data-id="${movie.id}">
            ${isAlreadySaved ? '♥' : '♡'}
          </span>
        </div>
        <div class="film-stats">
          <span>⭐ ${movie.vote_average.toFixed(1)}/10</span>
        </div>
      </div>
      <div class="film-overview">
        ${movie.overview || 'Geen samenvatting beschikbaar.'}
      </div>
    `;

    // Activeer de opslaan knop
    const saveBtn = filmCard.querySelector('.save-btn');
    saveBtn.addEventListener('click', function() {
      toggleFavorite(movie); // Pas geheugen aan
      
      // Werk icoon direct bij op het scherm
      const isNuOpgeslagen = isFavorite(movie.id);
      saveBtn.textContent = isNuOpgeslagen ? '♥' : '♡';
      saveBtn.classList.toggle('saved', isNuOpgeslagen);
    });

    // Plaats het gemaakte kaartje in de HTML
    filmContainer.appendChild(filmCard);
  });
}