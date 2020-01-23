"use strict";


function displayDetails() {
    addDetail();
    getAllD();
}

function thingsToDo() {
    window.open("https://www.tripadvisor.co.uk/?fid=88fcde45-5a56-4c19-be9c-1718ed412c74", "_blank");
}

function getUrl() {
   let urlPath = document.getElementById("inputUrl").value;
   console.log(urlPath);
    window.open(""+ urlPath, "_blank");
}

function getAllD() {
    getOrigin();
    getDestination();
    getDateFrom();
    getDateTo();
}

function getDateTo() {
    axios
        .get('/TravelApp/details/get/1')
        .then((res) => {
            showDateTo(res.data);
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
}

const dateToDetails = document.getElementById("dt");

function showDateTo(dateT) {
    dateToDetails.innerHTML = "";
    const newDT = document.createElement("span");
    newDT.innerHTML = formatDate(dateT.dateTo);
    dateToDetails.appendChild(newDT);
}

function getDateFrom() {
    axios
        .get('/TravelApp/details/get/1')
        .then((res) => {
            showDateFrom(res.data);
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
}

const dateFromDetails = document.getElementById("df");

function showDateFrom(dateF) {
    dateFromDetails.innerHTML = "";
    const newDF = document.createElement("span");
    newDF.innerHTML = formatDate(dateF.dateFrom);
    dateFromDetails.appendChild(newDF);
}

// Using this format once I start using multiple trips
// function showDateFrom(dateF) {
//     dateFromDetails.innerHTML = "";
//     for (let x of dateF) {
//         if (x.id = 1) {
//             const newDF = document.createElement("span");
//             newDF.innerHTML = formatDate(x.dateFrom);
//             dateFromDetails.appendChild(newDF);
//         }
//     }
// }

function getDestination() {
    axios
        .get('/TravelApp/details/get/1')
        .then((res) => {
            showDestination(res.data);

            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
}


const destinationDetails = document.getElementById("d");

function showDestination(trip) {
    destinationDetails.innerHTML = "";
    const newD = document.createElement("span");
    newD.innerHTML = trip.destination;
    destinationDetails.appendChild(newD);
}

function getOrigin() {
    axios
        .get('/TravelApp/details/get/1')
        .then((res) => {
            showOrigin(res.data);
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
}

const tripDetails = document.getElementById("o");

function showOrigin(trip) {
    tripDetails.innerHTML = "";
    const newO = document.createElement("span");
    newO.innerHTML = trip.origin;
    tripDetails.appendChild(newO);


}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function addDetail() {
    axios
        .post('/TravelApp/details/add', {
            origin: document.getElementById("origin").value,
            destination: document.getElementById("destination").value,
            dateFrom: document.getElementById("dateFrom").value,
            dateTo: document.getElementById("dateTo").value
        })
        .then(alert("The details have been added"))
        .catch(error => console.log(error));
}

function updateDetail() {
    axios
        .put('/TravelApp/details/update/1', {
            origin: document.getElementById("origin").value,
            destination: document.getElementById("destination").value,
            dateFrom: document.getElementById("dateFrom").value,
            dateTo: document.getElementById("dateTo").value
        })
        .then(alert("The details have been updated"))
        .catch(error => console.log(error));

}

function deleteDetail() {
    axios
        .delete('/TravelApp/details/delete/1')
        .then(alert("The details have been deleted"))
        .catch(error => console.log(error));
}

let appId = 'f7993f3dedd38df1663558a6334ca4b2';
let searchTerm = 292223;


function searchWeather() {

    console.log(searchTerm);
    fetch('https://samples.openweathermap.org/data/2.5/weather?id=' + searchTerm + '&appid=' + appId)
        .then(res => {
            return res.json();
        }).then(res => {
        init(res);
    })
}

function init(resultFromServer) {
    console.log(resultFromServer);
    console.log(resultFromServer.weather[0].main)

    let x = resultFromServer.weather[0].main;


    // switch (x) {
    //     case 'Clear':
    //         document.body.backgroundImage = 'url("bridge.png")';
    //         break;
    //     case 'Clouds':
    //         document.body.backgroundImage = 'url("bridge.png")';
    //         break;
    //     case 'Rain':
    //     case 'Drizzle':
    //     case 'Mist':
    //         document.body.backgroundImage = 'url("bridge.png")';
    //         break;
    //     case 'Snow':
    //         document.body.backgroundImage = 'url("bridge.png")';
    //         break;
    //     default:
    //         break;
    // }

    let weatherDesc = document.getElementById('weatherDesc');
    let oTemp = document.getElementById('oTemp');
    let oWIcon = document.getElementById('oWIcon');

    console.log(resultFromServer.weather[0].icon);
    console.log(resultFromServer.weather[0].description);

    oWIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '@2x.png';

    weatherDesc.innerHTML = resultFromServer.weather[0].description;

    oTemp.innerHTML = x;

    console.log(Math.floor(resultFromServer.main.temp))

}

document.getElementById('addDetail').addEventListener('click', () => {
    let searchTerm = document.getElementById('origin').value;
    if (searchTerm) {
        searchWeather(searchTerm);
    }
})


//   countdown ----->
// var target_date = new Date.getTime() + (dateSeconds()); // set the countdown date
// var days, hours, minutes, seconds; // variables for time units
//
// var countdown = document.getElementById("tiles");
//
//
// setInterval(function () { getCountdown(); }, 1000);
//
// function getCountdown() {
//
//   // find the amount of "seconds" between now and target
//   var current_date = new Date().getTime();
//   var seconds_left = (target_date - current_date) / 1000;
//
//   days = pad(parseInt(seconds_left / 86400));
//   seconds_left = seconds_left % 86400;
//
//   hours = pad(parseInt(seconds_left / 3600));
//   seconds_left = seconds_left % 3600;
//
//   minutes = pad(parseInt(seconds_left / 60));
//   seconds = pad(parseInt(seconds_left % 60));
//
//   // format countdown string
//   countdown.innerHTML = "<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span><span>" + seconds + "</span>";
// }
//
// function pad(n) {
//   return (n < 10 ? '' : '') + n;
// }
//
// function dateSeconds() {
//   var _initial = getDateFrom().value;
//   var fromTime = new Date(_initial);
//   var toTime = new Date();
//
//   var differenceTravel = fromTime.getTime() - toTime.getTime();
//   var seconds = Math.floor(differenceTravel);
//   return seconds;
// }


