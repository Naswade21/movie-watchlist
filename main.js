//work on limiting lines in para and work on css

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
})

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

const getMovieArr = async (arr) => {
    let movArr = arr.map(async (movie) => {
        const res = await fetch(`http://www.omdbapi.com/?apikey=440110a8&t=${movie}`)
        const data = await res.json()

        return data
    })

    return await Promise.all(movArr) 
}

const addMovieToList = async (movieId) => {
    //Add the movie that was selected to the watchlist and use the i parameter to add the movie using the id to the watchlist array
    const res = await fetch(`http://www.omdbapi.com/?apikey=440110a8&i=${movieId}`)
    const data = await res.json()

    moviesFromLocalStorage.push(data)

    localStorage.setItem("movieWatchList", JSON.stringify(moviesFromLocalStorage))

    return console.log(moviesFromLocalStorage)
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
                    <div>
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

const renderMovies = (arr) => {
    return movieContent.innerHTML = getMovieHtml(arr)
}


