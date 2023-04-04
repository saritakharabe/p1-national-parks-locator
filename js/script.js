//variable for map box API
var mapKey = "pk.eyJ1IjoiYXNiMjAyIiwiYSI6ImNsZzJkcmxudTA0aDkzdHFzMHh1Mzk0a3cifQ.HQAX2YLQBEZjcagat-k8vw"

mapboxgl.accessToken = mapKey;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-98.7, 39.7], // starting position [lng, lat]
    zoom: 2, // starting zoom
});

//nationalParckBtn.on('click', function(){
//    var lat = [park].place.date(lat);
//    var long = [park].place.date(long);

//    const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     style: 'mapbox://styles/mapbox/streets-v12', // style URL
//     center: [long, lat], // starting position [lng, lat]
//     zoom: 9, // starting zoom
// });
// })