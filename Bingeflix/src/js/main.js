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

  // Home page knop 
  async function gaNaarHome() {
    document.querySelector(".sectie-titel").textContent = "Populaire Films";

    document.getElementById("zoek-input").value = "";

    document.querySelectorAll('input[name="sort"]').forEach(radio => {
      radio.checked = false;
    });

    currentFilms = await fetchPopularFilms();
    renderFilms(currentFilms);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.getElementById("logo")
    ?.addEventListener("click", gaNaarHome);

  //zoekfunctie, Luisteren naar de zoekbalk
  const searchForm = document.getElementById('zoek-form');
  const searchInput = document.getElementById('zoek-input');

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


// Films filteren op genre 
  const genreLinks = document.querySelectorAll('.dropdown-content a');

  genreLinks.forEach(function(link) {
    link.addEventListener('click', async function(e) {
      e.preventDefault();
      
      const genreId = link.getAttribute('data-genre-id');
      const genreName = link.textContent;
      
      document.querySelector('.sectie-titel').textContent = `Genre: ${genreName}`;
      
      currentFilms = await fetchFilmsOnGenre(genreId);
      renderFilms(currentFilms);
    });
  });

  // Films uit favorieten tonen 
  const favoriteBtn = document.querySelector('.favoriteBtn');

  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', function() {
      document.querySelector('.sectie-titel').textContent = "🔖 My List (Saved)";
      
      currentFilms = getFavorite(); 
      renderFilms(currentFilms);
    });
  }

  // Films sorteren op titel of release datum
  const sortRadios = document.querySelectorAll('input[name="sort"]');

  sortRadios.forEach(function(radio) {
    radio.addEventListener('change', function() {
      const sortType = radio.value;
      let sortedFilms = [...currentFilms];

      // Eenvoudige sortering met standaard functies
      if (sortType === 'title.asc') {
        sortedFilms.sort(function(a, b) {
          return a.title.localeCompare(b.title);
        });
      } else if (sortType === 'release_date.desc') {
        sortedFilms.sort(function(a, b) {
          return new Date(b.release_date) - new Date(a.release_date);
        });
      } else if (sortType === 'release_date.asc') {
        sortedFilms.sort(function(a, b) {
          return new Date(a.release_date) - new Date(b.release_date);
        });
      }

      renderFilms(sortedFilms);
    });
  });

  // Darkmode aan en uit zetten 
  const themeToggleBtn = document.getElementById("lichtemodus");

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", function() {
      document.body.classList.toggle("light");
      
      const icon = themeToggleBtn.querySelector(".icoon");
      if (document.body.classList.contains("light")) {
        icon.textContent = "🌙"; 
      } else {
        icon.textContent = "☀️"; 
      }
    });
  }

  // Terug naar boven knop en observer instellen om smooth te scrollen 
  const backToTopBtn = document.getElementById('terugNaarBoven');
  const scrollWaitArea = document.querySelector('.scroll-wacht');

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });
  });

  if (scrollWaitArea) {
    observer.observe(scrollWaitArea);
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

// DROPDOWN MENU OPENEN EN SLUITEN
const dropBtn = document.querySelector('.dropbtn');
const dropdownContent = document.querySelector('.dropdown-content');

if (dropBtn && dropdownContent) {
  dropBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownContent.classList.toggle('show'); 
  });

  // Als je ergens anders op de pagina klikt: sluit het menu
  document.addEventListener('click', function() {
    if (dropdownContent.classList.contains('show')) {
      dropdownContent.classList.remove('show');
    }
  });
}