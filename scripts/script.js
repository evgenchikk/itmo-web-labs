var LoadingTime = 0;

var start = new Date();

window.onload = function() {
    LoadingTime = (new Date).getTime() - start.getTime();
}

// window.addEventListener("load", function() {
//     console.log((new Date).getTime() - window.startTime); 
// }, false);

document.getElementById("loadingtime").textContent = "aaaaaa";

