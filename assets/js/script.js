// -----------------------------------------------------------------------------------------------
// National parks API call: need to replace STATE with the results of the state pulldown menu; returns lat and lon by park
var stateCodes = [];

var apiKey = "6Nd3QpLEE05BdiKDL5AMEu9GVW08cRlapS83eKaQ";
var apiCall ="https://developer.nps.gov/api/v1/parks?stateCode=" +stateCodes +"&api_key=" +apiKey;

// var mapKey =
//   "pk.eyJ1IjoiYXNiMjAyIiwiYSI6ImNsZzJkcmxudTA0aDkzdHFzMHh1Mzk0a3cifQ.HQAX2YLQBEZjcagat-k8vw";
// mapboxgl.accessToken =
//   "pk.eyJ1IjoiYXNiMjAyIiwiYSI6ImNsZzJkcmxudTA0aDkzdHFzMHh1Mzk0a3cifQ.HQAX2YLQBEZjcagat-k8vw";

fetch(apiCall)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

//variable for map box API

// const map = new mapboxgl.Map({
//   container: "map", // container ID
//   style: "mapbox://styles/mapbox/streets-v12", // style URL
//   center: [-74.5, 40], // starting position [lng, lat]
//   zoom: 9, // starting zoom
// });
var dropdown = document.querySelector(".dropdown");
var clickDropdown = document.addEventListener("DOMContentLoaded", function () {
  dropdown.addEventListener("click", function (event) {
    event.stopPropagation();
    dropdown.classList.toggle("is-active");
  });
});
//dropdown.classList.remove("is-active");
document.addEventListener("click", function(event){
  dropdown.classList.remove("is-active");
});

