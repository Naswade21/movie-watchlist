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

   console.log(getMovieArr(newArr))

})

const getMovieArr = (arr) => {
    let movArr = []
    for(let movie of arr){
        async () => {
            const res = await fetch(`http://www.omdbapi.com/?apikey=440110a8&t=${movie}`)
            const data = await res.json()
            return movArr.push(data)
        }
       }

       return movArr
}

const getMovieHtml = (arr) => {
    return arr.map((movie) => {
        return `
        <div class="movie-image">${movie.Poster}</div>
        <div class="movie-content">
            <div class="movie-title-wrap">
                <div>${movie.Title}</div>
                <i class="fa-solid fa-star"></i>
                <div>${movie.imdbRating}</div>
            </div>
            <div class="movie-detail-wrap">
                <div>${movie.Runtime}</div>
                <div>${movie.Genre}</div>
                <a data-movie="${movie.imdbID}"><i class="fa-solid fa-circle-plus"> Watchlist</a>
            </div>
            <p>${movie.Plot}</p>
        </div>
        `
    })
}

const renderMovies = (arr) => {
    return movieContent.innerHTML = getMovieHtml(arr)
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
