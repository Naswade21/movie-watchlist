const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search')
const watchContent = document.getElementById('watch-content')
const movieContent = document.getElementById('movie-content')
export let watchArr = []

document.addEventListener('click', (e) => {
    if(e.target.dataset.movie){
        //Some function
    }
})

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const res = await fetch(`http://www.omdbapi.com/?apikey=440110a8&s=${searchInput.value}`)
    const data = await res.json()

  
   let newArr = data.Search.map((movie) => {
        return movie.Title
   })

   renderMovies(newArr)
})

const getMovieInfo = async (arr) => {
    let html = ``
    for(let movies of arr){
        const res = await fetch(`http://www.omdbapi.com/?apikey=440110a8&t=${movies}`)
        const data = await res.json()

        for(let theatre of data){
            html += `
        <div class="movie-item">
            <img src="${theatre.Poster}">
            <div class="movie-content"
                <div class="movie-title">${theatre.Title} <i class="fa-solid fa-star"></i> <p id="rating">${theatre.imdbRating}</p></div>
                <div><div>${theatre.Runtime}</div><div>${theatre.Genre}</div><button data-movie="${theatre.imdbID}">Watchlist</button></div>
                <p>${theatre.Plot}</p>
            </div>
        </div>`
        }
    }

    return html
}

const renderMovies = (arr) => {
    return movieContent.innerHTML = getMovieInfo(arr)
}

/*
Actors
: 
"Chris Evans, Samuel L. Jackson, Scarlett Johansson"
Awards
: 
"Nominated for 1 Oscar. 5 wins & 52 nominations total"
BoxOffice
: 
"$259,766,572"
Country
: 
"United States"
DVD
: 
"N/A"
Director
: 
"Anthony Russo, Joe Russo"
Genre
: 
"Action, Adventure, Sci-Fi"
Language
: 
"English, French"
Metascore
: 
"70"
Plot
: 
"As Steve Rogers struggles to embrace his role in the modern world, he teams up with a fellow Avenger and S.H.I.E.L.D agent, Black Widow, to battle a new threat from history: an assassin known as the Winter Soldier."
Poster
: 
"https://m.media-amazon.com/images/M/MV5BNWY1NjFmNDItZDhmOC00NjI1LWE0ZDItMTM0MjBjZThiOTQ2XkEyXkFqcGc@._V1_SX300.jpg"
Production
: 
"N/A"
Rated
: 
"PG-13"
Ratings
: 
(3) [{…}, {…}, {…}]
Released
: 
"04 Apr 2014"
Response
: 
"True"
Runtime
: 
"136 min"
Title
: 
"Captain America: The Winter Soldier"
Type
: 
"movie"
Website
: 
"N/A"
Writer
: 
"Christopher Markus, Stephen McFeely, Joe Simon"
Year
: 
"2014"
imdbID
: 
"tt1843866"
imdbRating
: 
"7.7"
imdbVotes
: 
"951,315"
*/
