//import axios from "axios";
document.getElementById("allmovies").style.display = "none";
document.getElementById("moviesHeader").style.display = "none";
document.getElementById("closeMovies").style.display = "none";
document.getElementById("spinner").style.display = "none";

const url = "http://localhost:2876/api/movies";
const getMovies = (path) => {
  axios.get(path).then(
    (response) => {
      var result = response.data;
      console.log(result);
      return show(result);
    },
    (error) => {
      console.log(error);
    }
  );
  return;
};

const anime_url = `http://localhost:2876/api/movies/Animation`;
const getAnimationMovies = () => {
  document.getElementById("spinner").display = "block";
  setTimeout(
    axios.get(anime_url).then(
      (response) => {
        var result = response.data;
        console.log(result);
        document.getElementById("moviesHeader").innerHTML = "Animation Movies";
        document.getElementById("spinner").display = "none";
        return show(result);
      },
      (error) => {
        console.log(error);
      }
    ),
    6000
  );
  return;
};

function show(data) {
  const item = `
      <a href="#" class="list-group-item list-group-item-action" >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1" id="title"></h5>
          <small id="year"></small>
        </div>
        <small id="genre"></small>
      </a>
  `;

  itemList = data.map(
    (movie) => `
  <a href="#" class="list-group-item list-group-item-action" >
  <div class="d-flex w-100 justify-content-between">
    <h5 class="mb-1" id="title">${movie.title}</h5>
    <small id="year">${movie.year}</small>
  </div>
  <small id="genre">${movie.genre}</small>
</a>
  `
  );

  const arrangedList = itemList.join("");

  // Setting innerHTML as tab variable
  document.getElementById("allmovies").style.display = "block";
  document.getElementById("moviesHeader").style.display = "block";
  document.getElementById("closeMovies").style.display = "block";
  document.getElementById("subHeadText").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("dropdownMenuButton").style.display = "none";
  document.getElementById("allmovies").innerHTML = arrangedList;
  return;
}

const closeMoviesList = () => {
  //e.preventDefault();
  document.getElementById("allmovies").style.display = "none";
  document.getElementById("moviesHeader").style.display = "none";
  document.getElementById("closeMovies").style.display = "none";
  document.getElementById("subHeadText").style.display = "block";
  document.getElementById("buttons").style.display = "block";
  document.getElementById("dropdownMenuButton").style.display = "inline";
  return;
};
