//Handle when there is no data present
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search')
const watchContent = document.getElementById('watch-content')
const movieContent = document.getElementById('movie-content')
let moviesFromLocalStorage = JSON.parse(localStorage.getItem("movieWatchList"))
let watchArr = []

if(!moviesFromLocalStorage){
    moviesFromLocalStorage = watchArr
    localStorage.setItem("movieWatchList", JSON.stringify(watchArr))
}


document.addEventListener('click', (e) => {
    if(e.target.dataset.movie){
        addMovieToList(e.target.dataset.movie)
    }
    else if(e.target.dataset.remove){
        removeMovieFromList(e.target.dataset.remove)
    }
})

if(searchForm){
    searchForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const res = await fetch(`http://www.omdbapi.com/?apikey=440110a8&s=${searchInput.value}`)
    const data = await res.json()

  
   let newArr = data.Search.map((movie) => {
        return movie.Title
   })

   const movieData = await getMovieArr(newArr)

   renderMovies(movieData)
})
}

const getMovieArr = async (arr) => {
    let movArr = arr.map(async (movie) => {
        const res = await fetch(`http://www.omdbapi.com/?apikey=440110a8&t=${movie}`)
        const data = await res.json()

        return data
    })

    return await Promise.all(movArr) 
}

const addMovieToList = async (movieId) => {

    const res = await fetch(`http://www.omdbapi.com/?apikey=440110a8&i=${movieId}`)
    const data = await res.json()

    //Ensure only unique id's are present in the watchlist

    let uniqueArr = []

    const movieIdAlreadyListed = {}

   for(let movie of moviesFromLocalStorage){
    const id = movie.imdbID

    if(!movieIdAlreadyListed[id]){
        uniqueArr.push(movie)

        movieIdAlreadyListed[id] = true
    }
   }

   moviesFromLocalStorage = uniqueArr

   moviesFromLocalStorage.push(data)

   localStorage.setItem("movieWatchList", JSON.stringify(moviesFromLocalStorage))
}

const removeMovieFromList = (movieId) => {
    moviesFromLocalStorage = moviesFromLocalStorage.filter((movie) => {
        if(movie.imdbID === movieId){
            return false
        }

        return true
    })

    localStorage.setItem("movieWatchList", JSON.stringify(moviesFromLocalStorage))

    renderWatchlist(moviesFromLocalStorage)
}


const getMovieHtml = (arr) => {
    return arr.map((movie) => {
        return `
        <div class="movie-item-wrap">
            <div class="movie-image"><img src="${movie.Poster}"></div>
            <div class="movie-content">
                <div class="movie-title-wrap">
                    <div>${movie.Title}</div>
                    <div><i class="fa-solid fa-star"></i></div>
                    <div>${movie.imdbRating}</div>
                </div>
                <div class="movie-detail-wrap">
                    <div>${movie.Runtime}</div>
                    <div>${movie.Genre}</div>
                    <div class="add">
                    <button class="watch-button" data-movie="${movie.imdbID}"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
                    </div>
                </div>
                <div class="movie-desc">
                    <p data-text="${movie.imdbID}">${movie.Plot}</p>
                    <input class="expand-btn" type="checkbox">
                </div>
            </div>
        </div>
        `
    }).join('')
}

const getWatchlistHtml = (arr) => {
    return arr.map((movie) => {
        return `<div class="movie-item-wrap">
            <div class="movie-image"><img src="${movie.Poster}"></div>
            <div class="movie-content">
                <div class="movie-title-wrap">
                    <div>${movie.Title}</div>
                    <div><i class="fa-solid fa-star"></i></div>
                    <div>${movie.imdbRating}</div>
                </div>
                <div class="movie-detail-wrap">
                    <div>${movie.Runtime}</div>
                    <div>${movie.Genre}</div>
                    <div class="remove">
                    <button class="watch-button" data-remove="${movie.imdbID}"><i class="fa-solid fa-xmark"></i> Remove</button>
                    </div>
                </div>
                <div class="movie-desc">
                    <p data-text="${movie.imdbID}">${movie.Plot}</p>
                    <input class="expand-btn" type="checkbox">
                </div>
            </div>
        </div>`
    }).join('')
}

const renderMovies = (arr) => {
    return movieContent.innerHTML = getMovieHtml(arr)
}

const renderWatchlist = (arr) => {
    if(watchContent){
        return watchContent.innerHTML = getWatchlistHtml(arr)
    }
}

if(moviesFromLocalStorage.length > 0){
    renderWatchlist(moviesFromLocalStorage)
} else if(moviesFromLocalStorage.length === 0){
    if(watchContent){

        watchContent.innerHTML = `
    <div class="start-movie-wrap">
                    <div class="start-text">Your watchlist is looking a little empty...</div>
                    <div class="add-movie"><a href="index.html"><i class="fa-solid fa-circle-plus"></i> Let’s add some movies!</a></div>
                </div>
    `
    }
}
