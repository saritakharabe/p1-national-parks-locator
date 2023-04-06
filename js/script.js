// National parks API call: need to replace STATE with the results of the state pulldown menu; returns lat and lon by park
var apiKey = "6Nd3QpLEE05BdiKDL5AMEu9GVW08cRlapS83eKaQ";
var apiCall =
  "https://developer.nps.gov/api/v1/parks?stateCode=" +
  "{0}" +
  "&api_key=" +
  apiKey;

var mapKey =
  "pk.eyJ1IjoiYXNiMjAyIiwiYSI6ImNsZzJkcmxudTA0aDkzdHFzMHh1Mzk0a3cifQ.HQAX2YLQBEZjcagat-k8vw";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYXNiMjAyIiwiYSI6ImNsZzJkcmxudTA0aDkzdHFzMHh1Mzk0a3cifQ.HQAX2YLQBEZjcagat-k8vw";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
});

// Code to take results of natl parks API call and append it to the search result tiles
var searchResults = document.querySelector("#search-results");

function displayParkList(data) {
  var length = data.data.length; //10
  searchResults.innerHTML = " ";
  if (length > 10) {
    length = 10;
  }
  for (var i = 0; i < length; i++) {
    searchResults.style.cssText =
      "display: flex; flex-wrap: wrap; justify-content: center";

    var parkCard = document.createElement("card");
    parkCard.style.cssText =
      "border: 2px solid #000000; margin: 10px; padding: 10px; width: 45%; background-color: #fcfcf4; border-radius: 10px";
    parkCard.classList.add("park-card");

    var cardTitle = document.createElement("h3");
    cardTitle.innerHTML = data.data[i].name;
    cardTitle.dataset.lat = data.data[i].latitude;
    cardTitle.dataset.lon = data.data[i].longitude;
    cardTitle.dataset.code = data.data[i].parkCode;
    cardTitle.style.cssText =
      "font-weight: bold; cursor: grab; text-decoration: underline; color: #00308F";

    var cardState = document.createElement("h3");
    cardState.innerHTML = "State(s): " + data.data[i].states;
    var cardActivities = document.createElement("h3");
    cardActivities.innerHTML = "Some of the Available Activities:";
    parkCard.appendChild(cardTitle);
    parkCard.appendChild(cardState);
    parkCard.appendChild(cardActivities);

    var activity = data.data[i].activities.length;
    if (activity > 5) {
      activity = 5;
    }
    for (var j = 0; j < activity; j++) {
      var cardList = document.createElement("ul");
      var actList1 = document.createElement("li");
      actList1.innerHTML = data.data[i].activities[j].name;
      parkCard.appendChild(cardList);
      parkCard.appendChild(actList1);
    }
    searchResults.appendChild(parkCard);
    cardTitle.addEventListener("click", expandDetails);
  }
}

var expandDetails = function (park) {
  var element = park.target;
  console.log(element);
  searchResults.innerHTML = " ";

  var detailedCard = document.createElement("div");
  detailedCard.style.cssText =
    "border: 2px solid #000000; margin: 10px; padding: 10px; width: 95%; background-color: #fcfcf4; border-radius: 10px";

  var detailedTitle = document.createElement("h2");
  detailedTitle.innerHTML = "TITLE";

  var detailedDescription = document.createElement("p");
  detailedDescription.innerHTML = "DESCRIPTION";

  var detailedList = document.createElement("ul");
  var detailedActivities = document.createElement("li");
  detailedActivities.innerHTML = "LIST";

  var detailedURL = document.createElement("h3");
  detailedURL.innerHTML =
    "For more information, visit the park's page at: " + "URL";

  detailedCard.appendChild(detailedTitle);
  detailedCard.appendChild(detailedDescription);
  detailedCard.appendChild(detailedList);
  detailedCard.appendChild(detailedActivities);
  detailedCard.appendChild(detailedURL);

  searchResults.appendChild(detailedCard);
};

// showing state-code dropdown list
var dropdown = document.querySelector(".dropdown");
var clickdropdownmenu = document.addEventListener(
  "DOMContentLoaded",
  function () {
    dropdown.addEventListener("click", function (event) {
      event.stopPropagation();
      dropdown.classList.toggle("is-active");
    });
  }
);

var removeDropdownList = document.addEventListener("click", function () {
  dropdown.classList.remove("is-active");
});

fetch("./assets/statecodes.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // console.log(data);
    showdropdownList(data);
  });
function showdropdownList(data) {
  var dropdownList = document.getElementById("dropdown-menu");
  for (var i = 0; i < data.length; i++) {
    var divEl = document.createElement("div");
    divEl.value = data[i].code;
    divEl.addEventListener("click", onStateSelect);
    divEl.innerHTML = data[i].code;
    dropdownList.appendChild(divEl);
  }
}

var parkname = [];
function onStateSelect(event) {
  var spanEl = document.getElementById("state-code");
  spanEl.innerHTML = event.target.value;
  var api = apiCall.replace("{0}", event.target.value);
  

  fetch(api)
    .then(function (parkResponse) {
      if (parkResponse.ok) {
        console.log(parkResponse);
        parkResponse.json().then(function (data) {
          console.log(data);
          displayParkList(data);
        });
      } else {
        alert("park API error");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

function onSelectActivity(event) {
    var spanEl = document.getElementById("activity-list");
    spanEl.innerHTML = event.target.value;
    var api = apiCall.replace("{0}", event.target.value);
    
    fetch(api)
      .then(function (parkResponse) {
        if (parkResponse.ok) {
          console.log(parkResponse);
          parkResponse.json().then(function (data) {
            console.log(data);
            displayParkList(data);
          });
        } else {
          alert("park API error");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }


// Code to expand the tile to show more details on clicked park
//variable for map box API
//after filtering activity showing park list

var container = document.querySelector("#search-results");
var container1 = document.querySelector(".saved-serchers");

function mapZoom(event) {
  var element = event.target;
  if (element.matches("h3")) {
    var lng = element.getAttribute("data-lon");
    var lat = element.getAttribute("data-lat");

    // if (element.matches('.parkcard')) {
    mapboxgl.accessToken = mapKey;
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: 7, // starting zoom
    });
    map.on("load", () => {
      // Load an image from an external URL.
      map.loadImage(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Logo_of_the_United_States_National_Park_Service.svg/1200px-Logo_of_the_United_States_National_Park_Service.svg.png",
        (error, image) => {
          if (error) throw error;

          // Add the image to the map style.
          map.addImage("logo", image);

          // Add a data source containing one point feature.
          map.addSource("point", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [lng, lat],
                  },
                },
              ],
            },
          });
          // Add a layer to use the image to represent the data.
          map.addLayer({
            id: "points",
            type: "symbol",
            source: "point", // reference the data source
            layout: {
              "icon-image": "logo", // reference the image
              "icon-size": 0.02,
            },
          });
        }
      );
    });
    // }
  }
}
container.addEventListener("click", mapZoom);
//container1.addEventListener("click", mapZoom);