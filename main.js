//await fetch('http://www.omdbapi.com/?apikey=440110a8&s=blade')

const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search')
const watchContent = document.getElementById('watch-content')
const movieContent = document.getElementById('movie-content')
export let watchArr = []

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const res = await fetch(`http://www.omdbapi.com/?apikey=440110a8&s=${searchInput.value}`)
    const data = await res.json()

    //Insert a function where it displays the titles rendered into HTML
    console.log(data)
})
