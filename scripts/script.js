var LoadingTime = 0;

var start = new Date();

var loadingTime = new Date().getTime();

window.addEventListener("load", function() {
    document.getElementById('loadingtime').textContent = "Время загрузки страницы: " + ((new Date).getTime() - loadingTime) +  " ms";
}, false);


