"use strict";

// Poi functionality

// var refreshTable;
//
// function refreshPoiTable() {
//     refreshTable = setInterval(getPoi, 1000);
// }



let poiForm = document.getElementById("poiForm")


//add Poi
function addPoi() {
    let poiName = document.getElementById("poiName").value;
    let poiLink = document.getElementById("link").value;
    axios
        .post('/TravelApp/poi/add', {
            poiName: poiName,
            link: poiLink
        })
        .then(res => {
            getPoi();
            console.log("zz"+res);
            poiForm.reset();
        })
        .catch(error => console.log(error));
}

//Poi name + link
function getPoi(){
    getPoiName();
    getPoiLink()
}

function getPoiName() {
    axios
        .get('/TravelApp/poi/all')
        .then((res) => {
            showPoiNTable(res.data);
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
}

function getPoiLink(){
    axios
        .get('/TravelApp/poi/all')
        .then((res)=>{
            showPoiNTable(res.data);
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
}

//pass data through to append it in poiTable
let header = document.getElementById("poiContents");
let table = document.getElementById("poiTable");
function showPoiNTable(name) {
    table.innerHTML="";
    header.innerHTML ="";
    let idHeader = document.createElement("th");
    let poiNameHeader = document.createElement("th");
    let linkHeader = document.createElement("th");

    idHeader.innerHTML = "ID"
    poiNameHeader.innerHTML = "Name";
    linkHeader.innerHTML = "Link";

    header.appendChild(idHeader);
    header.appendChild(poiNameHeader);
    header.appendChild(linkHeader);
    table.appendChild(header);

    for (let p of name) {
        let row= document.createElement("tr");
        let newId = document.createElement("td")
        let newPoi = document.createElement("td");
        let newLink = document.createElement("td");
        newId.innerHTML = p.id;
        newPoi.innerHTML = p.poiName;
        newLink.innerHTML += p.link;
        row.appendChild(newId);
        row.appendChild(newPoi);
        row.appendChild(newLink);
        table.appendChild(row);
    }
}

//update poi / modal

function updatePoi(){
    let updateId = document.getElementById("updateId").value;
    axios
        .put("/TravelApp/poi/update/" +updateId, {
            poiName: document.getElementById("poiNameUpdate").value,
            link: document.getElementById("linkUpdate").value
        })
    .then((res)=>{
    getPoi();
    modal.style.display = "none";

    console.log(res);
    })

    .catch((error)=> {
        console.log(error);
        alert("ID not valid.");
    })
}

//js sorcery, update doesnt work without doing this
function bloop() {
    updatePoi();
    // poiForm.reset();
}
//modal
var modal = document.getElementById("updateModal");
var btn = document.getElementById("updatePoiModal");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//delete poi
function deletePoi() {
    let id = document.getElementById("id").value;
    axios
        .delete('/TravelApp/poi/delete/' + id)
        .then(res => getPoi())
        .catch((error)=> {
                console.log(error);
                alert("ID not valid.");
            })


}

//event Handlers

// document.getElementById("submitPoi").addEventListener("click", getPoi);
// document.getElementById("updatePoi").addEventListener("click", getPoi)
// document.getElementById("deletePoi").addEventListener("click", getPoi)

