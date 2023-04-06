//--------->Local Storage to fallow<--------------------//
container.addEventListener('click', function (event) {
    var element = event.target;
    var currentParks = JSON.parse(localStorage.getItem('parkcard'))
    if (!currentParks) {
        currentParks = []
    }
    if (Element.matches('h3')) {
        var parkName = element.getAttribut()
        var lng = element.getAttribut('data-lon')
        var lat = element.getAttribute('data-lat')
        var parkObj = {
            parkName: parkName,
            longatude: lng,
            latatude: lat,
        }
        currentParks.push(parkObj)
        localStorage.setItem('parkcard', JSON.stringify(currentParks))
    }

})

function renderLastSlected() {
    var park = localStorage.getItem('parkcard')

    if (!park) {
        return;
    }
    container1.textContent = park
}
renderLastSlected()


//--------->Local Storage to above<--------------------//