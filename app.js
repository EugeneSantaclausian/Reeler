//import axios from "axios";
document.getElementById("allmovies").style.display = "none";
document.getElementById("alldelmovies").style.display = "none";
document.getElementById("movieUpdateForm").style.display = "none";
//document.getElementById("delForm").style.display = "none";
document.getElementById("moviesHeader").style.display = "none";
document.getElementById("delmoviesHeader").style.display = "none";
document.getElementById("closeMovies").style.display = "none";
document.getElementById("closeMovies2").style.display = "none";
document.getElementById("closeForm").style.display = "none";
document.getElementById("spinner").style.display = "none";
document.getElementById("movieForm").style.display = "none";
document.getElementById("movieModal").style.display = "none";

var delMovies;

//----------Function to Display Data-------------------------
function show(data) {
  itemList = data.map(
    (movie) => `
  <a href="#" id="link" class="list-group-item list-group-item-action" >
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
//------------------------------------------------

//----------Function to Display All Data - DELETE-------------------------
function showDel(data) {
  itemList = data.map(
    (movie) =>
      `<a href="#" id="link" class="list-group-item list-group-item-action" id="alldelmovies">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1" id="deltitle">${movie.title}</h5>
      <small id="delyear">${movie.year}</small>
    </div>
    <div class="d-flex w-100 justify-content-between">
      <small id="delgenre">${movie.genre}</small>
      <button
        class="btn btn-sm btn-danger fw-bold border-white text-center"
        onclick='deleteMovie("${movie._id}")'
      >
        Delete
      </button>
    </div>
  </a>
  `
  );

  const arrangedList = itemList.join("");

  // Setting innerHTML as tab variable
  document.getElementById("alldelmovies").style.display = "block";
  //document.getElementById("delForm").style.display = "block";
  document.getElementById("allmovies").style.display = "none";
  document.getElementById("moviesHeader").style.display = "none";
  document.getElementById("delmoviesHeader").style.display = "block";
  document.getElementById("closeMovies").style.display = "block";
  document.getElementById("subHeadText").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("dropdownMenuButton").style.display = "none";
  document.getElementById("alldelmovies").innerHTML = arrangedList;
  return;
}
//------------------------------------------------

//----------Function to Display All Data - UPDATE-------------------------
function showUpdate(data) {
  itemList = data.map(
    (movie) => `
    <a href="#" id="link" class="list-group-item list-group-item-action" id="alldelmovies">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1" id="uptitle">${movie.title}</h5>
      <small id="upyear">${movie.year}</small>
    </div>
    <div class="d-flex w-100 justify-content-between">
      <small id="upgenre">${movie.genre}</small>
      <button
        class="btn btn-sm btn-primary fw-bold border-white text-center"
        onclick='showUpdateForm("${movie._id}","${movie.title}")'
      >
        Update
      </button>
    </div>
  </a>
  `
  );

  const arrangedList = itemList.join("");

  // Setting innerHTML as tab variable
  document.getElementById("alldelmovies").style.display = "block";
  //document.getElementById("delForm").style.display = "block";
  document.getElementById("allmovies").style.display = "none";
  document.getElementById("moviesHeader").style.display = "none";
  document.getElementById("delmoviesHeader").style.display = "block";
  document.getElementById("closeMovies").style.display = "block";
  document.getElementById("subHeadText").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("dropdownMenuButton").style.display = "none";
  document.getElementById("alldelmovies").innerHTML = arrangedList;
  return;
}
//------------------------------------------------

//----------Function to Display All Data - UPDATE-------------------------
function showUpdateForm(id, title) {
  item = `
  <p
    class="h3 text-center pb-2 pt-2 mb-4 bg-dark text-white"
    id="subHeadText"
  >
    Update Movie Details
  </p>
  <p class="lead" id="subHeadText"><bold>ID: </bold>${id}</p>
  <p class="lead" id="subHeadText"><bold>Title: </bold>${title}</p>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label"
      ><h5 class="ml-4">Enter New Title</h5></label
    >
    <input type="text" class="form-control" id="updateTitle" required />
  </div>
  <button onclick="updateMovie('${title}','${id}')" class="btn btn-primary w-100 mb-3">
  Submit
</button>
  `;

  //const arrangedList = item.join("");

  // Setting innerHTML as tab variable
  document.getElementById("alldelmovies").style.display = "none";
  document.getElementById("closeForm").style.display = "block";
  document.getElementById("allmovies").style.display = "none";
  document.getElementById("moviesHeader").style.display = "none";
  document.getElementById("delmoviesHeader").style.display = "none";
  document.getElementById("closeMovies").style.display = "none";
  document.getElementById("subHeadText").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("dropdownMenuButton").style.display = "none";
  document.getElementById("movieUpdateForm").style.display = "block";
  document.getElementById("movieUpdateForm").innerHTML = item;
  return;
}
//------------------------------------------------

//------Request to GET All Movies------
const prod_url = "https://reeler.herokuapp.com/api/movies"; //production url
const dev_url = "http://localhost:3500/api/movies"; //development url
const requestMovies = (path) => {
  axios
    .get(path)
    .then((response) => {
      var result = response.data;
      console.log(result);
      document.getElementById("spinner").style.display = "none";
      document.getElementById("moviesHeader").innerHTML = "All Movies";
      return show(result);
    })
    .catch((error) => {
      console.error("Error:", error),
        (document.getElementById("spinner").style.display = "none"),
        showError(error);
    });
  return;
};

const getMovies = () => {
  document.getElementById("subHeadText").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("dropdownMenuButton").style.display = "none";
  document.getElementById("spinner").style.display = "block";
  requestMovies(prod_url);
  return;
};
//--------------------------------------------

//-------Request to GET All Animation Movies------------
const anime_url_prod = "https://reeler.herokuapp.com/api/movies/Animation";
const anime_url_dev = "http://localhost:3500/api/movies/Animation";
const requestAnime = () => {
  axios
    .get(anime_url_prod)
    .then((response) => {
      var result = response.data;
      console.log(result);
      document.getElementById("spinner").style.display = "none";
      document.getElementById("moviesHeader").innerHTML = "Animation Movies";
      return show(result);
    })
    .catch((error) => {
      console.error("Error:", error),
        (document.getElementById("spinner").style.display = "none"),
        showError(error);
    });
};

const getAnimationMovies = () => {
  document.getElementById("subHeadText").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("dropdownMenuButton").style.display = "none";
  document.getElementById("spinner").style.display = "block";
  setTimeout(() => requestAnime(), 1000);
  return;
};
//-------------------------------------------------------

//-------Request to GET All Action Movies------------
const action_url_prod = "https://reeler.herokuapp.com/api/movies/Action";
const action_url_dev = "http://localhost:3500/api/movies/Action";
const requestAction = () => {
  axios
    .get(action_url_prod)
    .then((response) => {
      var result = response.data;
      console.log(result);
      document.getElementById("spinner").style.display = "none";
      document.getElementById("moviesHeader").innerHTML = "Action Movies";
      return show(result);
    })
    .catch((error) => {
      console.error("Error:", error),
        (document.getElementById("spinner").style.display = "none"),
        showError(error);
    });
};

const getActionMovies = () => {
  document.getElementById("subHeadText").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("dropdownMenuButton").style.display = "none";
  document.getElementById("spinner").style.display = "block";
  setTimeout(() => requestAction(), 1000);
  return;
};
//-------------------------------------------------------

//-------Request to GET All Comedy Movies------------
const comedy_url_prod = "https://reeler.herokuapp.com/api/movies/Comedy";
const comedy_url_dev = "http://localhost:3500/api/movies/Comedy";
const requestComedy = () => {
  axios
    .get(comedy_url_prod)
    .then((response) => {
      var result = response.data;
      console.log(result);
      document.getElementById("spinner").style.display = "none";
      document.getElementById("moviesHeader").innerHTML = "Comedy Movies";
      return show(result);
    })
    .catch((error) => {
      console.error("Error:", error),
        (document.getElementById("spinner").style.display = "none"),
        showError(error);
    });
};

const getComedyMovies = () => {
  document.getElementById("subHeadText").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("dropdownMenuButton").style.display = "none";
  document.getElementById("spinner").style.display = "block";
  setTimeout(() => requestComedy(), 1000);
  return;
};
//-------------------------------------------------------

//-------Request to GET All Mystery Movies------------
const mystery_url_prod = "https://reeler.herokuapp.com/api/movies/Mystery";
const mystery_url_dev = "http://localhost:3500/api/movies/Mystery";
const requestMystery = () => {
  axios
    .get(mystery_url_prod)
    .then((response) => {
      var result = response.data;
      console.log(result);
      document.getElementById("spinner").style.display = "none";
      document.getElementById("moviesHeader").innerHTML = "Mystery Movies";
      return show(result);
    })
    .catch((error) => {
      console.error("Error:", error),
        (document.getElementById("spinner").style.display = "none"),
        showError(error);
    });
};

const getMysteryMovies = () => {
  document.getElementById("subHeadText").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("dropdownMenuButton").style.display = "none";
  document.getElementById("spinner").style.display = "block";
  setTimeout(() => requestMystery(), 1000);
  return;
};
//-------------------------------------------------------

//-------Request to Submit New Movie(POST REQUEST)------------

//Show The Form to Receive Movie Details
const showForm = () => {
  document.getElementById("subHeadText").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("dropdownMenuButton").style.display = "none";
  document.getElementById("movieForm").style.display = "block";
  document.getElementById("closeForm").style.display = "block";
  //document.getElementById("pageTitle").style.display = "none";
  return;
};

const getForm = (event) => {
  event.preventDefault();
  const mtitle = document.getElementById("movieTitle").value;
  const myear = document.getElementById("movieYear").value;
  const mgenre = document.getElementById("selectedGenre").value;
  //return alert(`${title}, ${year}, ${genre}`);
  document.getElementById("subHeadText").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("dropdownMenuButton").style.display = "none";
  document.getElementById("moviesHeader").style.display = "none";
  document.getElementById("movieForm").style.display = "none";
  document.getElementById("closeForm").style.display = "none";
  document.getElementById("spinner").style.display = "block";
  axios
    .post(
      prod_url,
      {
        title: mtitle,
        year: myear,
        genre: mgenre,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      document.getElementById("spinner").style.display = "none";
      document.getElementById("moviesHeader").innerHTML = "New Movie Added!";
      document.getElementById("closeForm").style.display = "block";
      showModal(response.data);
      return document.getElementById("movieForm").reset();
    })
    .catch((error) => {
      console.error("Error:", error),
        (document.getElementById("spinner").style.display = "none"),
        (document.getElementById("closeForm").style.display = "block");
      showError(error);
    });
  return;
};
//-------------------------------------------------------

//--------------SHOW MODAL-----------------------------------------

function showModal(data) {
  newMovie = `
  <a href="#" class="list-group-item list-group-item-action" >
  <div class="d-flex w-100 justify-content-between">
    <h5 class="mb-1" id="title">${data.title}</h5>
    <small id="year">${data.year}</small>
  </div>
  <small id="genre">${data.genre}</small>
</a>
  `;

  //const arrangedList = newMovie.join("");

  // Setting innerHTML as tab variable
  document.getElementById("allmovies").style.display = "block";
  document.getElementById("moviesHeader").style.display = "block";
  document.getElementById("subHeadText").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("dropdownMenuButton").style.display = "none";
  document.getElementById("movieForm").style.display = "none";
  document.getElementById("allmovies").innerHTML = newMovie;
  return;
}
//-------------------------------------------------------

//--------------SHOW MODAL-----------------------------------------

//--------------SHOW ERROR-----------------------------------------

function showError(data) {
  newError = `
  <a href="#" class="list-group-item list-group-item-action" >
  <div class="d-flex w-100 justify-content-between">
    <h5 class="mb-1" id="title">Error</h5>
    <small id="year"></small>
  </div>
  <small id="genre">${data}</small>
</a>
  `;

  //const arrangedList = newMovie.join("");

  // Setting innerHTML as tab variable
  document.getElementById("allmovies").style.display = "block";
  document.getElementById("moviesHeader").innerHTML = "Error Message";
  document.getElementById("moviesHeader").style.display = "block";
  document.getElementById("subHeadText").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("dropdownMenuButton").style.display = "none";
  document.getElementById("movieForm").style.display = "none";
  document.getElementById("alldelmovies").style.display = "none";
  document.getElementById("allmovies").innerHTML = newError;
  return;
}
//-------------------------------------------------------

//--------------SHOW ERROR-----------------------------------------

//actual deletemovie
function deleteMovie(id) {
  const delete_url_prod = `https://reeler.herokuapp.com/api/movies/${id}`;
  console.log(id, "has been clicked to DELETE");

  document.getElementById("delmoviesHeader").style.display = "none";
  document.getElementById("alldelmovies").style.display = "none";
  document.getElementById("closeMovies").style.display = "none";
  document.getElementById("spinner").style.display = "block";

  axios
    .delete(delete_url_prod, {
      id: id,
    })
    .then((response) => {
      console.log(response.data);
      document.getElementById("spinner").style.display = "none";
      document.getElementById("moviesHeader").innerHTML = "Movie Deleted!";
      document.getElementById("closeMovies").style.display = "block";
      return showModal(response.data);
    })
    .catch((error) => {
      console.error("Error:", error),
        (document.getElementById("spinner").style.display = "none"),
        (document.getElementById("closeForm").style.display = "block");
      showError(error);
    });
  return;
}
//-------------------------------------------------------

//------Request to DELETE Movies------
const getdelMovies = (path) => {
  axios
    .get(path)
    .then((response) => {
      var result = response.data;
      delMovies = result;
      console.log(result);
      document.getElementById("spinner").style.display = "none";
      document.getElementById("delmoviesHeader").innerHTML =
        "Select Movies To Delete";
      return showDel(result);
    })
    .catch((error) => {
      console.error("Error:", error),
        (document.getElementById("spinner").style.display = "none"),
        showError(error);
    });
  return;
};

const showdeleteMovies = () => {
  document.getElementById("subHeadText").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("dropdownMenuButton").style.display = "none";
  document.getElementById("spinner").style.display = "block";
  setTimeout(() => getdelMovies(prod_url), 1000);
  return;
};
//--------------------------------------------

//actual deletemovie
function updateMovie(oldtitle, updateid) {
  const update_url_prod = `https://reeler.herokuapp.com/api/movies/${updateid}`;
  console.log(oldtitle, "with id:", updateid, "has been clicked to UPDATE");

  document.getElementById("delmoviesHeader").style.display = "none";
  document.getElementById("alldelmovies").style.display = "none";
  document.getElementById("movieUpdateForm").style.display = "none";
  document.getElementById("closeMovies").style.display = "none";
  document.getElementById("spinner").style.display = "block";

  const newtitle = document.getElementById("updateTitle").value;

  axios
    .put(
      update_url_prod,
      {
        title: newtitle,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      document.getElementById("spinner").style.display = "none";
      document.getElementById("moviesHeader").innerHTML = "Movie Updated!";
      return showModal(response.data);
    })
    .catch((error) => {
      console.error("Error:", error),
        (document.getElementById("spinner").style.display = "none"),
        (document.getElementById("closeForm").style.display = "block");
      showError(error);
    });
  return;
}
//-------------------------------------------------------

//------Request to UPDATE Movies------
const getUpdateMovies = (path) => {
  axios
    .get(path)
    .then((response) => {
      var result = response.data;
      delMovies = result;
      console.log(result);
      document.getElementById("spinner").style.display = "none";
      document.getElementById("delmoviesHeader").innerHTML =
        "Select Movies To Update";
      return showUpdate(result);
    })
    .catch((error) => {
      console.error("Error:", error),
        (document.getElementById("spinner").style.display = "none"),
        showError(error);
    });
  return;
};

const showupdateMovies = () => {
  document.getElementById("subHeadText").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("dropdownMenuButton").style.display = "none";
  document.getElementById("spinner").style.display = "block";
  setTimeout(() => getUpdateMovies(prod_url), 1000);
  return;
};
//--------------------------------------------

//------Close Button--------------------------------------------
const closeMoviesList = () => {
  document.getElementById("allmovies").style.display = "none";
  document.getElementById("alldelmovies").style.display = "none";
  //document.getElementById("delForm").style.display = "none";
  document.getElementById("moviesHeader").style.display = "none";
  document.getElementById("delmoviesHeader").style.display = "none";
  document.getElementById("closeMovies").style.display = "none";
  //document.getElementById("closeMovies2").style.display = "none";
  document.getElementById("subHeadText").style.display = "block";
  document.getElementById("buttons").style.display = "block";
  document.getElementById("dropdownMenuButton").style.display = "inline";
  document.getElementById("movieForm").style.display = "none";
  document.getElementById("closeForm").style.display = "none";
  document.getElementById("pageTitle").style.display = "block";
  document.getElementById("movieUpdateForm").style.display = "none";
  document.getElementById("movieForm").reset();
  return;
};
//-------------------------------------------------------------
