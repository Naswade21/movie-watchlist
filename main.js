//work on limiting lines in para and work on css

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
                    <a data-movie="${movie.imdbID}"><i class="fa-solid fa-circle-plus"></i> Watchlist</a>
                    </div>
                </div>
                <p data-text="${movie.imdbID}">${movie.Plot}</p>
            </div>
        </div>
        `
    }).join('')
}

const renderMovies = (arr) => {
    return movieContent.innerHTML = getMovieHtml(arr)
}


