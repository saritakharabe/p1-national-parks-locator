// -----------------------------------------------------------------------------------------------
// National parks API call: need to replace STATE with the results of the state pulldown menu; returns lat and lon by park
var apiKey = "6Nd3QpLEE05BdiKDL5AMEu9GVW08cRlapS83eKaQ";
var apiCall =
  "https://developer.nps.gov/api/v1/parks?stateCode=" +
  "PA" +
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

fetch(apiCall)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

// -----------------------------------------------------------------------------------------------
// Code to take results of natl parks API call and append it to the search result tiles

for (var i = 0; i < 10; i++) {
  var searchResults = document.querySelector("#search-results");
  searchResults.style.cssText =
    "display: flex; flex-wrap: wrap; justify-content: center; width: 50%";

  var parkCard = document.createElement("div");
  parkCard.style.cssText =
    "border: 2px solid #000000; margin: 10px; padding: 10px; width: 40%";

  var cardTitle = document.createElement("h3");
  cardTitle.innerHTML = "CARD TITLE";

  var cardState = document.createElement("h3");
  cardState.innerHTML = "CARD STATE";

  var cardActivities = document.createElement("h3");
  cardActivities.innerHTML = "Available Activities";

  var cardList = document.createElement("ul");
  var actList1 = document.createElement("li");
  actList1.innerHTML = "LIST ITEM 1";
  var actList2 = document.createElement("li");
  actList2.innerHTML = "LIST ITEM 2";
  var actList3 = document.createElement("li");
  actList3.innerHTML = "LIST ITEM 3";

  parkCard.appendChild(cardTitle);
  parkCard.appendChild(cardState);
  parkCard.appendChild(cardActivities);
  parkCard.appendChild(cardList);
  parkCard.appendChild(actList1);
  parkCard.appendChild(actList2);
  parkCard.appendChild(actList3);

  searchResults.appendChild(parkCard);
}

//variable for map box API

var dropdown = document.querySelector(".dropdown");
var clickDropdown = document.addEventListener("DOMContentLoaded", function () {
  dropdown.addEventListener("click", function (event) {
    event.stopPropagation();
    dropdown.classList.toggle("is-active");
  });
});
//dropdown.classList.remove("is-active");
document.addEventListener("click", function (event) {
  dropdown.classList.remove("is-active");
});

fetch("./assets/statecodes.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    showdropdownList(data);
  });

  function showdropdownList(data){
    var dropdownList = document.getElementById("dropdown-menu");
    for(var i=0; i<data.length; i++){
        var liEl = document.createElement('li');
        liEl.innerHTML = data[i].code
        dropdownList.appendChild(liEl);
    }
}  
