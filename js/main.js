// these event listerners are here so when the website first loads then the dom sets off the functions
//  and performs the task on loading.

document.addEventListener('DOMContentLoaded', fetchOurFavouritesData)
document.addEventListener('DOMContentLoaded', fetchTrendingMoviesData)
document.addEventListener('DOMContentLoaded', fetchTopShowsData)
document.addEventListener('DOMContentLoaded', movieOfTheDay)

// This is just an example of the function to call an api used to generate json data and parse into our html and dom
//Example fetch template for calling an API
// document.querySelector('button').addEventListener('click', getFetch)

// function getFetch(){
//   const choice = document.querySelector('input').value
//   const url = 'https://pokeapi.co/api/v2/pokemon/'+choice

//   fetch(url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//       })
// }

// Signed up to the OMDB API database and got an API key that enables api calls.
// Via http://www.omdbapi.com/
let apiKey =  "f5463b1b"


async function fetchTrendingMoviesData(){
// This function is used to retrieve movie data from the omdbapi.com website 
// based on the search term (s) and using my API key, 
// the resulting data is then passed to another function thats written below, that loads the trending movies
  const URL = `https://www.omdbapi.com/?apikey=${apiKey}&s=dark&type=movie`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  if (data.Response == "True") {
// The slice command ensures that only the top five movies in the received object are taken and any extras are removed.
    loadTrendingMovies(data.Search.slice(0,5))
  }


}
// This function creates and movie row slide of 5 trending movies each with a swiper-slide and small plot description
function loadTrendingMovies(movies){
  // a ForEach is used to apply these set of actions to each element of the array.
  movies.forEach(movie =>{
    let movieID = movie.imdbID
    //Took the movie's ID so it can get an individual movie and also fetched for the plot so I can put it the movie row slide.
   fetch(`https://www.omdbapi.com/?i=${movieID}&plot=short&apikey=${apiKey}`)
  .then(res => res.json()) // parse response as JSON
  .then(movieDetails => {
    // Each one of theses creates a div, img, figcaption,h3,p and a element
    // in the DOM of the html in order to make a card looking slide, which is repeated 5 times as per the for each command
    const movieSlide = document.createElement('div');
    movieSlide.className = 'swiper-slide';
    document.querySelector('.trendingContainer').appendChild(movieSlide);

    const moviePoster = document.createElement('img');
    moviePoster.className = 'movie-img';
    moviePoster.src = movie.Poster;
    movieSlide.appendChild(moviePoster)

    const movieInfo = document.createElement('figcaption');
    movieSlide.appendChild(movieInfo)

    const movieTitle = document.createElement('h3')
    movieTitle.innerText = movie.Title
    movieInfo.appendChild(movieTitle)

    const moviePlot = document.createElement('p');
    moviePlot.innerText = movieDetails.Plot
    movieInfo.append(moviePlot)

    const moreInfoBtn = document.createElement('a')
    moreInfoBtn.innerText = 'Read More';
    moreInfoBtn.className = 'read-more';
    moreInfoBtn.dataset.id = movie.imdbID;
    movieInfo.appendChild(moreInfoBtn);
    moviePlot.after(moreInfoBtn)

    })
  })
}

// Same code repeated from trending movies but slightly altered search term (s) and type for different results
async function fetchOurFavouritesData(){
  const URL = `https://www.omdbapi.com/?apikey=${apiKey}&s=christmas&type=movie`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  if (data.Response == "True") {loadOurFavourites(data.Search.slice(0,5))}


}
// Same code repeated from trending movies but slightly altered search term (s) and type for different results
function loadOurFavourites(movies){
  movies.forEach(movie =>{
    let movieID = movie.imdbID
   fetch(`https://www.omdbapi.com/?i=${movieID}&plot=short&apikey=${apiKey}`)
  .then(res => res.json()) // parse response as JSON
  .then(movieDetails => {
    const movieSlide = document.createElement('div');
    movieSlide.className = 'swiper-slide';
    document.querySelector('.favouritesContainer').appendChild(movieSlide);

    const moviePoster = document.createElement('img');
    moviePoster.className = 'movie-img';
    moviePoster.src = movie.Poster;
    movieSlide.appendChild(moviePoster)

    const movieInfo = document.createElement('figcaption');
    movieSlide.appendChild(movieInfo)

    const movieTitle = document.createElement('h3')
    movieTitle.innerText = movie.Title
    movieInfo.appendChild(movieTitle)

    const moviePlot = document.createElement('p');
    moviePlot.innerText = movieDetails.Plot
    movieInfo.append(moviePlot)

    const moreInfoBtn = document.createElement('a')
    moreInfoBtn.innerText = 'Read More';
    moreInfoBtn.className = 'read-more';
    moreInfoBtn.dataset.id = movie.imdbID;
    movieInfo.appendChild(moreInfoBtn);
    moviePlot.after(moreInfoBtn)

    })
  })
}

// Same code repeated from trending movies but slightly altered search term (s) and type for different results
async function fetchTopShowsData(){
  const URL = `https://www.omdbapi.com/?apikey=${apiKey}&s=kill&type=series`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  // console.log(data)
  if (data.Response == "True") {loadTopShows(data.Search.slice(0,5))}

  // if (data.Response == 'False'){console.log(`Cannot fetch ${data}`)}
}
// Same code repeated from trending movies but slightly altered search term (s) and type for different results
function loadTopShows(movies){
  movies.forEach(movie =>{
    let movieID = movie.imdbID
   fetch(`https://www.omdbapi.com/?i=${movieID}&plot=short&apikey=${apiKey}`)
  .then(res => res.json()) // parse response as JSON
  .then(movieDetails => {
    const movieSlide = document.createElement('div');
    movieSlide.className = 'swiper-slide';
    document.querySelector('.topshowsContainer').appendChild(movieSlide);

    const moviePoster = document.createElement('img');
    moviePoster.className = 'movie-img';
    moviePoster.src = movie.Poster;
    movieSlide.appendChild(moviePoster)

    const movieInfo = document.createElement('figcaption');
    movieSlide.appendChild(movieInfo)

    const movieTitle = document.createElement('h3')
    movieTitle.innerText = movie.Title
    movieInfo.appendChild(movieTitle)

    const moviePlot = document.createElement('p');
    moviePlot.innerText = movieDetails.Plot
    movieInfo.append(moviePlot)

    const moreInfoBtn = document.createElement('a')
    moreInfoBtn.innerText = 'Read More';
    moreInfoBtn.className = 'read-more';
    moreInfoBtn.dataset.id = movie.imdbID;
    movieInfo.appendChild(moreInfoBtn);
    moviePlot.after(moreInfoBtn)
    })
  })
}

// Movie of the day function, this is an automated function that pulls a random movie from an array
// upon loading there will be a different motd each time, elements of code earlier are used to call the OMDBAPI
async function movieOfTheDay(){
  //this array stores all of the ids that we'd us for the omdb api
  let array = ["tt4154796","tt0068646","tt0109830","tt1375666","tt0133093"]
  let randomIndex = Math.floor(Math.random() * array.length);
  console.log(array[randomIndex])
  const URL = `https://www.omdbapi.com/?apikey=${apiKey}&i=${array[randomIndex]}`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  if (data.Response == "True") {
    console.log(data)
    // after calling the api for our random movie our automated function, 
    // it replaces the inner text of the html to present the info
    document.querySelector("#motd-title").innerText = data.Title
    document.querySelector("#motd-p").innerText = data.Plot
    document.querySelector("#motd-poster").src = data.Poster
  }


}
