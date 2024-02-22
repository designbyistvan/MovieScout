const auth  = "8250387e5f5ad66cb0700b6924f5e369"; 
const movies = document.querySelector(".movies");
const searchInput = document.querySelector(".searchInput");  
const form = document.querySelector(".searchForm"); 
let searchValue; 

searchInput.addEventListener('input', updateInput);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    searchMovies(searchValue);
});

function updateInput(e) {
    searchValue = e.target.value;
}

async function curatedMovies() {
    
    const dataFetch = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=8250387e5f5ad66cb0700b6924f5e369");
    const data = await dataFetch.json();

    console.log(data); 

    data.results.forEach(movie => {
        
        const backdropPath = movie.poster_path;
        const title = movie.title;
        const overview = movie.overview; 

        if (backdropPath) {
            const imageUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;
            const moviesImg = document.createElement("div");
            
            moviesImg.classList.add("moviesImg");
            moviesImg.innerHTML = `
                <img src="${imageUrl}" alt="${movie.title}">
                <div class="movieInfo">
                <h3>${title}</h3>
                <p>${overview}</p>
                </div>
                `;
            movies.appendChild(moviesImg);
        }
    });
}

async function searchMovies(query) {
    
    const dataFetch = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=8250387e5f5ad66cb0700b6924f5e369&query=${query}`);
    const data = await dataFetch.json();

    movies.innerHTML = '';
    searchInput.value = ''; 

    data.results.forEach(movie => {

        const backdropPath = movie.poster_path;
        const title = movie.title;
        const overview = movie.overview; 

        if (backdropPath) {
            const imageUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;
            const moviesImg = document.createElement("div");
            moviesImg.classList.add("moviesImg");
            moviesImg.innerHTML = `
                <img src="${imageUrl}" alt="${movie.title}">
                <div class="movieInfo">
                <h3>${title}</h3>
                <p>${overview}</p>
                </div>
                `;
            movies.appendChild(moviesImg);
        }
    });
}

curatedMovies();