//import axios from "axios";
document.getElementById("allmovies").style.display = "none";
document.getElementById("moviesHeader").style.display = "none";
document.getElementById("closeMovies").style.display = "none";
document.getElementById("closeForm").style.display = "none";
document.getElementById("spinner").style.display = "none";
document.getElementById("movieForm").style.display = "none";
document.getElementById("movieModal").style.display = "none";

//------Request to GET All Movies------
const prod_url =
  "https://reeler.netlify.app/.netlify/functions/index/api/movies"; //production url
const dev_url = "http://localhost:9000/.netlify/functions/index/api/movies"; //development url
const requestMovies = (path) => {
  axios.get(path).then(
    (response) => {
      var result = response.data;
      console.log(result);
      document.getElementById("spinner").style.display = "none";
      document.getElementById("moviesHeader").innerHTML = "All Movies";
      return show(result);
    },
    (error) => {
      console.log(error);
    }
  );
  return;
};

const getMovies = () => {
  document.getElementById("subHeadText").style.display = "none";
  document.getElementById("buttons").style.display = "none";
  document.getElementById("dropdownMenuButton").style.display = "none";
  document.getElementById("spinner").style.display = "block";
  setTimeout(() => requestMovies(dev_url), 1000);
  return;
};
//--------------------------------------------

//-------Request to GET All Animation Movies------------
const anime_url =
  "https://reeler.netlify.app/.netlify/functions/index/api/movies/Animation";
const requestAnime = () => {
  axios.get(anime_url).then(
    (response) => {
      var result = response.data;
      console.log(result);
      document.getElementById("spinner").style.display = "none";
      document.getElementById("moviesHeader").innerHTML = "Animation Movies";
      return show(result);
    },
    (error) => {
      console.log(error);
    }
  );
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
const action_url =
  "https://reeler.netlify.app/.netlify/functions/index/api/movies/Action";
const requestAction = () => {
  axios.get(action_url).then(
    (response) => {
      var result = response.data;
      console.log(result);
      document.getElementById("spinner").style.display = "none";
      document.getElementById("moviesHeader").innerHTML = "Action Movies";
      return show(result);
    },
    (error) => {
      console.log(error);
    }
  );
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
const comedy_url =
  "https://reeler.netlify.app/.netlify/functions/index/api/movies/Comedy";
const requestComedy = () => {
  axios.get(comedy_url).then(
    (response) => {
      var result = response.data;
      console.log(result);
      document.getElementById("spinner").style.display = "none";
      document.getElementById("moviesHeader").innerHTML = "Comedy Movies";
      return show(result);
    },
    (error) => {
      console.log(error);
    }
  );
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
const mystery_url =
  "https://reeler.netlify.app/.netlify/functions/index/api/movies/Mystery";
const requestMystery = () => {
  axios.get(mystery_url).then(
    (response) => {
      var result = response.data;
      console.log(result);
      document.getElementById("spinner").style.display = "none";
      document.getElementById("moviesHeader").innerHTML = "Mystery Movies";
      return show(result);
    },
    (error) => {
      console.log(error);
    }
  );
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

const getForm = () => {
  const mtitle = document.getElementById("movieTitle").value;
  const myear = document.getElementById("movieYear").value;
  const mgenre = document.getElementById("selectedGenre").value;
  //return alert(`${title}, ${year}, ${genre}`);
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
    .then(
      (response) => {
        console.log(response.data);
        document.getElementById("moviesHeader").innerHTML = "New Movie Added!";
        return showModal(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  return document.getElementById("movieForm").reset();
};
//-------------------------------------------------------

//----------Function to Display Data-------------------------
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

//------Close Button--------------------------------------------
const closeMoviesList = () => {
  document.getElementById("allmovies").style.display = "none";
  document.getElementById("moviesHeader").style.display = "none";
  document.getElementById("closeMovies").style.display = "none";
  document.getElementById("subHeadText").style.display = "block";
  document.getElementById("buttons").style.display = "block";
  document.getElementById("dropdownMenuButton").style.display = "inline";
  document.getElementById("movieForm").style.display = "none";
  document.getElementById("closeForm").style.display = "none";
  document.getElementById("pageTitle").style.display = "block";
  document.getElementById("movieForm").reset();
  return;
};
//-------------------------------------------------------------
