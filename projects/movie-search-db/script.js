$(document).ready(() => {
  //handle form submit
  $("form").submit(e => {
    e.preventDefault();
    getInfo(1);
  });
  //handle next page button click
  $("#next").click(() => {
    pageNo++;
    getInfo();
  });
  //handle back to main page button click
  $("#prev").click(() => {
    getInfo();
  });
  //handle previous page button click
  $("#back").click(() => {
    pageNo--;
    getInfo();
  });
});
let pageNo = 1;
//function to show all the movie/game lists
let getInfo = reset => {
  if (reset) {
    //will be initiated by form submit handle click
    pageNo = 1;
  }
  $(".noData").css("display", "none");
  const title = $("#title").val();
  const year = $("#year").val();
  const id = $("#id").val();
  let baseUrl = `http://www.omdbapi.com/?apikey=7880412f&page=${pageNo}`;
  if (title) {
    baseUrl = `${baseUrl}&s=${title}`;
  }
  if (year) {
    baseUrl = `${baseUrl}&y=${year}`;
  }
  if (id) {
    baseUrl = `${baseUrl}&i=${id}`;
  }
  if (!title && !id) {
    //if no title or id is provided show error message
    $(".emptyField").css("display", "block");
  } else {
    $(".emptyField").css("display", "none");
    $.ajax({
      url: baseUrl,
      dataType: "json",
      success: data => {
        $(".loader").css("display", "none");
        $(".result-container").html(""); //empty the container first
        $("#prev").css("display", "none");
        if (pageNo > 1) {
          //if next page exists
          $("#back").css("display", "block");
        } else {
          $("#back").css("display", "none");
        }
        if (!data.Search) {
          //if no data found
          $(".noData").css("display", "block");
        } else {
          data.Search.forEach(movie => {
            if (movie.Poster === "N/A") {
              //if no movie poster provided
              movie.Poster = "./assets/Image-not-found.gif";
            }
            $(".result-container").append(`
        <div class="card col-md-3 col-xs-6 col-sm-4 col-lg-3" onclick="getInfoById('${
          movie.imdbID
        }')">
         <div class="${movie.imdbID} movie-img">
        <img class="poster img-responsive" src=${movie.Poster} alt=${
              movie.Title
            }>
        </div>
        <div class="title">${movie.Title} </div>
         <div class="year"> ${movie.Year}</div>
        </div>
          `);
          });
          if (data.Search.length > 9) {
            //if there are more items
            $("#next").css("display", "block");
          } else {
            $("#next").css("display", "none");
          }
        }
      },
      error: err => {
        $(".loader").css("display", "none");
        $(".dbErr").css("display", "block");
        setTimeout(() => {
          $(".dbErr").css("display", "none");
        }, 3000);
      },
      beforeSend: () => {
        //show loading spinner
        $(".loader").css("display", "block");
      },
      timeout: 7000
    });
  } //end of else
};

//function to show details for a single item
let getInfoById = id => {
  let baseUrl = `http://www.omdbapi.com/?apikey=7880412f&i=${id}`;
  $.ajax({
    url: baseUrl,
    dataType: "json",
    success: movie => {
      if (movie.Poster === "N/A") {
        movie.Poster = "./assets/Image-not-found.gif";
      }
      $(".loader").css("display", "none");
      $("#prev").css("display", "block");
      $("#next").css("display", "none");
      $("#back").css("display", "none");
      $(".result-container").html("");
      $(".result-container").append(`
       <div class="col-md-4 col-sm-4 col-lg-4 col-xs-12">
        <div class="${movie.imdbID} movie-img">
         <img class="poster img-responsive" src=${movie.Poster} alt=${
        movie.Title
      }>
        </div>
       </div>
        <div class="col-md-8 col-sm-8 col-lg-8 col-xs-12 main-detail-container">
        <div class="detail">${movie.Title} </div>
        <div class="detail">${movie.Year}</div>
        <div class="detail"> ${movie.Genre}</div>
        <div class="detail"><img src="./assets/logo-imdb.svg" alt="IMDB"> ${
          movie.imdbRating
        }<i class="fa fa-star" aria-hidden="true"></i></div>

       </div>
       <div class="more-details">
        <div class="more-detail">Released On: ${movie.Released}</div>
        <div class="more-detail">Directed By: ${movie.Director}</div>
        <div class="more-detail">Runtime: ${movie.Runtime}</div>
        <div class="more-detail">IMDB ID: ${movie.imdbID}</div>
        <div class="more-detail">Rated: ${movie.Rated}</div>
        <div class="more-detail">Language: ${movie.Language}</div>
        <div class="more-detail">Type: ${movie.Type}</div>
        <div class="more-detail">Actors: ${movie.Actors}</div>
         <div class="more-detail">Plot: ${movie.Plot}</div>
       </div>
       `);
    },
    error: err => {
      $(".loader").css("display", "none");
      $(".dbErr").css("display", "block");
      setTimeout(() => {
        $(".dbErr").css("display", "none");
      }, 3000);
    },
    beforeSend: () => {
      $(".loader").css("display", "block");
    },
    timeout: 7000
  });
};
