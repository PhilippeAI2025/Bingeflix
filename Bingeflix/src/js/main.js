  import '../css/style.css'; 
  import { fetchPopularFilms, fetchFilmsSearchBar, fetchFilmsOnGenre } from './api.js'; 
  import { renderFilms } from './ui.js';
  import { getFavorite } from './storage.js';

  // De status van de applicatie in het geheugen
  let currentFilms = []; 

  //  App opstarten
  async function startApp() {
    currentFilms = await fetchPopularFilms();
    renderFilms(currentFilms);
  }
  startApp();

  //zoekfunctie, Luisteren naar de zoekbalk
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', async function(e) {
      e.preventDefault(); 
      const term = searchInput.value.trim();
      
      if (term !== "") {
        document.querySelector('.sectie-titel').textContent = `Zoekresultaten voor: "${term}"`;
        
        currentFilms = await fetchFilmsSearchBar(term);
        renderFilms(currentFilms);
        
        searchInput.value = ''; 
      }
    });
  }

