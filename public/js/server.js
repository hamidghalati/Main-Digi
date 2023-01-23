// //init the map
// var myMap = new L.Map('map', {
//     key: 'web.07d8361321df46e0ac6463e43c4dcf16',
//     maptype: 'dreamy',
//     poi: true,
//     traffic: false,
//     center: [29.664755, 52.457622],
//     zoom: 14
// });
//
let lat='29.664755';
let lng='52.457622';


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

get_my_location=function ()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(set_my_location);
    }
    else {
        alert('مرورگر شما از قابلیت مکان یابی پشتیبانی نمی کند')
    }
}

set_my_location=function (position) {
    lat=position.coords.latitude;
    lng=position.coords.longitude;
   if(myMap!=null)
    {
        myMap.panTo(new L.LatLng(lat,lng));
        marker.setLatLng({lat:lat,lng:lng});
    }
};

$("#select_location_btn").click(function () {
   document.getElementById('lat').value=lat;
   document.getElementById('lng').value=lng;
});

//
//
//
// var help = document.getElementById("help");
// //marker layers
// var originsMarkers = [];
// var destinationMarkers = [];
// var resultMatrix = [];
// var polylines = [];
// var flag = false;
// var markerIsOrigin = true;
// //adding on map click listner
// myMap.on('click', function (e) {
//     //is start button is clicked
//     if (flag) {
//         if (markerIsOrigin) {
//             originsMarkers[originsMarkers.length] = L.marker(e.latlng, {
//                 title: "orgin",
//                 icon: L.AwesomeMarkers.icon({
//                     icon: '',
//                     markerColor: 'darkblue',
//                     prefix: 'fa',
//                     html: (originsMarkers.length + 1)
//                 })
//             }).addTo(myMap);
//             document.getElementById("origins").textContent += "\n - " + e.latlng;
//         } else {
//             destinationMarkers[destinationMarkers.length] = L.marker(e.latlng, {
//                 title: "Destination",
//                 icon: L.AwesomeMarkers.icon({
//                     icon: '',
//                     markerColor: 'darkred',
//                     prefix: 'fa',
//                     html: (destinationMarkers.length + 1)
//                 })
//             }).addTo(myMap);
//             document.getElementById("destinations").textContent += "\n - " + e.latlng;
//
//         }
//     }
// });
// //restarting the layers
// function reset() {
//     help.textContent = "لطفا نقاط مبدا را انتخاب کنید.برای انتخاب نقاط مقصد دکمه Destinationرا فشار دهید."
//     markerIsOrigin = true;
//     document.getElementById("marker").textContent = "Destination";
//     document.getElementById("eta").disabled = false;
//     document.getElementById("marker").disabled = false;
//     flag = true;
//     document.getElementById("start").textContent = "restart";
//     document.getElementById("origins").textContent = "origins";
//     document.getElementById("destinations").textContent = "destinations";
//     document.getElementById("result").innerHTML = ""
//     for (var i = 0; i < originsMarkers.length; i++) {
//         myMap.removeLayer(originsMarkers[i]);
//     }
//     originsMarkers = [];
//     for (var i = 0; i < destinationMarkers.length; i++) {
//         myMap.removeLayer(destinationMarkers[i]);
//     }
//     destinationMarkers = [];
//     for (var i = 0; i < polylines.length; i++) {
//         for (var j = 0; j < polylines[i].length; j++) {
//             myMap.removeLayer(polylines[i][j]);
//         }
//     }
//     polylines = [];
// }
// //send http get request to distance matrix api
// function eta() {
//     help.textContent = "برای شروع دوباره گزینه restart را فشار دهید."
//     document.getElementById("eta").disabled = true;
//     flag = false;
//     //making the url
//     var destination = "";
//     for (var i = 0; i < destinationMarkers.length; i++) {
//         destination += destinationMarkers[i].getLatLng().lat + "," + destinationMarkers[i].getLatLng().lng + "|";
//     }
//     destination = destination.substring(0, destination.length - 1);
//
//     var origin = "";
//     for (var i = 0; i < originsMarkers.length; i++) {
//         origin += originsMarkers[i].getLatLng().lat + "," + originsMarkers[i].getLatLng().lng + "|";
//     }
//     origin = origin.substring(0, origin.length - 1);
//
//     var url = `https://api.neshan.org/v1/distance-matrix?origins=${origin}&destinations=${destination}`;
//     //urlencode the url
//     url = encodeURI(url);
//     var params = {
//         headers: {
//             'Api-Key': 'web.07d8361321df46e0ac6463e43c4dcf16'
//         },
//
//     };
//     //sending get request
//     axios.get(url, params)
//         .then(data => {
//             console.log(data);
//             for (var i = 0; i < Object.keys(data.data.rows).length; i++) {
//                 polylines[i] = [];
//                 resultMatrix[i] = [];
//                 var color = generateRandomColor();
//                 for (var j = 0; j < Object.keys(data.data.rows[i].elements).length; j++) {
//                     resultMatrix[i][j] = data.data.rows[i].elements[j].distance.text;
//                     polylines[i][j] = L.polyline([[originsMarkers[i].getLatLng().lat, originsMarkers[i].getLatLng().lng], [destinationMarkers[j].getLatLng().lat, destinationMarkers[j].getLatLng().lng]], {
//                         color: color
//                     }).addTo(myMap);
//                     polylines[i][j].bindTooltip(data.data.rows[i].elements[j].duration.text + "<br>" + data.data.rows[i].elements[j].distance.text);
//                 }
//             }
//             printResultMatrix();
//         }).catch(err => {
//             console.log("error = " + err);
//         });
// }
//
// // origin or destination marker
// function changeMarker() {
//     console.log(markerIsOrigin);
//     if (markerIsOrigin) {
//         console.log("destination")
//         help.textContent = "لطفا نقاط مقصد را انتخاب کنید.برای انتخاب نقاط مبدا دکمه Origin فشار دهید.";
//         document.getElementById("marker").textContent = "Origin";
//         markerIsOrigin = false;
//     } else {
//         console.log("origin");
//         document.getElementById("marker").textContent = "Destination";
//         help.textContent = "لطفا نقاط مبدا را انتخاب کنید.برای انتخاب نقاط مقصد دکمه Destinationرا فشار دهید.";
//         markerIsOrigin = true;
//     }
// }
// //random color generator :))
// function generateRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }
//
// function printResultMatrix() {
//     var res = document.getElementById("result");
//     var firstTr = document.createElement("tr");
//     thOrigin = document.createElement("th");
//     thOrigin.textContent = "orgin";
//     thDestination = document.createElement("th");
//     thDestination.textContent = "destination";
//     res.appendChild(thOrigin);
//     res.appendChild(thDestination);
//
//     for (var i = 0; i <= resultMatrix[1].length; i++) {
//         var td = document.createElement("td");
//         if (i == 0) {
//             td.textContent = "\\";
//             td.style = "border: 0px solid black;"
//         } else {
//             td.textContent = i;
//         }
//         firstTr.appendChild(td);
//     }
//     res.appendChild(firstTr);
//     for (var i = 0; i < resultMatrix.length; i++) {
//         var tr = document.createElement("tr");
//         tr.textContent = (i + 1) + " ";
//         for (var j = 0; j < resultMatrix[i].length; j++) {
//             var td = document.createElement("td");
//             td.dir = "rtl";
//             td.textContent = resultMatrix[i][j];
//             tr.appendChild(td);
//         }
//         res.appendChild(tr);
//     }
//
// }
//
// $("#myModal").on('show.bs.modal',function () {
//     // setTimeout(function ({myMap.invalidateSize)},500);
// })
//
//
//
//




//init the map
var myMap = new L.Map('map', {
    key: 'web.07d8361321df46e0ac6463e43c4dcf16',
    maptype: 'dreamy',
    poi: true,
    traffic: false,
    center: ['', ''],
    zoom: 14
});
//adding the marker to map
var marker = L.marker([35.699739, 51.338097]).addTo(myMap);
//sending request to Geocoding API
function geocoding() {
    var log = document.getElementById("log");
    //getting adrress value from input tag
    var address = document.getElementById("address").value;
    //making url
    var url = `https://api.neshan.org/v4/geocoding?address=${address}`;
    console.log(url);
    //add your api key
    var params = {
        headers: {
            'Api-Key': 'service.c1da24ad331946ac87b2d858641dfc50'
        },

    };
    //sending get request
    axios.get(url, params)
        .then(data => {
            //using the data
            var lat = data.data.location.y;
            var lng = data.data.location.x;
            //logging the location
            log.textContent = [lat, lng];
            //update marker location to address
            marker.setLatLng([lat, lng]);
            marker.bindPopup(address).openPopup();
            //set map center to address
            myMap.flyTo([lat, lng], 15);

        }).catch(err => {
        console.log("error = " + err);
        log.textContent = "Nothing found";

    });



}

