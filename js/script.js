// -----------------------------------------------------------------------------------------------
// National parks API call: need to replace STATE with the results of the state pulldown menu; returns lat and lon by park
var apiKey = "6Nd3QpLEE05BdiKDL5AMEu9GVW08cRlapS83eKaQ"
var apiCall = 'https://developer.nps.gov/api/v1/parks?stateCode=' + "NJ" + '&api_key=' + apiKey
var searchResults = document.querySelector('#search-results');

fetch(apiCall)

    .then(function (response) {
        console.log(response);
        return response.json();

    })
    .then(function (data) {
        console.log(data);
        displayTiles(data);
    })

// -----------------------------------------------------------------------------------------------
// Code to take results of natl parks API call and append it to the search result tiles

var displayTiles = function (data) {
    for (var i = 0; i < 100; i++) {
        searchResults.style.cssText = 'display: flex; flex-wrap: wrap; justify-content: center; width: 100%'

        var parkCard = document.createElement('div');
        parkCard.style.cssText = 'border: 2px solid #000000; margin: 10px; padding: 10px; width: 45%'

        var cardTitle = document.createElement('h3');
        cardTitle.innerHTML = "Park Name: " + data.data[i].name;

        var cardState = document.createElement('h3');
        cardState.innerHTML = "State(s): " + data.data[i].states;

        var cardActivities = document.createElement('h3');
        cardActivities.innerHTML = 'Some of the Available Activities:';

        var cardList = document.createElement('ul');
        var actList1 = document.createElement('li');
        actList1.innerHTML = data.data[i].activities[0].name;
        var actList2 = document.createElement('li');
        actList2.innerHTML = data.data[i].activities[1].name;
        var actList3 = document.createElement('li');

        parkCard.appendChild(cardTitle);
        parkCard.appendChild(cardState);
        parkCard.appendChild(cardActivities);
        parkCard.appendChild(cardList);
        parkCard.appendChild(actList1);
        parkCard.appendChild(actList2);

        searchResults.appendChild(parkCard);
        // expandDetails()
    }
}

// -----------------------------------------------------------------------------------------------
// Code to expand the tile to show more details on clicked park

var expandDetails = function() {
searchResults.innerHTML = " "

var detailedCard = document.createElement('div');
detailedCard.style.cssText = 'border: 2px solid #000000; margin: 10px; padding: 10px; width: 100%'

var detailedTitle = document.createElement('h2');
detailedTitle.innerHTML = "TITLE";

var detailedDescription = document.createElement('p');
detailedDescription.innerHTML = "DESCRIPTION";

var detailedList = document.createElement('ul');
var detailedActivities = document.createElement('li');
detailedActivities.innerHTML = "LIST";

var detailedURL = document.createElement('h3');
detailedURL.innerHTML = "For more information, visit the park's page at: " + "URL";

detailedCard.appendChild(detailedTitle);
detailedCard.appendChild(detailedDescription);
detailedCard.appendChild(detailedList);
detailedCard.appendChild(detailedActivities);
detailedCard.appendChild(detailedURL);

searchResults.appendChild(detailedCard);
}


//variable for map box API
var mapKey = "pk.eyJ1IjoiYXNiMjAyIiwiYSI6ImNsZzJkcmxudTA0aDkzdHFzMHh1Mzk0a3cifQ.HQAX2YLQBEZjcagat-k8vw"

mapboxgl.accessToken = 'pk.eyJ1IjoiYXNiMjAyIiwiYSI6ImNsZzJkcmxudTA0aDkzdHFzMHh1Mzk0a3cifQ.HQAX2YLQBEZjcagat-k8vw';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
});


var clickDropdown = document.addEventListener('DOMContentLoaded', function () {
    var dropdown = document.querySelector('.dropdown');
    dropdown.addEventListener('click', function (event) {
        event.stopPropagation();
        dropdown.classList.toggle('is-active');
    });
});


