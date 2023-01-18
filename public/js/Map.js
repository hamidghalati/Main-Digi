
$("#myModal").on('show.bs.modal',function (){
    setTimeout(function () {
        myMap.invalidateSize()
    },500);

    get_my_location();
    myMap.on('move',function (e) {
        lat=e.target.getCenter().lat;
        lng=e.target.getCenter().lng;
        marker.setLatLng({lat:lat,lng:lng});

    });

});
updateMap=function (lat,lng) {
    document.getElementById('lat').value=lat;
    document.getElementById('lng').value=lng;
    if (myMap!=null)
    {
        myMap.panTo(new L.LatLng(lat,lng));
        marker.setLatLng({lat:lat,lng:lng});
    }
}

$(document).on('click','#change_map',function () {
    setTimeout(function () {
        myMap.invalidateSize()
    },500);

    get_my_location();
    myMap.on('move',function (e) {
        lat=e.target.getCenter().lat;
        lng=e.target.getCenter().lng;
        marker.setLatLng({lat:lat,lng:lng});

    });
});
